# julienkloers.com

Personal portfolio of Julien Kloers — engineer and researcher at the intersection of machine learning, physical simulation, and generative design.

Built with:

- **Framework**: [Next.js](https://nextjs.org) 16
- **Deployment**: [Vercel](https://vercel.com) — [julienkloers.com](https://julienkloers.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Content**: MDX
- **Math**: [KaTeX](https://katex.org)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Running Locally

```bash
git clone https://github.com/jkloers/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production URL for sitemap and metadata (default: `https://julienkloers.vercel.app`) |
| `POSTGRES_URL` | Optional — Postgres connection string for dynamic redirects |

If using `POSTGRES_URL`, create the following table:

```sql
CREATE TABLE redirects (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  permanent BOOLEAN NOT NULL
);
```
