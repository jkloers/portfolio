import katex from 'katex';

export function BlockMath({ math }: { math: string }) {
  const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
  return (
    <div
      className="my-5 overflow-x-auto text-gray-800 dark:text-zinc-300"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function InlineMath({ math }: { math: string }) {
  const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
