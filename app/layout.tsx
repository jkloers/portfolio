import './globals.css';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { NavLinks } from '@/app/components/nav-links';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://julienkloers.vercel.app'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Julien Kloers',
    template: '%s | Julien Kloers'
  },
  description:
    'Engineer and researcher at the intersection of machine learning, physical simulation, and generative design.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col pt-0 md:pt-8 p-8 bg-white text-gray-900 dark:bg-zinc-950 dark:text-zinc-200">
          <Nav />
          <main className="max-w-[60ch] mx-auto w-full space-y-6 mt-16">
            {children}
          </main>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav className="max-w-[60ch] mx-auto w-full flex items-center justify-between">
      <Link
        href="/"
        className="font-medium text-gray-900 dark:text-zinc-100 hover:opacity-60 transition-opacity"
      >
        Julien Kloers
      </Link>
      <NavLinks />
    </nav>
  );
}

function Footer() {
  const links = [
    { name: 'youtube', url: 'https://www.youtube.com/@leuz2' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/julien-kloers-09bab6251/' },
    { name: 'github', url: 'https://github.com/jkloers' }
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
