import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { highlight } from 'sugar-high';
import { NotebookViewerWrapper } from '@/app/components/notebook-viewer-wrapper';
import { PosterViewer } from '@/app/components/poster-viewer';
import { RhizomeCanvas } from '@/app/components/rhizome-canvas';
import { BlockMath, InlineMath } from '@/app/components/math';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const PROJECTS = [
  {
    title: 'Neural Form-Finding',
    href: '/projects/neural-form-finding',
    desc: 'Differentiable physics & metamaterials.'
  },
  {
    title: 'Mocap',
    href: '/projects/mocap',
    desc: 'Modular synthesis driven by human kinematics.'
  },
  {
    title: 'Ariane',
    href: '/projects/ariane',
    desc: 'Narrative generation from graph structures.'
  },
  {
    title: 'CVAE + LCA',
    href: '/projects/cvae-lca',
    desc: 'Deep generative modeling for sustainable structures.'
  },
  {
    title: 'Gridshells',
    href: '/projects/gridshells',
    desc: 'Optimization logic for prefabrication and disassembly.'
  }
];

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  hr: () => (
    <hr className="border-t border-gray-100 dark:border-zinc-800 my-8" />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  Tags: ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2 my-4">
      {items.map((tag) => (
        <span
          key={tag}
          className="text-xs text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700 px-2 py-0.5 tracking-wider uppercase"
        >
          {tag}
        </span>
      ))}
    </div>
  ),
  ProjectImage: ({
    src,
    caption,
    alt
  }: {
    src: string;
    caption?: string;
    alt?: string;
  }) => (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt ?? caption ?? ''}
        width={1200}
        height={800}
        style={{ width: '100%', height: 'auto' }}
      />
      {caption && (
        <figcaption className="text-xs text-gray-400 dark:text-zinc-600 mt-3 tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
  ImagePlaceholder: ({ caption }: { caption: string }) => (
    <div className="my-8 w-full aspect-video bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
      <span className="text-gray-300 dark:text-zinc-700 text-xs tracking-widest uppercase">
        {caption}
      </span>
    </div>
  ),
  ProjectList: () => (
    <div className="space-y-2 mt-4">
      {PROJECTS.map((p) => (
        <div key={p.href} className="flex gap-3 items-baseline">
          <Link
            href={p.href}
            className="text-gray-900 dark:text-zinc-100 hover:opacity-60 transition-opacity shrink-0"
          >
            {p.title}
          </Link>
          <span className="text-gray-300 dark:text-zinc-700">—</span>
          <span className="text-gray-500 dark:text-zinc-400 text-sm">
            {p.desc}
          </span>
        </div>
      ))}
    </div>
  ),
  ProfileImage: ({ src, alt }: { src: string; alt?: string }) => (
    <div className="mb-8 mt-4">
      <Image
        src={src}
        alt={alt || 'Profile picture'}
        width={160}
        height={160}
        className="rounded-2xl object-cover shadow-sm border border-gray-100 dark:border-zinc-800"
      />
    </div>
  ),
  NotebookViewer: ({ src }: { src: string }) => (
    <NotebookViewerWrapper src={src} />
  ),
  PosterViewer: ({
    src,
    pdf,
    caption
  }: {
    src: string;
    pdf?: string;
    caption?: string;
  }) => <PosterViewer src={src} pdf={pdf} caption={caption} />,
  RhizomeCanvas: () => <RhizomeCanvas />,
  BlockMath: ({ math }: { math: string }) => <BlockMath math={math} />,
  InlineMath: ({ math }: { math: string }) => <InlineMath math={math} />,
  GitHubLink: ({ href }: { href: string }) => {
    const repo = href.replace('https://github.com/', '');
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors"
      >
        <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform inline-block">
          ↗
        </span>
        <span className="font-mono">{repo}</span>
      </a>
    );
  }
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
