/**
 * Serveur statique de test qui imite le comportement de Vercel :
 * 1. fichier exact, 2. dossier/index.html (cleanUrls), 3. repli SPA sur /index.html.
 * Sert uniquement aux tests locaux (scripts/smoke-test.mjs).
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = 'dist';
const PORT = Number(process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
};

const exists = async (p) => {
  try {
    const s = await stat(p);
    return s.isFile();
  } catch {
    return false;
  }
};

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const candidates = [
    join(DIST, url),
    join(DIST, url, 'index.html'),
    join(DIST, `${url}.html`),
    join(DIST, 'index.html'),
  ];

  for (const file of candidates) {
    if (await exists(file)) {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
      res.end(body);
      return;
    }
  }

  res.writeHead(404);
  res.end('not found');
}).listen(PORT, () => console.log(`test server on http://localhost:${PORT}`));
