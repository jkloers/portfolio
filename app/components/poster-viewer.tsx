import React from 'react';

export function PosterViewer({
  src,
  pdf,
  caption
}: {
  src: string;
  pdf?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <a
        href={pdf ?? src}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img src={src} alt={caption ?? 'Poster'} className="w-full h-auto" />
      </a>
      <figcaption className="text-xs text-gray-400 dark:text-zinc-600 mt-2 tracking-wide flex justify-between items-center">
        <span>{caption}</span>
        {pdf && (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-zinc-100 transition-colors"
          >
            PDF ↗
          </a>
        )}
      </figcaption>
    </figure>
  );
}
