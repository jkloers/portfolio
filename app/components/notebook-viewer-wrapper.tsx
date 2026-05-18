'use client';

import dynamic from 'next/dynamic';

const NotebookViewerLazy = dynamic(
  () =>
    import('./notebook-viewer').then((m) => m.NotebookViewer),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 w-full aspect-[2/1] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center">
        <span className="text-gray-300 dark:text-zinc-700 text-xs tracking-widest uppercase">
          loading
        </span>
      </div>
    )
  }
);

export function NotebookViewerWrapper({ src }: { src: string }) {
  return <NotebookViewerLazy src={src} />;
}
