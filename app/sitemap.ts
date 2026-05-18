import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://julienkloers.vercel.app';

async function getMDXSlugs(dir: string) {
  try {
    const entries = await fs.readdir(dir, {
      recursive: true,
      withFileTypes: true
    });
    return entries
      .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
      .map((entry) => {
        const relativePath = path.relative(
          dir,
          path.join(entry.parentPath, entry.name)
        );
        return path.dirname(relativePath);
      })
      .map((slug) => slug.replace(/\\/g, '/'));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const [noteSlugs, projectSlugs] = await Promise.all([
    getMDXSlugs(path.join(process.cwd(), 'app', 'n')),
    getMDXSlugs(path.join(process.cwd(), 'app', 'projects'))
  ]);

  const notes = noteSlugs.map((slug) => ({
    url: `${SITE_URL}/n/${slug}`,
    lastModified: new Date().toISOString()
  }));

  const projects = projectSlugs.map((slug) => ({
    url: slug === '.' ? `${SITE_URL}/projects` : `${SITE_URL}/projects/${slug}`,
    lastModified: new Date().toISOString()
  }));

  const routes = ['', '/about', '/cv'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...routes, ...projects, ...notes];
}
