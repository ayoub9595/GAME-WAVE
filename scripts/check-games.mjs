/**
 * Vérifie que les 18 jeux se chargent réellement, et liste leurs dépendances
 * externes.
 *
 * Deux choses distinctes sont mesurées :
 *   - les ERREURS JAVASCRIPT : un jeu qui en produit est cassé pour de bon ;
 *   - les REQUÊTES EXTERNES : si l'hôte tiers tombe, est bloqué par un
 *     bloqueur de publicité ou filtré par un réseau d'entreprise, le jeu perd
 *     la ressource concernée. Quand la ressource est une bibliothèque, le jeu
 *     ne fonctionne plus du tout.
 *
 * Prérequis : npm run build, puis node scripts/test-server.mjs
 * Usage : node scripts/check-games.mjs
 */
import { chromium } from 'playwright';
import { games } from '../src/data/games.data.js';

const BASE = process.env.BASE || 'http://localhost:4173';

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--no-sandbox'],
});

let broken = 0;
const externalHosts = new Map();

for (const game of games) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const jsErrors = [];
  const failed = [];

  // Messages qui ne sont pas des bugs du jeu :
  //  - « Failed to load resource » : compté séparément en requête échouée ;
  //  - « play() failed because the user didn't interact... » : politique
  //    d'autoplay du navigateur, le son démarre au premier clic. Normal.
  const benign = (text) =>
    /Failed to load resource/.test(text) ||
    /play\(\) failed because the user didn't interact/.test(text);

  page.on('pageerror', (e) => {
    const msg = e.message.split('\n')[0];
    if (!benign(msg)) jsErrors.push(msg);
  });
  page.on('console', (m) => {
    const msg = m.text().split('\n')[0];
    if (m.type() === 'error' && !benign(msg)) jsErrors.push(msg);
  });
  page.on('requestfailed', (r) => {
    const url = r.url();
    if (!url.startsWith(BASE)) {
      const host = new URL(url).host;
      failed.push(host);
      externalHosts.set(host, (externalHosts.get(host) || 0) + 1);
    }
  });

  await page.goto(BASE + game.gamePath, { waitUntil: 'load' }).catch(() => {});
  await page.waitForTimeout(1800);

  const unique = [...new Set(jsErrors)];
  const hosts = [...new Set(failed)];
  const status = unique.length ? '✗' : '✓';
  if (unique.length) broken++;

  console.log(`${status} ${game.slug.padEnd(20)} ${game.gamePath}`);
  if (unique.length) unique.slice(0, 3).forEach((e) => console.log(`    erreur JS : ${e}`));
  if (hosts.length) console.log(`    hôtes externes injoignables : ${hosts.join(', ')}`);

  await page.close();
}

await browser.close();

console.log('\n' + '='.repeat(60));
console.log(`${games.length - broken}/${games.length} jeux sans erreur JavaScript`);
if (externalHosts.size) {
  console.log('\nDépendances externes rencontrées (bloquées dans ce conteneur) :');
  [...externalHosts.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([host, n]) => console.log(`  ${host}  (${n} requête${n > 1 ? 's' : ''})`));
}
process.exit(broken ? 1 : 0);
