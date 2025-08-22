import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const BASE_URL = process.env.SITEMAP_BASE_URL || 'https://www.travelmatch.xyz';

// Define SPA paths here. Add more as you introduce new routes.
const CITY_PATHS = [
  '/city/paris',
  '/city/london', 
  '/city/newyork',
  '/city/seoul',
  '/city/kyoto',
  '/city/dubai',
  '/city/bangkok',
  '/city/rome',
  '/city/singapore',
  '/city/taipei'
];

const BASE_PATHS = ['/', '/quiz', '/results'];

const PATHS = (process.env.SITEMAP_PATHS
  ? process.env.SITEMAP_PATHS.split(',').map((p) => p.trim()).filter(Boolean)
  : [...BASE_PATHS, ...CITY_PATHS]
);

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemapXml(urls) {
  const urlset = urls
    .map(({ loc, lastmod, changefreq, priority }) => {
      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${urlset}\n</urlset>\n`;
}

function normalizeUrl(base, p) {
  const b = (base || '').replace(/\/+$/, '');
  const s = (p || '').trim();
  if (s === '' || s === '/') {
    return `${b}/`;
  }
  const sanitized = s.replace(/^\/+/, '');
  return `${b}/${sanitized}`;
}

function main() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = PATHS.map((p, index) => {
    let priority = '0.8';
    let changefreq = 'monthly';
    
    if (p === '/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (p === '/quiz') {
      priority = '0.9';
      changefreq = 'monthly';
    } else if (p === '/results') {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (p.startsWith('/city/')) {
      priority = '0.7';
      changefreq = 'monthly';
    }
    
    return {
      loc: normalizeUrl(BASE_URL, p),
      lastmod: today,
      changefreq,
      priority,
    };
  });

  const xml = buildSitemapXml(entries);

  const outPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`[sitemap] Generated ${outPath} with ${entries.length} entries`);
}

main();


