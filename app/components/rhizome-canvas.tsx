'use client';

import { useEffect, useRef } from 'react';

const N = 90;
const MAX_CONN = 4;
const REACH = 160;

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number; freq: number;
  warm: boolean;
  conn: Set<number>;
  age: Map<number, number>;
}

export function RhizomeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 800;
    const H = rect.height || 420;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: 20 + Math.random() * (W - 40),
      y: 20 + Math.random() * (H - 40),
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 0.7 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
      freq: 0.003 + Math.random() * 0.007,
      warm: Math.random() > 0.3,
      conn: new Set(),
      age: new Map(),
    }));

    // Seed a sparse initial network — the fixed past
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (
          d < REACH * 0.6 &&
          nodes[i].conn.size < 2 &&
          nodes[j].conn.size < 2 &&
          Math.random() < 0.42
        ) {
          nodes[i].conn.add(j); nodes[j].conn.add(i);
          nodes[i].age.set(j, 1); nodes[j].age.set(i, 1);
        }
      }
    }

    let lastGrow = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function grow(now: number) {
      if (now - lastGrow < 520) return;
      lastGrow = now;
      const i = (Math.random() * N) | 0;
      if (nodes[i].conn.size >= MAX_CONN) return;
      const pool: number[] = [];
      for (let j = 0; j < N; j++) {
        if (j === i || nodes[i].conn.has(j)) continue;
        if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < REACH &&
            nodes[j].conn.size < MAX_CONN) pool.push(j);
      }
      if (!pool.length) return;
      const j = pool[(Math.random() * pool.length) | 0];
      nodes[i].conn.add(j); nodes[j].conn.add(i);
      nodes[i].age.set(j, 0); nodes[j].age.set(i, 0);
    }

    function frame(ts: number) {
      grow(ts);
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        n.phase += n.freq;

        // Mouse: organic repulsion, as if sensing presence
        const mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 100 && md > 0.1) {
          const f = ((100 - md) / 100) * 0.32;
          n.vx += (mdx / md) * f;
          n.vy += (mdy / md) * f;
        }

        // Slow, independent biological drift
        n.vx += Math.sin(ts * 0.00033 + n.phase) * 0.006;
        n.vy += Math.cos(ts * 0.00027 + n.phase * 1.37) * 0.006;
        n.vx *= 0.974; n.vy *= 0.974;
        n.x += n.vx; n.y += n.vy;

        // Soft membrane boundary
        if (n.x < 12) n.vx += 0.14;
        else if (n.x > W - 12) n.vx -= 0.14;
        if (n.y < 12) n.vy += 0.14;
        else if (n.y > H - 12) n.vy -= 0.14;
      }

      // Edges
      ctx.lineWidth = 0.5;
      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        for (const j of a.conn) {
          if (j <= i) continue;
          const b = nodes[j];

          let age = a.age.get(j) ?? 1;
          if (age < 1) {
            age = Math.min(1, age + 0.0012);
            a.age.set(j, age); b.age.set(i, age);
          }

          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 1) continue;

          // Control point: unique per-edge organic wobble
          const seed = i * 131 + j * 97;
          const bow = Math.sin(ts * 0.00016 + seed) * 22;
          const nx = -dy / dist, ny = dx / dist;
          const cx = (a.x + b.x) * 0.5 + nx * bow;
          const cy = (a.y + b.y) * 0.5 + ny * bow;

          const fade = (1 - dist / REACH) * age;
          const breathe = 0.18 + 0.08 * Math.sin(ts * 0.0007 + seed * 0.07);
          const alpha = fade * breathe;

          const warm = a.warm && b.warm;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cx, cy, b.x, b.y);
          ctx.strokeStyle = warm
            ? `rgba(70, 60, 48, ${alpha})`
            : `rgba(50, 60, 88, ${alpha * 0.78})`;
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const p = 0.5 + 0.5 * Math.sin(n.phase);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.65 + p * 0.55), 0, Math.PI * 2);
        ctx.fillStyle = n.warm
          ? `rgba(60, 52, 40, ${0.10 + p * 0.20})`
          : `rgba(45, 55, 82, ${(0.10 + p * 0.20) * 0.8})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="w-full my-8 block"
      style={{ height: '380px' }}
    />
  );
}
