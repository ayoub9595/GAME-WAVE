/**
 * Audit du rendu mobile : dépassements de largeur, cibles tactiles trop
 * petites, accessibilité de la recherche. Captures dans test-shots/mobile/.
 *
 * Prérequis : npm run build, puis node scripts/test-server.mjs
 * Usage : node scripts/mobile-audit.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = 'http://localhost:4173';
await mkdir('test-shots/mobile', { recursive: true });

const b = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--no-sandbox'],
});

const VIEWPORTS = [
  ['iphone-se', 375, 667],
  ['galaxy-s', 360, 740],
  ['iphone-14', 390, 844],
  ['tablet', 768, 1024],
];

const PAGES = ['/', '/play/snake', '/category/puzzle', '/privacy', '/favorites'];

for (const [vname, w, h] of VIEWPORTS) {
  for (const path of PAGES) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto(BASE + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);

    const diag = await p.evaluate(() => {
      const out = { overflow: document.documentElement.scrollWidth - window.innerWidth, wide: [], tiny: [] };
      // éléments qui dépassent la largeur du viewport
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width > window.innerWidth + 1 && r.height > 0) {
          out.wide.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 28)} w=${Math.round(r.width)}`);
        }
      }
      // cibles tactiles trop petites (< 40px)
      for (const el of document.querySelectorAll('a, button, input')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40)) {
          out.tiny.push(`${el.tagName.toLowerCase()} ${Math.round(r.width)}x${Math.round(r.height)} "${(el.innerText || el.getAttribute('aria-label') || '').slice(0, 18).replace(/\n/g, ' ')}"`);
        }
      }
      out.wide = [...new Set(out.wide)].slice(0, 6);
      out.tiny = [...new Set(out.tiny)].slice(0, 8);
      // la recherche est-elle atteignable ? (input visible, ou loupe presente)
      const input = document.querySelector('header input');
      const toggle = document.querySelector('header [aria-expanded]');
      const vis = (el) => el && el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().right <= window.innerWidth + 1;
      out.searchVisible = vis(input) ? 'champ visible' : vis(toggle) ? 'via la loupe' : 'INATTEIGNABLE';
      return out;
    });

    console.log(`${vname} ${w}px ${path}`);
    console.log(`  overflowX=${diag.overflow}  recherche=${diag.searchVisible}`);
    if (diag.wide.length) console.log(`  trop large : ${diag.wide.join(' | ')}`);
    if (diag.tiny.length) console.log(`  cibles < 40px : ${diag.tiny.join(' | ')}`);

    if (vname === 'iphone-14' || vname === 'galaxy-s') {
      await p.screenshot({
        path: `test-shots/mobile/${vname}${path.replace(/\//g, '_') || '_home'}.png`,
        fullPage: path !== '/play/snake',
      });
    }
    await p.close();
  }
}
await b.close();
