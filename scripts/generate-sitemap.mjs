// Genera public/sitemap.xml con todas las propiedades de src/data/mockProperties.ts.
// Se ejecuta solo antes de cada build (script "prebuild" en package.json).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.mariannehouses.com';

const data = readFileSync(join(ROOT, 'src/data/mockProperties.ts'), 'utf8');
const slugs = [...new Set([...data.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]))];

const today = new Date().toISOString().slice(0, 10);
const url = (loc, priority) =>
  `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  url('/', '1.0'),
  url('/propiedades', '0.8'),
  ...slugs.map((s) => url(`/propiedad/${encodeURIComponent(s)}`, '0.7')),
  '</urlset>',
  '',
].join('\n');

writeFileSync(join(ROOT, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml generado con ${slugs.length} propiedades`);
