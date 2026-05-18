'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== '/about' && pathname.startsWith(href));

  return (
    <div className="flex space-x-6 text-sm">
      <Link
        href="/projects"
        className={`transition-colors ${
          isActive('/projects')
            ? 'text-gray-900 dark:text-zinc-100'
            : 'text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
        }`}
      >
        projects
      </Link>
      <Link
        href="/about"
        className={`transition-colors ${
          isActive('/about')
            ? 'text-gray-900 dark:text-zinc-100'
            : 'text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100'
        }`}
      >
        about
      </Link>
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors"
      >
        cv
      </a>
    </div>
  );
}
