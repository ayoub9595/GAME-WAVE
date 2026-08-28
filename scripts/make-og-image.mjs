/**
 * Génère public/og-default.png (1200 x 630) : l'image de partage par défaut,
 * utilisée pour l'accueil et toutes les pages sans vignette propre.
 * Usage : node scripts/make-og-image.mjs
 * À relancer uniquement si tu changes le logo ou le slogan.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const W = 1200;
const H = 630;

// Les couleurs reprennent les tokens de src/styles/theme.css
const BG = '#020617';
const PRIMARY = '#22d3ee';
const SECONDARY = '#a855f7';
const TEXT = '#e5e7eb';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${SECONDARY}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Vague décorative, clin d'oeil au nom du site -->
  <path d="M0 470 C 200 400, 400 540, 600 470 S 1000 400, 1200 470 L1200 630 L0 630 Z"
        fill="${PRIMARY}" opacity="0.10"/>
  <path d="M0 520 C 220 450, 420 590, 620 520 S 1010 450, 1200 520 L1200 630 L0 630 Z"
        fill="${SECONDARY}" opacity="0.10"/>

  <text x="${W / 2}" y="290" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="118" font-weight="bold"
        fill="url(#brand)" letter-spacing="6">GAME WAVE</text>

  <text x="${W / 2}" y="360" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="500"
        fill="${TEXT}" opacity="0.9">Jeux gratuits en ligne, sans téléchargement</text>

  <rect x="${W / 2 - 150}" y="404" width="300" height="6" rx="3" fill="url(#brand)" opacity="0.7"/>
</svg>`;

await mkdir('public', { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-default.png');
console.log('public/og-default.png généré (1200 x 630)');
