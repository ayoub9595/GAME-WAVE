/**
 * Génère un fichier HTML par route dans dist/, avec ses propres métadonnées,
 * ses balises Open Graph et son JSON-LD. Génère aussi sitemap.xml et robots.txt.
 *
 * Pourquoi c'est indispensable : TikTok, Discord, WhatsApp, Facebook et une
 * partie des robots d'indexation n'exécutent pas le JavaScript. Sans ce
 * prerender, toutes les URL du site renvoient le même <title> et aucune
 * vignette de partage.
 *
 * À lancer APRÈS `vite build`. Usage : node scripts/prerender.mjs
 * Domaine : variable d'environnement SITE_URL, sinon site.url (src/data/site.js).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { games, categories } from '../src/data/games.data.js';
import { site } from '../src/data/site.js';

const SITE = (process.env.SITE_URL || site.url).replace(/\/$/, '');
const DIST = 'dist';
const LOCALE = 'fr_FR';

const shell = await readFile(join(DIST, 'index.html'), 'utf8');

/** Échappement complet pour insertion dans du texte ou un attribut HTML. */
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Coupe à la limite d'un mot, sans laisser de mot tronqué. */
const clamp = (text, max = 158) => {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

function buildPage({ path, title, description, ogImage, jsonLd, body }) {
  const url = `${SITE}${path}`;
  const image = `${SITE}${ogImage}`;
  const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean);

  const head = `
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Game Wave" />
  <meta property="og:locale" content="${LOCALE}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:alt" content="${esc(title)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${image}" />${blocks
    .map((b) => `\n  <script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join('')}`;

  return (
    shell
      // On retire le title et la description du shell pour éviter les doublons
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace(/<meta name="description"[^>]*>/, '')
      .replace('</head>', `${head}\n</head>`)
      // Contenu statique dans #root : lu par les robots qui n'exécutent pas de
      // JS, puis remplacé par React au montage pour les vrais visiteurs.
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  );
}

async function emit(path, html) {
  const dir = path === '/' ? DIST : join(DIST, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

const gameList = (list) =>
  `<ul>${list.map((g) => `<li><a href="/play/${g.slug}">${esc(g.title)}</a></li>`).join('')}</ul>`;

const categoryLinks = () =>
  `<nav><ul>${categories
    .map((c) => `<li><a href="/category/${c.slug}">Jeux ${esc(c.name)}</a></li>`)
    .join('')}</ul></nav>`;

const siteFooter = `<footer><ul>
  <li><a href="/about">À propos</a></li>
  <li><a href="/privacy">Politique de confidentialité</a></li>
  <li><a href="/terms">Conditions d'utilisation</a></li>
  <li><a href="/contact">Contact</a></li>
</ul></footer>`;

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${SITE}${it.path}`,
  })),
});

const pages = [];

// ---------------------------------------------------------------- Accueil
pages.push({
  path: '/',
  title: 'Game Wave — Jeux gratuits en ligne, sans téléchargement',
  description: `Joue à ${games.length} jeux HTML5 gratuits directement dans ton navigateur : arcade, puzzle, plateau, action. Aucune installation, aucun compte.`,
  ogImage: '/og-default.png',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Game Wave',
    url: SITE,
    inLanguage: 'fr',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE}/?search={query}`,
      'query-input': 'required name=query',
    },
  },
  body:
    `<h1>Game Wave — jeux gratuits en ligne</h1>` +
    `<p>${games.length} jeux jouables directement dans le navigateur, sans téléchargement ni inscription.</p>` +
    categoryLinks() +
    gameList(games) +
    siteFooter,
});

// ------------------------------------------------------------- Catégories
for (const c of categories) {
  const list = games.filter((g) => g.category === c.slug);
  pages.push({
    path: `/category/${c.slug}`,
    title: `Jeux ${c.name} gratuits en ligne | Game Wave`,
    description: clamp(`${c.description} ${list.length} jeux jouables sans téléchargement.`),
    ogImage: list[0]?.image || '/og-default.png',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Jeux ${c.name}`,
        url: `${SITE}/category/${c.slug}`,
        description: c.description,
        inLanguage: 'fr',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: list.length,
          itemListElement: list.map((g, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: g.title,
            url: `${SITE}/play/${g.slug}`,
          })),
        },
      },
      breadcrumb([
        { name: 'Accueil', path: '/' },
        { name: c.name, path: `/category/${c.slug}` },
      ]),
    ],
    body:
      `<h1>Jeux ${esc(c.name)} gratuits en ligne</h1><p>${esc(c.description)}</p>` +
      gameList(list) +
      categoryLinks() +
      siteFooter,
  });
}

// ---------------------------------------------------------- Pages de jeu
for (const g of games) {
  const desc = g.longDescription || g.shortDescription || `Joue à ${g.title} gratuitement en ligne.`;
  const category = categories.find((c) => c.slug === g.category);
  const related = games.filter((x) => x.category === g.category && x.slug !== g.slug).slice(0, 6);

  pages.push({
    path: `/play/${g.slug}`,
    title: `Jouer à ${g.title} en ligne gratuitement | Game Wave`,
    description: clamp(g.shortDescription || desc),
    ogImage: g.image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: g.title,
        url: `${SITE}/play/${g.slug}`,
        image: `${SITE}${g.image}`,
        description: desc,
        genre: category?.name || g.category,
        inLanguage: 'fr',
        playMode: g.tags?.includes('2 joueurs') ? 'MultiPlayer' : 'SinglePlayer',
        applicationCategory: 'Game',
        operatingSystem: 'Web browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        ...(g.credit ? { author: { '@type': 'Person', name: g.credit } } : {}),
      },
      breadcrumb([
        { name: 'Accueil', path: '/' },
        ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
        { name: g.title, path: `/play/${g.slug}` },
      ]),
    ],
    body:
      `<h1>${esc(g.title)}</h1><p>${esc(desc)}</p>` +
      (g.controls ? `<h2>Comment jouer</h2><p>${esc(g.controls)}</p>` : '') +
      (g.credit || g.license
        ? `<h2>Crédits et licence</h2><p>${esc(
            [g.credit && `Créé par ${g.credit}`, g.license && `Licence : ${g.license}`]
              .filter(Boolean)
              .join('. ')
          )}.</p>`
        : '') +
      (related.length ? `<h2>Jeux similaires</h2>${gameList(related)}` : '') +
      (category ? `<p><a href="/category/${category.slug}">Tous les jeux ${esc(category.name)}</a></p>` : '') +
      `<p><a href="/">Retour à l'accueil</a></p>` +
      siteFooter,
  });
}

// ------------------------------------------------------- Pages statiques
const staticPages = [
  {
    path: '/about',
    title: 'À propos de Game Wave',
    description: `Qui édite Game Wave, comment le site fonctionne et d'où viennent les ${games.length} jeux du catalogue.`,
    body: `<h1>À propos de Game Wave</h1><p>Game Wave est un site de jeux jouables directement dans le navigateur : pas de téléchargement, pas d'installation, pas de compte. Le catalogue compte ${games.length} jeux répartis en ${categories.length} catégories.</p>`,
  },
  {
    path: '/privacy',
    title: 'Politique de confidentialité | Game Wave',
    description:
      'Quelles données Game Wave traite, ce qu’il ne fait pas, et comment exercer tes droits. Aucun compte, aucun cookie de suivi.',
    body: `<h1>Politique de confidentialité</h1><p>Game Wave fonctionne sans compte utilisateur. Le site ne demande ni nom, ni e-mail, ni mot de passe pour jouer, et ne construit pas de profil publicitaire.</p>`,
  },
  {
    path: '/terms',
    title: "Conditions d'utilisation | Game Wave",
    description:
      "Les règles d'utilisation de Game Wave : accès au service, propriété intellectuelle, signalement et retrait de contenu.",
    body: `<h1>Conditions d'utilisation</h1><p>Game Wave met à disposition gratuitement des jeux jouables dans le navigateur. Les jeux restent la propriété de leurs auteurs, crédités sur leur page.</p>`,
  },
  {
    path: '/contact',
    title: 'Contact | Game Wave',
    description:
      'Signaler un problème, corriger une attribution, demander le retrait d’un jeu ou proposer une idée.',
    body: `<h1>Nous contacter</h1><p>Un jeu qui ne se lance pas, une erreur d'attribution, une demande de retrait ou une suggestion : un seul point de contact.</p>`,
  },
  {
    path: '/tools',
    title: 'Outils gaming recommandés | Game Wave',
    description:
      'Notre sélection de matériel et de logiciels utiles pour jouer confortablement, y compris sur des jeux navigateur.',
    body: `<h1>Outils et matériel recommandés</h1><p>Une sélection courte de matériel et de logiciels utiles pour jouer confortablement. Aucun achat n'est nécessaire pour jouer sur Game Wave.</p>`,
  },
];

for (const p of staticPages) {
  pages.push({
    ...p,
    ogImage: '/og-default.png',
    jsonLd: breadcrumb([
      { name: 'Accueil', path: '/' },
      { name: p.title.split('|')[0].trim(), path: p.path },
    ]),
    body: p.body + siteFooter,
  });
}

// -------------------------------------------------------------- Écriture
for (const p of pages) await emit(p.path, buildPage(p));

// sitemap.xml — plus jamais écrit à la main.
// Priorités : accueil > catégories > jeux > pages statiques.
const today = new Date().toISOString().slice(0, 10);
const priorityOf = (path) => {
  if (path === '/') return '1.0';
  if (path.startsWith('/category/')) return '0.8';
  if (path.startsWith('/play/')) return '0.7';
  return '0.3';
};

await writeFile(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod><priority>${priorityOf(p.path)}</priority></url>`
  )
  .join('\n')}
</urlset>
`
);

await writeFile(
  join(DIST, 'robots.txt'),
  `User-agent: *
Allow: /

# Page personnelle, stockée côté navigateur : rien à indexer
Disallow: /favorites

Sitemap: ${SITE}/sitemap.xml
`
);

console.log(`${pages.length} pages prérendues + sitemap.xml + robots.txt  (domaine : ${SITE})`);
