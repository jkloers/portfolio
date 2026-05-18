'use client';

import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function NotebookViewer({ src }: { src: string }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(560);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-8" ref={containerRef}>
      <div style={{ minHeight }}>
        <Document
          file={src}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="w-full aspect-[2/1] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
              <span className="text-gray-300 dark:text-zinc-700 text-xs tracking-widest uppercase">
                loading
              </span>
            </div>
          }
          error={
            <div className="w-full aspect-[2/1] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
              <span className="text-gray-300 dark:text-zinc-700 text-xs tracking-widest uppercase">
                could not load notebook
              </span>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onRenderSuccess={({ height }) => setMinHeight(height)}
          />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400 dark:text-zinc-600 select-none">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="hover:text-gray-900 dark:hover:text-zinc-100 disabled:opacity-20 transition-colors cursor-pointer"
          >
            ← prev
          </button>
          <span>
            {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="hover:text-gray-900 dark:hover:text-zinc-100 disabled:opacity-20 transition-colors cursor-pointer"
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
}
