/**
 * Corrections sur les fichiers tiers (les jeux dans public/games) et suppression
 * des fichiers parasites.
 *
 * Ce script est IDEMPOTENT : le relancer ne casse rien, il ne fait que ce qui
 * reste à faire. Il est fourni pour deux raisons :
 *   1. ces retouches touchent du code tiers, il vaut mieux qu'elles soient
 *      tracées et rejouables plutôt que faites à la main ;
 *   2. si tu remplaces un jeu par une version plus récente, tu relances le
 *      script et les retouches sont réappliquées.
 *
 * Usage : node scripts/apply-content-fixes.mjs
 */
import { readFile, writeFile, rm, stat } from 'node:fs/promises';

const log = [];
const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

// ---------------------------------------------------------------------------
// 1. Fichiers parasites : ni utiles au site, ni à sa maintenance.
// ---------------------------------------------------------------------------
const JUNK = [
  'hex_dump.txt', // vidage hexadécimal oublié
  'RESPONSIVE_DESIGN_AUDIT.md', // notes d'audit, remplacées par CHANGELOG.md
  'public/games/tetris-game/css/Software-v2.5-alpha.1.zip', // archive de 0 usage dans un dossier css/
  'public/robots.txt', // pointait vers www.gamewave.com : domaine non possédé
  'public/sitemap.xml', // idem, et déclarait /action et /aventure qui n'existent pas
];

for (const file of JUNK) {
  if (await exists(file)) {
    await rm(file, { recursive: true, force: true });
    log.push(`supprimé   ${file}`);
  }
}

// ---------------------------------------------------------------------------
// 2. Code AdSense factice dans les iframes de jeu.
//    Identifiant placeholder ca-pub-XXXX : aucune recette, des erreurs console,
//    et une logique publicitaire hors du périmètre du consentement.
//    La publicité passe désormais par <AdSlot> côté React.
// ---------------------------------------------------------------------------
const AD_FILES = [
  'public/games/Minesweeper/index.html',
  'public/games/Pong/index.html',
  'public/games/2048/index.html',
  'public/games/floppybird/index.html',
];

const NOTE =
  '<!-- Code AdSense factice retire (identifiant placeholder ca-pub-XXXX).\n' +
  '     La publicite est geree depuis React via <AdSlot>, jamais dans les iframes. -->\n';

for (const file of AD_FILES) {
  if (!(await exists(file))) continue;
  const before = await readFile(file, 'utf8');
  let s = before;

  // le <script async src="...adsbygoogle.js...">, sur une ou deux lignes
  s = s.replace(
    /[ \t]*<script async src="https:\/\/pagead2\.googlesyndication\.com[^>]*?>\s*<\/script>\s*\n?/gs,
    ''
  );
  // le conteneur <div class="ad-slot"> avec son <ins> et son <script> (2048)
  s = s.replace(/[ \t]*<div class="ad-slot">\s*<ins class="adsbygoogle"[\s\S]*?<\/div>\s*\n?/g, '');
  // tout <ins class="adsbygoogle"> restant
  s = s.replace(/[ \t]*<ins class="adsbygoogle"[\s\S]*?<\/ins>\s*\n?/g, '');
  // les blocs <script> qui initialisent ou poussent adsbygoogle
  s = s.replace(
    /[ \t]*<script>\s*(?:var adsbygoogle|adsbygoogle\.push)[\s\S]*?<\/script>\s*\n?/g,
    ''
  );

  if (s !== before) {
    if (!s.includes('Code AdSense factice')) s = s.replace('</head>', `${NOTE}</head>`);
    await writeFile(file, s);
    log.push(`AdSense retiré  ${file}`);
  }
}

// ---------------------------------------------------------------------------
// 3. Marques déposées dans les fichiers des jeux.
//    Renommer le titre côté React ne suffit pas : ces chaînes sont visibles
//    dans l'iframe (onglet, en-tête du jeu, écran-titre).
// ---------------------------------------------------------------------------
const RENAMES = [
  ['public/games/tetris-game/index.html', [
    ['<title>Tetris - Classic Puzzle Game</title>', '<title>Block Stacker - Game Wave</title>'],
    ['<h1>Tetris</h1>', '<h1>Block Stacker</h1>'],
  ]],
  ['public/games/Pacman/index.html', [
    ['<title>Pac-Man</title>', '<title>Dot Muncher - Game Wave</title>'],
    [
      "Pac-Man est un jeu d'arcade classique des années 80. Ce jeu utilise HTML5 pour une version améliorée avec plusieurs niveaux et une intelligence artificielle avancée pour les fantômes.",
      "Dot Muncher est un jeu de labyrinthe d'arcade en HTML5 : avale toutes les pastilles en évitant les fantômes, sur plusieurs niveaux.",
    ],
    ['content="Pac-Man, jeu d\'arcade, HTML5, Javascript"', 'content="jeu de labyrinthe, jeu d\'arcade, HTML5, Javascript"'],
  ]],
  ['public/games/Pacman/static/script/index.js', [
    // Écran-titre dessiné dans le canvas
    ["fillText('Pac-Man'", "fillText('Dot Muncher'"],
  ]],
  ['public/games/Candycrash/index.html', [
    ['<title>Candy Crush - Portail Jeux</title>', '<title>Sweet Match - Game Wave</title>'],
    ['<h2>🍬 Candy Crush</h2>', '<h2>🍬 Sweet Match</h2>'],
  ]],
  ['public/games/floppybird/index.html', [
    ['<title>Floppy Bird - Play Online</title>', '<title>Flappy Wings - Game Wave</title>'],
  ]],
];

for (const [file, pairs] of RENAMES) {
  if (!(await exists(file))) {
    log.push(`ABSENT     ${file}`);
    continue;
  }
  const before = await readFile(file, 'utf8');
  let s = before;
  for (const [from, to] of pairs) s = s.split(from).join(to);
  if (s !== before) {
    await writeFile(file, s);
    log.push(`renommé    ${file}`);
  }
}

// ---------------------------------------------------------------------------
// 4. Bibliothèques externes servies depuis le site (« vendorisées »).
//
//    Trois jeux chargeaient leur bibliothèque depuis un CDN public. Résultat
//    mesuré : si le CDN est injoignable — réseau d'entreprise, bloqueur de
//    publicité, filtrage pays, panne — le jeu ne démarre pas du tout :
//      Chess  -> « Chess is not defined »   (cdnjs.cloudflare.com)
//      Pong   -> « $ is not defined »       (code.jquery.com)
//      Fruits -> « $ is not defined »       (ajax.googleapis.com)
//
//    Les fichiers sont désormais dans public/games/<jeu>/vendor/, avec leur
//    licence à côté (jQuery et Bootstrap : MIT ; chess.js : BSD-2-Clause).
//    Bénéfice annexe : une requête tierce de moins, donc une page de
//    confidentialité plus simple à tenir à jour.
// ---------------------------------------------------------------------------
const VENDOR = [
  ['public/games/Chess/chess.html', [
    [
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>',
      '<script src="vendor/chess.lib.js"></script>',
    ],
  ]],
  ['public/games/Pong/index.html', [
    [
      '<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>',
      '<script src="vendor/jquery.min.js"></script>',
    ],
    [
      '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>',
      '<script src="vendor/bootstrap.bundle.min.js"></script>',
    ],
    [
      '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />',
      '<link rel="stylesheet" href="vendor/bootstrap.min.css" />',
    ],
  ]],
  ['public/games/fruits/index.html', [
    [
      '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>',
      '<script src="vendor/jquery.min.js"></script>',
    ],
    // jQuery UI n'est utilisé nulle part dans le jeu (0 appel à draggable,
    // sortable, dialog...) : on retire le script et son thème.
    [
      '<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>',
      '<!-- jQuery UI retire : aucune de ses API n\'etait utilisee par le jeu -->',
    ],
    [
      'href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" />',
      'href="data:text/css," />',
    ],
  ]],
];

for (const [file, pairs] of VENDOR) {
  if (!(await exists(file))) {
    log.push(`ABSENT     ${file}`);
    continue;
  }
  const before = await readFile(file, 'utf8');
  let s = before;
  for (const [from, to] of pairs) s = s.split(from).join(to);
  if (s !== before) {
    await writeFile(file, s);
    log.push(`bibliothèque servie en local  ${file}`);
  }
}

// ---------------------------------------------------------------------------
// 5. Contrôle final
// ---------------------------------------------------------------------------
const LEFTOVERS = [
  ['adsbygoogle', AD_FILES],
  ['Tetris', ['public/games/tetris-game/index.html']],
  ['Pac-Man', ['public/games/Pacman/index.html', 'public/games/Pacman/static/script/index.js']],
  ['Candy Crush', ['public/games/Candycrash/index.html']],
];

let problems = 0;
for (const [needle, files] of LEFTOVERS) {
  for (const file of files) {
    if (!(await exists(file))) continue;
    const s = await readFile(file, 'utf8');
    if (s.includes(needle)) {
      console.error(`⚠ "${needle}" encore présent dans ${file}`);
      problems++;
    }
  }
}

console.log(log.length ? log.join('\n') : 'Rien à faire : tout est déjà appliqué.');
console.log(problems ? `\n${problems} occurrence(s) à vérifier à la main.` : '\nContrôle final : OK.');
