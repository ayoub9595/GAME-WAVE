/**
 * Tests de fumée sur le build de production, dans un vrai navigateur.
 *
 * Prérequis (une seule fois) :
 *   npm install -D playwright
 *   npx playwright install chromium
 *
 * Usage :
 *   npm run build
 *   node scripts/test-server.mjs &
 *   node scripts/smoke-test.mjs
 *
 * Les captures d'écran sont enregistrées dans test-shots/.
 * Variable optionnelle : CHROME_PATH pour pointer un binaire Chromium précis.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:4173';
const SHOTS = 'test-shots';
await mkdir(SHOTS, { recursive: true });

let pass = 0;
let fail = 0;
const errors = [];

const check = (name, ok, detail = '') => {
  if (ok) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name} ${detail}`);
    errors.push(`${name} ${detail}`);
  }
};

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ['--no-sandbox'],
});

async function newPage(viewport = { width: 1440, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const consoleErrors = [];
  // Le conteneur de test n'a pas accès à fonts.googleapis.com : on ignore
  // cette erreur réseau, qui ne vient pas du code du site.
  const isEnvNoise = (t) => /ERR_TUNNEL_CONNECTION_FAILED|ERR_NAME_NOT_RESOLVED|fonts\.g/.test(t);
  page.on('console', (m) => {
    if (m.type() === 'error' && !isEnvNoise(m.text())) consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => {
    if (!isEnvNoise(e.message)) consoleErrors.push(`pageerror: ${e.message}`);
  });
  return { ctx, page, consoleErrors };
}

// ------------------------------------------------------------- 1. Accueil
console.log('\n[1] Accueil');
{
  const { ctx, page, consoleErrors } = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

  const h1 = await page.locator('h1').first().innerText();
  check('un seul <h1>', (await page.locator('h1').count()) === 1, `(${await page.locator('h1').count()})`);
  check('H1 = titre de page fixe', /jeux gratuits/i.test(h1), `→ "${h1}"`);

  const cards = await page.locator('a[href^="/play/"]').count();
  check('cartes de jeu affichées', cards >= 16, `(${cards})`);

  check('nav catégories présente', (await page.locator('a[href^="/category/"]').count()) >= 4);
  check('footer présent', (await page.locator('footer').count()) >= 1);
  check('liens légaux dans le footer', (await page.locator('a[href="/privacy"]').count()) >= 1);

  // Bouton pause du carrousel (WCAG 2.2.2)
  const pauseBtn = page.locator('section[aria-label] button[aria-label*="carrousel"]');
  check('bouton pause du carrousel', (await pauseBtn.count()) === 1);
  if (await pauseBtn.count()) {
    const before = await pauseBtn.innerText();
    await pauseBtn.click();
    const after = await pauseBtn.innerText();
    check('le bouton pause change d\'état', before !== after, `${before} → ${after}`);
  }

  // Le H1 ne doit plus changer avec le carrousel
  const h1Before = await page.locator('h1').first().innerText();
  await page.waitForTimeout(1500);
  check('H1 stable', (await page.locator('h1').first().innerText()) === h1Before);

  // Images : vignettes webp, pas de PNG lourd
  const srcs = await page.locator('img').evaluateAll((els) => els.map((e) => e.getAttribute('src')));
  check('vignettes en .webp depuis /thumbs/', srcs.filter((s) => s && s.includes('/thumbs/')).length > 0);
  check('aucune image PNG d\'origine', !srcs.some((s) => s && /assets\/.*\.(png|jpg)/i.test(s)));

  await page.screenshot({ path: `${SHOTS}/01-home.png`, fullPage: false });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// ------------------------------- 2. Bug de la page blanche (recherche p.2)
console.log('\n[2] Recherche depuis la page 2 (bug page blanche)');
{
  const { ctx, page, consoleErrors } = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

  const next = page.locator('button', { hasText: /suivant/i }).first();
  check('pagination présente', (await next.count()) === 1);
  await next.click();
  await page.waitForTimeout(300);
  const pageInfo = await page.locator('span', { hasText: /Page 2/ }).count();
  check('page 2 atteinte', pageInfo === 1);

  // On tape une recherche qui ne renvoie qu'un résultat
  await page.locator('input').first().fill('snake');
  await page.waitForTimeout(500);

  const cardsAfter = await page.locator('a[href^="/play/"]').count();
  check('résultats affichés, pas de page blanche', cardsAfter >= 1, `(${cardsAfter} carte(s))`);
  await page.screenshot({ path: `${SHOTS}/02-search-from-page2.png` });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// ------------------------------------------------------- 3. Page de jeu
console.log('\n[3] Page de jeu /play/snake');
{
  const { ctx, page, consoleErrors } = await newPage();
  await page.goto(`${BASE}/play/snake`, { waitUntil: 'networkidle' });

  check('iframe du jeu présente', (await page.locator('iframe').count()) === 1);
  const iframeSrc = await page.locator('iframe').getAttribute('src');
  check('iframe pointe vers le bon jeu', iframeSrc === '/games/Snake/index.html', `→ ${iframeSrc}`);
  check('iframe en loading=lazy', (await page.locator('iframe').getAttribute('loading')) === 'lazy');

  const h1 = await page.locator('h1').first().innerText();
  check('H1 = titre du jeu', h1.trim() === 'Snake', `→ "${h1}"`);
  check('titre du document', /Snake/.test(await page.title()));

  const text = await page.locator('main').innerText();
  check('description longue présente', text.length > 600, `(${text.length} caractères)`);
  check('section « Comment jouer »', /Comment jouer/i.test(text));
  check('section « Jeux similaires »', /Jeux similaires/i.test(text));
  check('fil d\'Ariane', (await page.locator('a[href="/category/arcade"]').count()) >= 1);

  await page.screenshot({ path: `${SHOTS}/03-game.png`, fullPage: true });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// ------------------------------------------------- 4. Jeux renommés
console.log('\n[4] Slugs des jeux renommés');
{
  const { ctx, page } = await newPage();
  for (const [slug, title] of [
    ['block-stacker', 'Block Stacker'],
    ['dot-muncher', 'Dot Muncher'],
    ['flappy-wings', 'Flappy Wings'],
    ['sweet-match', 'Sweet Match'],
  ]) {
    await page.goto(`${BASE}/play/${slug}`, { waitUntil: 'domcontentloaded' });
    const h1 = (await page.locator('h1').first().innerText()).trim();
    check(`/play/${slug} → ${title}`, h1 === title, `→ "${h1}"`);
  }
  await ctx.close();
}

// ------------------------------------------------------------- 5. 404
console.log('\n[5] Page 404');
{
  const { ctx, page, consoleErrors } = await newPage();
  await page.goto(`${BASE}/nimporte-quoi`, { waitUntil: 'networkidle' });
  const text = await page.locator('main').innerText();
  check('page 404 affichée', /introuvable/i.test(text), `→ ${text.slice(0, 60)}`);
  check('suggestions de jeux', (await page.locator('main a[href^="/play/"]').count()) >= 3);
  await page.screenshot({ path: `${SHOTS}/05-404.png` });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// -------------------------------------------------------- 6. Catégorie
console.log('\n[6] Page catégorie /category/puzzle');
{
  const { ctx, page, consoleErrors } = await newPage();
  await page.goto(`${BASE}/category/puzzle`, { waitUntil: 'networkidle' });
  const h1 = await page.locator('h1').first().innerText();
  check('H1 catégorie', /Puzzle/i.test(h1), `→ "${h1}"`);
  check('jeux de la catégorie listés', (await page.locator('a[href^="/play/"]').count()) >= 5);
  check('autres catégories liées', (await page.locator('a[href^="/category/"]').count()) >= 3);

  await page.goto(`${BASE}/category/inexistante`, { waitUntil: 'networkidle' });
  check('catégorie inconnue → 404', /introuvable/i.test(await page.locator('main').innerText()));
  await page.screenshot({ path: `${SHOTS}/06-category.png` });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// --------------------------------------------------------- 7. Favoris
console.log('\n[7] Favoris');
{
  const { ctx, page, consoleErrors } = await newPage();
  await page.goto(`${BASE}/favorites`, { waitUntil: 'networkidle' });
  check('état vide affiché', /pas encore de favoris/i.test(await page.locator('main').innerText()));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const star = page.locator('button[aria-label*="Ajouter"]').first();
  check('bouton favori sur les cartes', (await star.count()) === 1);
  await star.click();
  await page.waitForTimeout(200);
  check('étoile devient active', (await page.locator('button[aria-label*="Retirer"]').count()) >= 1);
  check(
    'favori écrit dans localStorage',
    JSON.parse(await page.evaluate(() => localStorage.getItem('gamewave:favorites'))).length === 1
  );

  await page.goto(`${BASE}/favorites`, { waitUntil: 'networkidle' });
  check('le favori apparaît sur /favorites', (await page.locator('main a[href^="/play/"]').count()) >= 1);
  await page.screenshot({ path: `${SHOTS}/07-favorites.png` });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// -------------------------------------------------- 8. Pages légales
console.log('\n[8] Pages légales et statiques');
{
  const { ctx, page, consoleErrors } = await newPage();
  for (const [path, needle] of [
    ['/about', /À propos de Game Wave/i],
    ['/privacy', /confidentialité/i],
    ['/terms', /Conditions d/i],
    ['/contact', /contacter/i],
    ['/tools', /Outils/i],
  ]) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' });
    check(`${path} rendue`, needle.test(await page.locator('main').innerText()));
  }
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// ------------------------------------- 9. Redirection ancienne URL
console.log('\n[9] Anciennes URL numériques');
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/game/12`, { waitUntil: 'networkidle' });
  check('/game/12 → /play/flappy-wings', page.url().endsWith('/play/flappy-wings'), `→ ${page.url()}`);
  await page.goto(`${BASE}/play/12`, { waitUntil: 'networkidle' });
  const h1 = (await page.locator('h1').first().innerText()).trim();
  check('/play/12 affiche encore le jeu', h1 === 'Flappy Wings', `→ "${h1}"`);
  await ctx.close();
}

// --------------------------------------------------------- 10. Mobile
console.log('\n[10] Mobile (390x844)');
{
  const { ctx, page, consoleErrors } = await newPage({ width: 390, height: 844 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

  const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  check('pas de défilement horizontal', scrollW <= 391, `scrollWidth=${scrollW}`);

  const burger = page.locator('button[aria-label="Menu"]');
  check('bouton menu visible', await burger.isVisible());
  await burger.click();
  await page.waitForTimeout(400);
  const menuText = await page.locator('nav').first().innerText();
  check('menu annonce le bon nombre de jeux', /18 jeux/.test(menuText), `→ ${menuText.replace(/\n/g, ' ').slice(0, 120)}`);
  check('liens de catégorie dans le menu', (await page.locator('nav a[href^="/category/"]').count()) >= 4);
  check('plus de lien mort #action', (await page.locator('a[href^="#"]').count()) === 0);
  await page.screenshot({ path: `${SHOTS}/10-mobile-menu.png` });

  await page.goto(`${BASE}/play/snake`, { waitUntil: 'networkidle' });
  const scrollW2 = await page.evaluate(() => document.documentElement.scrollWidth);
  check('page de jeu sans débordement mobile', scrollW2 <= 391, `scrollWidth=${scrollW2}`);
  await page.screenshot({ path: `${SHOTS}/11-mobile-game.png`, fullPage: true });
  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await ctx.close();
}

// --------------------------------------- 11. Un jeu se lance vraiment
console.log('\n[11] Chargement réel d\'un jeu dans l\'iframe');
{
  const { ctx, page } = await newPage();
  const failed = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(`${BASE}/play/snake`, { waitUntil: 'networkidle' });
  await page.locator('iframe').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const frame = page.frames().find((f) => f.url().includes('/games/Snake/'));
  check('iframe chargée', Boolean(frame));
  if (frame) {
    const hasCanvas = await frame.locator('canvas, #game, .game, body *').count();
    check('contenu du jeu présent dans l\'iframe', hasCanvas > 0, `(${hasCanvas} éléments)`);
  }
  check('aucune requête en erreur', failed.length === 0, failed.slice(0, 3).join(' | '));
  await ctx.close();
}

// ------------------------------------ 12. Thème clair/sombre + langue
console.log('\n[12] Thème et langue');
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  check('lang du document = fr', (await page.evaluate(() => document.documentElement.lang)) === 'fr');
  const themeBefore = await page.evaluate(() => document.documentElement.dataset.theme);
  const toggle = page.locator('header [data-theme-toggle]');
  check('bouton de thème présent', (await toggle.count()) === 1);
  await toggle.click();
  await page.waitForTimeout(300);
  const themeAfter = await page.evaluate(() => document.documentElement.dataset.theme);
  check('bascule de thème fonctionnelle', themeBefore !== themeAfter, `${themeBefore} → ${themeAfter}`);
  await page.screenshot({ path: `${SHOTS}/12-theme.png` });
  await ctx.close();
}


// ------------------------------------ 13. Changement de langue
console.log('\n[13] Changement de langue');
{
  const { ctx, page, consoleErrors } = await newPage();

  const switchTo = async (lng) => {
    await page.selectOption('header select', lng);
    await page.waitForTimeout(400);
  };

  // --- Page de jeu : titre, description longue, contrôles, tags ---
  await page.goto(`${BASE}/play/chess`, { waitUntil: 'networkidle' });
  const frTitle = (await page.locator('article h1').innerText()).trim();
  const frText = await page.locator('article').innerText();
  check('FR : titre du jeu traduit', frTitle === 'Échecs', `→ "${frTitle}"`);
  check('FR : description en français', /jeu de stratégie le plus étudié/i.test(frText));
  check('FR : fil d\'Ariane en français', /Plateau/.test(frText));

  await switchTo('en');
  const enTitle = (await page.locator('article h1').innerText()).trim();
  const enText = await page.locator('article').innerText();
  check('EN : titre du jeu traduit', enTitle === 'Chess', `→ "${enTitle}"`);
  check('EN : description longue traduite', /most studied strategy game/i.test(enText));
  check('EN : description vraiment différente du FR', enText !== frText);
  check('EN : contrôles traduits', /Click a piece/i.test(enText));
  check('EN : tags traduits', /2 PLAYERS/i.test(enText) && !/2 JOUEURS/i.test(enText));
  check('EN : catégorie traduite dans le fil d\'Ariane', /Board/.test(enText));
  check('EN : titre de l\'onglet traduit', /^Play Chess on Game Wave$/.test(await page.title()), `→ "${await page.title()}"`);
  check('EN : lang du document', (await page.evaluate(() => document.documentElement.lang)) === 'en');

  await switchTo('es');
  const esText = await page.locator('article').innerText();
  check('ES : titre du jeu traduit', (await page.locator('article h1').innerText()).trim() === 'Ajedrez');
  check('ES : description longue traduite', /juego de estrategia más estudiado/i.test(esText));
  check('ES : catégorie traduite', /Mesa/.test(esText));

  await switchTo('de');
  const deText = await page.locator('article').innerText();
  check('DE : titre du jeu traduit', (await page.locator('article h1').innerText()).trim() === 'Schach');
  check('DE : description longue traduite', /meistuntersuchte Strategiespiel/i.test(deText));
  check('DE : catégorie traduite', /Brettspiele/.test(deText));

  // --- Accueil : noms de catégories dans la barre de navigation ---
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const navText = async () => (await page.locator('main nav').first().innerText()).replace(/\n/g, ' ');
  check('DE conservé après navigation', /Brettspiele/.test(await navText()), `→ ${await navText()}`);
  await switchTo('fr');
  check('FR : catégories dans la barre', /Plateau/.test(await navText()), `→ ${await navText()}`);
  await switchTo('en');
  check('EN : catégories dans la barre', /Board/.test(await navText()), `→ ${await navText()}`);
  check('EN : plus de nom français', !/Plateau/.test(await navText()));

  // --- Page catégorie : H1 et intro ---
  await page.goto(`${BASE}/category/plateau`, { waitUntil: 'networkidle' });
  const catH1 = await page.locator('main h1').innerText();
  check('EN : H1 de catégorie traduit', /Free Board games online/i.test(catH1), `→ "${catH1}"`);
  check('EN : intro de catégorie traduite', /Chess, checkers/i.test(await page.locator('main').innerText()));

  // --- Menu mobile et footer ---
  const footer = await page.locator('footer').innerText();
  check('EN : catégories dans le footer', /Board/.test(footer) && !/Plateau/.test(footer));
  check('EN : libellés du footer traduits', /categories/i.test(footer) && /legal/i.test(footer), `→ ${footer.split('\n').slice(0, 6).join(' | ')}`);

  // --- Persistance ---
  check(
    'langue mémorisée dans localStorage',
    (await page.evaluate(() => localStorage.getItem('language'))) === 'en'
  );
  await page.reload({ waitUntil: 'networkidle' });
  check('langue conservée après rechargement', /Board/.test(await page.locator('footer').innerText()));

  // --- Aucune clé brute affichée ---
  const body = await page.locator('body').innerText();
  check('aucune clé de traduction affichée', !/games\.[a-z0-9-]+\.|categories\.[a-z]+\.|tags\./.test(body));

  check('aucune erreur console', consoleErrors.length === 0, consoleErrors.slice(0, 2).join(' | '));
  await page.screenshot({ path: `${SHOTS}/13-lang-en.png`, fullPage: false });
  await ctx.close();
}

// ------------------------------- 14. Cartes : titres traduits
console.log('\n[14] Titres traduits sur les cartes');
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const frCards = await page.locator('h3').allInnerTexts();
  check('FR : « Échecs » et « Dames » sur les cartes', frCards.includes('Échecs') && frCards.includes('Dames'), `→ ${frCards.slice(0, 4)}`);
  await page.selectOption('header select', 'en');
  await page.waitForTimeout(500);
  const enCards = await page.locator('h3').allInnerTexts();
  check('EN : « Chess » et « Checkers » sur les cartes', enCards.includes('Chess') && enCards.includes('Checkers'), `→ ${enCards.slice(0, 4)}`);
  check('EN : plus de titre français', !enCards.includes('Échecs'));
  await ctx.close();
}

await browser.close();

console.log(`\n${'='.repeat(50)}`);
console.log(`RÉSULTAT : ${pass} tests OK, ${fail} échec(s)`);
if (fail) {
  console.log('\nÉchecs :');
  errors.forEach((e) => console.log(`  - ${e}`));
}
process.exit(fail ? 1 : 0);
