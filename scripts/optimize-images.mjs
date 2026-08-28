/**
 * Convertit les vignettes en WebP redimensionné, puis les place dans public/thumbs/.
 * Usage : node scripts/optimize-images.mjs
 * Les originaux sont déplacés dans src/assets/_originals/ (non versionné).
 *
 * Pourquoi public/thumbs/ et pas src/assets/ : Vite ajoute un hash au nom des
 * fichiers importés depuis src/ à chaque build. Les balises Open Graph ont besoin
 * d'URL stables pour que Facebook, Discord ou WhatsApp puissent mettre en cache
 * l'aperçu. public/ sert les fichiers tels quels : /thumbs/snake.webp ne bougera plus.
 */
import sharp from 'sharp';
import { readdir, mkdir, rename, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const SRC = 'src/assets';
const OUT = 'public/thumbs';
const BACKUP = join(SRC, '_originals');
const MAX_WIDTH = 440; // 2x la largeur d'affichage max des cartes (220px) -> net en écran Retina
const QUALITY = 78;

// Renommage en slug propre au passage (les noms d'origine sont incohérents).
// Les 4 jeux renommés pour raison de marque déposée pointent vers leur nouveau slug.
const RENAME = {
  'whack-a-mole': 'whack-a-mole',
  Snakegame: 'snake',
  TicTacToe: 'tic-tac-toe',
  'Tilt-Maze': 'tilt-maze',
  'pong-game': 'pong',
  Minesweeper: 'minesweeper',
  'Candy-crash': 'sweet-match',
  2048: '2048',
  FlappyBird: 'flappy-wings',
  fruits: 'fruits',
  Pacman: 'dot-muncher',
  Chess: 'chess',
  'tetris-game': 'block-stacker',
  checkers: 'checkers',
  'ninja-vs-evilcorp': 'ninja-vs-evilcorp',
  choch: 'choch',
  'edge-not-found': 'edge-not-found',
  fourfold: 'fourfold',
  LoadRunner: 'load-runner',
  'geometry-dash': 'geometry-dash',
  outrun: 'outrun',
};

const EXT = new Set(['.png', '.jpg', '.jpeg']);
await mkdir(BACKUP, { recursive: true });
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => EXT.has(extname(f).toLowerCase()));
let before = 0;
let after = 0;

for (const file of files) {
  const stem = basename(file, extname(file));
  const name = RENAME[stem] || stem.toLowerCase();
  const input = join(SRC, file);
  const output = join(OUT, `${name}.webp`);

  const { size: sizeBefore } = await stat(input);
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(output);
  await rename(input, join(BACKUP, file));

  const { size: sizeAfter } = await stat(output);
  before += sizeBefore;
  after += sizeAfter;
  console.log(
    `${file.padEnd(28)} ${(sizeBefore / 1024).toFixed(0).padStart(6)} Ko -> ${(sizeAfter / 1024).toFixed(0).padStart(4)} Ko  (${name}.webp)`
  );
}

console.log('-'.repeat(72));
console.log(
  `TOTAL  ${(before / 1048576).toFixed(1)} Mo -> ${(after / 1024).toFixed(0)} Ko (-${(100 - (after / before) * 100).toFixed(1)} %)`
);
