import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'allow'
});

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  async redirects() {
    const base = [{ source: '/', destination: '/about', permanent: false }];

    if (!process.env.POSTGRES_URL) {
      return base;
    }

    let dbRedirects = await sql`
      SELECT source, destination, permanent
      FROM redirects;
    `;

    return [
      ...base,
      ...dbRedirects.map(({ source, destination, permanent }) => ({
        source,
        destination,
        permanent: !!permanent
      }))
    ];
  },
  experimental: {
    mdxRs: { mdxType: 'gfm' }
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
