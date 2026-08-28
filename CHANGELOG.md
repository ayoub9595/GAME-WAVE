# Journal des modifications — Game Wave

Toutes les modifications appliquées à partir du document `modificationsgamewave.md`,
avec pour chacune : ce qui a été fait, les fichiers touchés, la raison, le résultat
et les tests effectués.

---

## Version 2.1.0 — 27 août 2026

Deuxième passe, à la demande : affichage mobile et internationalisation du contenu.

**Vérifications** : `npm run build` OK, `npx eslint .` 0 erreur,
**97 tests navigateur OK / 0 échec**, **18/18 jeux sans erreur JavaScript**.

### A. Affichage mobile

#### A1. Le header était cassé sur mobile — menu, langue et thème inaccessibles

**Fichiers.** `src/components/logo/Logo.jsx`, `src/components/logo/Logo.module.css`,
`src/components/header/Header.jsx`, `src/components/header/Header.module.css`.

**Le problème.** Le SVG du logo avait `width="400"` en dur. Sur un écran de
375 ou 390 px, il était donc plus large que la fenêtre, et poussait le bouton
hamburger, le sélecteur de langue et le bouton de thème hors du champ visible —
où `overflow: hidden` sur le header les masquait silencieusement. Résultat
concret : **sur mobile, il était impossible d'ouvrir le menu, de changer de
langue ou de changer de thème.** Le logo lui-même était tronqué
(« PASSEZ AU NIVEAU SUPÉRIE »).

Ce bug avait échappé aux tests précédents : `isVisible()` de Playwright ne
vérifie que les propriétés CSS, pas si l'élément se trouve dans la fenêtre. Le
test vérifie maintenant que la boîte englobante tient dans le viewport.

**La correction.** Le SVG n'a plus de dimensions en dur : sa taille est pilotée
par la CSS (`width: clamp(150px, 34vw, 290px)`), le `viewBox` fait le reste.
`overflow: hidden` retiré du header. Le logo devient aussi un lien vers l'accueil.

#### A2. La recherche était totalement absente sur mobile

**Fichiers.** `src/components/header/Header.jsx`, `Header.module.css`.

**Le problème.** `.header-search { display: none }` sous 768 px : aucun moyen de
chercher un jeu sur mobile ou sur tablette.

**La correction.** Le header devient un unique conteneur `flex` avec
`flex-wrap`. Sur grand écran : une ligne (logo / recherche / actions). Sous
900 px : une loupe apparaît dans les actions et déplie la recherche sur une
deuxième ligne pleine largeur. Repliée au repos, donc sans hauteur perdue ; et
dépliée automatiquement si l'URL contient déjà `?search=`.

#### A3. Hero illisible sur petit écran

**Fichiers.** `src/components/heroBanner/HeroBanner.module.css`.

**Le problème.** La colonne de texte était limitée à 52 % de la largeur, soit
environ 200 px sur un téléphone : le titre passait sur trois lignes et le
dégradé ne garantissait pas le contraste par-dessus l'image.

**La correction.** Sous 768 px, le hero passe en pile verticale : le texte
occupe toute la largeur, l'image vient dessous, le dégradé horizontal est
désactivé et le bouton « Jouer maintenant » devient pleine largeur.

#### A4. Cibles tactiles trop petites

**Fichiers.** `HeroBanner.module.css`, `FavoriteButton.module.css`,
`CategoryNav.module.css`, `CategorySection.module.css`, `MobileMenu.module.css`,
`Footer.module.css`, `GameView.module.css`, `CategoryPage.module.css`,
`FavoritesPage.module.css`, `NotFound.module.css`, `StaticPage.module.css`,
`LanguageSwitcher.module.css`.

**Le problème mesuré.** Puces du carrousel 8 × 8 px, bouton pause 18 × 11,
bouton favori 34 × 34, croix du menu 36 × 36, liens de footer 16 px de haut,
puces de catégorie 31 px, boutons de pagination environ 30 px.

**La correction.** Les puces gardent leur apparence de 8 px mais leur zone
cliquable passe à 28 px (40 sur mobile) grâce à un `::before` : c'est le bouton
qui grandit, pas le rond. Tout le reste est porté à 40 ou 44 px. Les effets de
survol qui « collent » au doigt sont neutralisés sur mobile.

#### A5. Divers

- `.content-center` : `padding: 0` sous 768 px — les 10 px créaient un liseré
  autour du header et rognaient la grille.
- Page de jeu : header compact, bouton plein écran en icône seule (il
  chevauchait l'interface du jeu), grille des jeux similaires sur 2 colonnes.
- Footer sur 2 colonnes sous 768 px, 1 seule sous 380 px.
- Barre de catégories : défilement horizontal propre, sans barre visible.
- Menu mobile : fermeture avec la touche Échap.

**Tests.** Audit automatisé sur 4 tailles (360, 375, 390, 768 px) et 5 pages :
**aucun débordement horizontal**, recherche atteignable partout, plus aucun
élément plus large que la fenêtre. Seuls restent sous 40 px les liens de fil
d'Ariane, qui sont du texte en ligne — explicitement exclus du critère WCAG 2.5.8.

### B. Internationalisation du contenu

#### B1. Noms et descriptions de catégories traduits

**Fichiers.** `src/locales/{fr,en,es,de}.json`, `src/hooks/useLocalized.js`,
`CategoryNav.jsx`, `CategoryPage.jsx`, `MobileMenu.jsx`, `Footer.jsx`,
`GameView.jsx`.

Arcade / Puzzle / Plateau / Action deviennent Arcade / Puzzle / Board / Action en
anglais, Arcade / Puzle / Mesa / Acción en espagnol, Arcade / Puzzle /
Brettspiele / Action en allemand. Le changement s'applique partout : barre de
catégories, page de catégorie (titre `<h1>`, introduction, titre de l'onglet),
menu mobile, footer et fil d'Ariane des pages de jeu.

#### B2. Contenu des 18 jeux traduit en 4 langues

**Fichiers.** `src/locales/games.en.json`, `games.es.json`, `games.de.json`
(créés), `src/i18n.js`, `src/hooks/useLocalized.js` (créé).

Pour chaque jeu : titre, description courte, description longue (150 à 200 mots)
et contrôles, en anglais, espagnol et allemand. Les 19 tags sont traduits aussi.
Les titres qui changent d'une langue à l'autre suivent : Échecs / Chess /
Ajedrez / Schach, Dames / Checkers / Damas / Dame, Fruits / Frutas / Früchte.

**Architecture retenue.** Le français reste la **source canonique** dans
`src/data/games.data.js` — c'est aussi ce que lit le prérendu, donc le contenu
indexé reste français et cohérent. Les autres langues sont des surcouches dans
`src/locales/games.<lang>.json`. Toute clé manquante retombe automatiquement sur
le français : rien ne casse, aucune clé brute ne s'affiche jamais. Ajouter un
jeu se fait donc en français d'abord, et les traductions peuvent suivre plus tard.

**Pourquoi pas tout dans les fichiers de langue.** Dupliquer le français dans
`games.fr.json` aurait créé deux sources de vérité pour le même texte, avec la
dérive garantie au premier ajustement — et le prérendu, qui tourne sous Node,
ne lit pas les fichiers de langue.

#### B3. Nettoyage au passage

- Les anciennes clés `game_desc_1` … `game_desc_23`, indexées sur des
  identifiants numériques, sont remplacées par des clés lisibles indexées sur le
  slug (`games.snake.short`).
- `useDocumentTitle` (créé) remplace le même `useEffect` recopié dans 9 pages,
  et garantit que le titre de l'onglet suit la langue active.
- `ThemeToggle` : lecture de `localStorage` protégée, `aria-label` explicite et
  traduit, `type="button"`.
- Les 4 fichiers de langue ont désormais exactement les mêmes clés (contrôlé
  automatiquement).

**Tests.** 30 assertions dédiées : sur `/play/chess`, passage FR → EN → ES → DE
et vérification que le titre, la description longue, les contrôles, les tags, le
fil d'Ariane et le titre de l'onglet changent réellement — et que la description
anglaise diffère effectivement de la française. Plus : `<html lang>` mis à jour,
langue mémorisée dans `localStorage` et conservée après rechargement, titres
traduits sur les cartes de la grille, et **aucune clé de traduction brute
affichée** nulle part.

### C. Bug trouvé en route : 3 jeux cassés sans leur CDN

**Fichiers.** `public/games/{Chess,Pong,fruits}/vendor/*` (créés),
`public/games/Chess/chess.html`, `public/games/Pong/index.html`,
`public/games/fruits/index.html`, `scripts/apply-content-fixes.mjs`,
`scripts/check-games.mjs` (créé), `src/pages/legal/Privacy.jsx`.

**Le problème.** Trois jeux chargeaient leur bibliothèque depuis un CDN public.
Vérifié en bloquant les hôtes externes :

| Jeu | Erreur | CDN |
|---|---|---|
| Chess | `Chess is not defined` | cdnjs.cloudflare.com |
| Pong | `$ is not defined` | code.jquery.com |
| Fruits | `$ is not defined` | ajax.googleapis.com |

Un réseau d'entreprise, un bloqueur de publicité, un filtrage pays ou une simple
panne du CDN suffisait donc à empêcher ces trois jeux de démarrer — sans aucun
message pour le joueur.

**La correction.** Les bibliothèques réellement nécessaires sont désormais
servies depuis le site, dans `public/games/<jeu>/vendor/`, avec leur fichier de
licence à côté : jQuery 3.6.0 (MIT), Bootstrap 4.0.0 (MIT), chess.js 0.10.3
(BSD-2-Clause). Total : 464 Ko, une seule fois. jQuery UI a été retiré de Fruits
— aucune de ses API n'y était utilisée (0 appel à `draggable`, `sortable`,
`dialog`…).

**Ce qui reste externe, volontairement.** Les polices Google et la police
d'icônes Font Awesome, chargées par quelques jeux : purement cosmétiques, un
blocage ne casse aucune partie. Elles sont maintenant décrites honnêtement dans
la politique de confidentialité, qui affirmait à tort que Google Fonts était la
seule requête tierce.

**Nouveau garde-fou.** `node scripts/check-games.mjs` charge les 18 jeux, sépare
les vraies erreurs JavaScript des simples requêtes externes échouées, et liste
les hôtes tiers rencontrés. Résultat actuel : **18/18 sans erreur**.

---

**Décisions retenues avant de commencer**

| Question | Choix |
|---|---|
| Périmètre | Lots 1 à 4 |
| Jeux portant une marque déposée | Renommés (titres + slugs) |
| Langue par défaut | Français |
| Descriptions longues | Rédigées (brouillons à relire) |

**Vérifications globales, à chaque étape**

- `npm run build` : passe (Vite + prérendu de 28 pages)
- `npx eslint .` : **0 erreur** (3 avant)
- `npm audit` : **0 vulnérabilité** (11 avant, dont 9 « high »)
- 64 tests automatisés dans un vrai navigateur (Chromium) : **64 OK, 0 échec**
- Poids de `dist/` : **29 Mo → 4,1 Mo**

---

## Version 2.0.0 — 27 août 2026

---

# LOT 1 — Performance et correction de bugs

## 1.1 Optimisation des vignettes (28,8 Mo → 395 Ko)

**Ce qui a été fait.** Un script convertit les 21 images de `src/assets/` en WebP
redimensionné à 440 px de large, les écrit dans `public/thumbs/` sous un nom de
slug propre, et déplace les originaux dans `src/assets/_originals/`.

**Fichiers.** `scripts/optimize-images.mjs` (créé), `package.json` (script `images`),
`.gitignore`, `public/thumbs/*.webp` (21 créés), `src/assets/` (originaux déplacés).

**Pourquoi.** Les images faisaient 1536 × 1024 px et s'affichaient dans des cartes de
220 px de large au maximum. C'était de loin le premier poste de poids du site.
`public/thumbs/` plutôt que `src/assets/` parce que Vite ajoute un hash au nom des
fichiers importés depuis `src/` à chaque build : les balises Open Graph ont besoin
d'URL stables pour que Facebook, Discord ou WhatsApp puissent mettre en cache l'aperçu.

**Résultat.** 28,8 Mo → 395 Ko, soit **−98,7 %**. `ninja-vs-evilcorp` passe de
2 336 Ko à 28 Ko. Ajout de `width`, `height`, `loading="lazy"` et `decoding="async"`
sur les images de cartes.

**Tests.** Vérifié en navigateur : toutes les vignettes se chargent depuis `/thumbs/`,
aucune image PNG d'origine n'est plus référencée.

> À relancer si tu ajoutes des images : `npm run images`.

## 1.2 Correction des vulnérabilités

**Ce qui a été fait.** `npm audit fix`, puis remontée explicite de la plage de version
de `react-router-dom` dans `package.json` (`^7.13.0` → `^7.18.2`).

**Fichiers.** `package.json`, `package-lock.json`.

**Pourquoi.** 11 vulnérabilités dont 9 « high » sur `react-router` : open redirect via
URL protocol-relative, XSS via `Location`, contournement CSRF en mode RSC, déni de
service via correspondance de routes inefficace. La plage a été remontée pour que la
correction survive à une régénération du `package-lock.json`.

**Résultat.** `npm audit` : 0 vulnérabilité.

## 1.3 Nouveau modèle de données

**Ce qui a été fait.** Création de `src/data/games.data.js` : données pures, sans
aucun `import` d'image, donc lisible à la fois par React et par Node. 18 jeux,
4 catégories, avec slug, tags, description courte, description longue, contrôles,
licence, crédit et risque de marque.

**Fichiers.** `src/data/games.data.js` (créé), `src/data/games.js` (remplacé).

**Pourquoi.** L'ancien `games.js` contenait 18 `import` d'images et une structure
`categories[0].games` codée en dur, recopiée dans quatre composants. Ajouter une
catégorie cassait la page d'accueil. Et comme le fichier importait des images, il
était illisible depuis Node — donc impossible d'en dériver un sitemap ou un prérendu.

**Résultat.** Une seule source de vérité, qui alimente les pages, la recherche, les
catégories, le sitemap, le prérendu et le JSON-LD. `src/data/games.js` expose
`getGameBySlug`, `getGameById`, `getCategory`, `getGamesByCategory`,
`getRelatedGames`, `getGamesBySlugs` et `searchGames`.

## 1.4 Passage aux slugs dans les URL

**Ce qui a été fait.** `/play/12` devient `/play/flappy-wings`. Route de compatibilité
`/game/:id` qui redirige vers le bon slug, et `GameView` accepte encore un identifiant
numérique en repli.

**Fichiers.** `src/App.jsx`, `src/pages/gameView/GameView.jsx`,
`src/components/gameCard/GameCard.jsx`, `src/components/heroBanner/HeroBanner.jsx`.

**Pourquoi.** Une URL numérique ne dit rien à Google ni à un visiteur, et empêche
tout référencement sur le nom du jeu.

**Tests.** `/play/snake`, `/play/block-stacker`, `/play/dot-muncher`,
`/play/flappy-wings`, `/play/sweet-match` affichent le bon jeu ;
`/game/12` redirige bien vers `/play/flappy-wings` ; `/play/12` fonctionne encore.

## 1.5 Recherche étendue

**Ce qui a été fait.** La recherche porte désormais sur le titre, l'ancien titre, la
description courte et les tags, via `searchGames()`.

**Fichiers.** `src/pages/home/Home.jsx`, `src/data/games.js`.

**Pourquoi.** Elle ne cherchait que dans le titre. Chercher « réflexes » ou « 2 joueurs »
ne renvoyait rien. L'ancien titre est inclus pour que « tetris » trouve encore
« Block Stacker ».

## 1.6 Carrousel d'accueil : 4 problèmes corrigés

**Ce qui a été fait.** Réécriture complète de `HeroBanner`.

**Fichiers.** `src/components/heroBanner/HeroBanner.jsx`,
`src/components/heroBanner/HeroBanner.module.css`.

**Pourquoi et quoi.**

1. Le `<h1>` de la page changeait toutes les 3 secondes — le titre sémantique de
   l'accueil devenait un nom de jeu tiré au hasard. Le `<h1>` est maintenant fixe
   (« Jeux gratuits en ligne, sans téléchargement ») et le nom du jeu passe en `<h2>`.
2. `Math.random()` rendait le contenu différent à chaque chargement, donc non
   indexable. La liste vient du champ `featured`, elle est stable.
3. Aucun moyen d'arrêter l'animation : non-conformité WCAG 2.2.2. Un bouton pause a
   été ajouté, et la rotation passe de 3 s à 6,5 s (3 s ne laisse pas le temps de lire).
4. `window.open()` ouvrait un onglet : remplacé par un vrai `<Link>`, crawlable.
5. Erreur ESLint `set-state-in-effect` supprimée au passage.

**Résultat + tests.** Un seul `<h1>` par page, stable après 1,5 s d'attente ; le bouton
pause change bien d'état ; les puces `<div>` devenues `<button>` ont leur style natif
neutralisé et un `role="tab"`.

## 1.7 Cartes de jeu : suppression de la double image

**Ce qui a été fait.** Suppression de la deuxième `<img>` (effet « HD/IA ») qui
chargeait exactement la même URL, et des classes CSS associées.

**Fichiers.** `src/components/gameCard/GameCard.jsx`,
`src/components/gameCard/GameCard.module.css`.

**Pourquoi.** Chaque carte téléchargeait sa vignette deux fois, et `loading="lazy"`
n'était posé que sur la copie décorative — donc l'image réellement visible n'était pas
différée. L'attribut `alt` était vide sur l'image visible et rempli sur la copie.

**Résultat.** Une seule requête par vignette, `loading="lazy"` + `decoding="async"`
+ `width`/`height` (plus de décalage de mise en page), `alt` correct.

## 1.8 Bug de la page blanche (recherche depuis la page 2)

**Ce qui a été fait.** Le numéro de page est borné **pendant le rendu** :
`const page = Math.min(currentPage, totalPages)`.

**Fichiers.** `src/components/categorySection/CategorySection.jsx`.

**Pourquoi.** En page 2, taper une recherche réduisait la liste à moins de 16 jeux :
`startIndex` restait à 16 et `slice(16, 32)` renvoyait un tableau vide. Écran blanc,
sans message. Borner au rendu évite en plus un `useEffect` et un re-rendu en cascade.

**Résultat + tests.** Scénario rejoué en navigateur : page 2 → recherche « snake » →
le résultat s'affiche. `PropTypes` ajoutés (le `eslint-disable react/prop-types` en
tête de fichier a été retiré).

## 1.9 Page de jeu : erreur propre et LCP réparé

**Ce qui a été fait.** `loading="lazy"` sur l'iframe, et une vraie page d'erreur
(titre, explication, lien de retour) au lieu du `<div>Jeu non trouvé</div>`.

**Fichiers.** `src/pages/gameView/GameView.jsx`, `src/pages/gameView/GameView.module.css`.

**Pourquoi.** L'iframe se chargeait immédiatement, en concurrence avec le rendu de la
page : c'était la cause du mauvais LCP. Et le message d'erreur brut, sans en-tête ni
navigation, laissait le visiteur dans un cul-de-sac.

## 1.10 Route 404

**Ce qui a été fait.** Création de `NotFound`, branchée sur `path="*"`.

**Fichiers.** `src/pages/notFound/NotFound.jsx` (+ `.module.css`), `src/App.jsx`.

**Pourquoi.** `/nimporte-quoi` affichait une page entièrement vide : aucune indication,
aucun lien, et un signal de mauvaise qualité pour Google.

**Résultat + tests.** `/nimporte-quoi` et `/category/inexistante` affichent la page 404
avec 4 suggestions de jeux et un retour à l'accueil.

## 1.11 Nettoyage du boilerplate Vite

**Ce qui a été fait.** `src/index.css` réduit aux resets globaux ; `.card` et
`.read-the-docs` supprimés de `src/App.css`.

**Fichiers.** `src/index.css`, `src/App.css`.

**Pourquoi.** `index.css` contenait encore les styles par défaut du template Vite, en
conflit direct avec `theme.css` : deux règles `body`, deux `h1`, un fond `#242424`
qui écrasait le thème, un bloc `prefers-color-scheme` redondant avec `data-theme`, et
un sélecteur `title {}` qui ne veut rien dire (`<title>` n'est pas affichable).

**Résultat.** Ajout au passage d'un `outline` visible au clavier
(`:focus-visible`) et du respect de `prefers-reduced-motion`.

## 1.12 Polices : suppression de la chaîne bloquante

**Ce qui a été fait.** L'`@import` Google Fonts de `theme.css` est remplacé par
`preconnect` + `preload` + `stylesheet` dans `index.html`.

**Fichiers.** `src/styles/theme.css`, `index.html`.

**Pourquoi.** Avec un `@import` dans le CSS, le navigateur doit d'abord télécharger la
feuille de style pour découvrir qu'il doit télécharger les polices : deux allers-retours
en série avant le premier texte affiché.

## 1.13 `index.html`

**Ce qui a été fait.** `lang="fr"`, `theme-color`, titre et description réécrits.

**Fichiers.** `index.html`.

**Pourquoi.** La description annonçait « thousands of free web games » pour 18 jeux.
Une promesse fausse est un motif de refus chez plusieurs régies, et une source de
rebond immédiat.

## 1.14 ESLint utilisable

**Ce qui a été fait.** `public/games` et `src/assets/_originals` ajoutés aux
`globalIgnores`, `ecmaVersion` passée de 2020 à 2022, et bloc dédié aux scripts Node.

**Fichiers.** `eslint.config.js`.

**Pourquoi.** ESLint analysait les 18 jeux dans `public/` et produisait environ
570 erreurs qui ne viennent pas du projet — le lint était inutilisable, donc jamais
lancé. La version ECMAScript 2020 bloquait par ailleurs des syntaxes récentes.

**Résultat.** `npx eslint .` : 0 erreur.

## 1.15 Retrait du code AdSense factice dans les jeux

**Ce qui a été fait.** Suppression des scripts `adsbygoogle.js` et des blocs `<ins>`
dans 4 jeux, via un script rejouable.

**Fichiers.** `scripts/apply-content-fixes.mjs` (créé),
`public/games/Minesweeper/index.html`, `public/games/Pong/index.html`,
`public/games/2048/index.html`, `public/games/floppybird/index.html`.

**Pourquoi.** L'identifiant était un placeholder (`ca-pub-XXXXXXXXXXXXXXXX`) : aucune
recette, des erreurs console à chaque partie, et surtout une logique publicitaire
**à l'intérieur des iframes** — invisible depuis React, hors du périmètre du
consentement, et contraire aux règles de placement d'AdSense.

**Résultat.** Plus aucune occurrence de `adsbygoogle` dans `public/`. La publicité
passe désormais par le composant `AdSlot` (lot 4).

## 1.16 Fichiers parasites supprimés

**Ce qui a été fait.** Suppression de `hex_dump.txt`, `RESPONSIVE_DESIGN_AUDIT.md`,
`public/games/tetris-game/css/Software-v2.5-alpha.1.zip`, `public/robots.txt` et
`public/sitemap.xml`. `.gitignore` complété.

**Fichiers.** `scripts/apply-content-fixes.mjs`, `.gitignore`.

**Pourquoi.** Aucun n'est utilisé. L'ancien `robots.txt` et l'ancien `sitemap.xml`
pointaient vers `www.gamewave.com`, un domaine non possédé, et déclaraient `/action`
et `/aventure` qui n'existent pas : un sitemap hors domaine est purement ignoré par
Google. Ils sont désormais générés au build.

## 1.17 Menu mobile réparé

**Ce qui a été fait.** Les 8 liens morts (`href="#action"` sans cible) sont remplacés
par de vrais liens vers l'accueil, les 4 catégories, les favoris et « À propos ». Le
compteur affiche le nombre réel de jeux.

**Fichiers.** `src/components/mobileMenu/MobileMenu.jsx`,
`src/components/mobileMenu/MobileMenu.module.css`.

**Pourquoi.** Aucun des 8 liens ne menait quelque part, et le pied du menu annonçait
« +1000 Jeux » pour 18 jeux. Le nombre est maintenant calculé depuis les données, donc
juste par construction.

**Tests.** Le menu annonce « 18 jeux », plus aucun lien en `href="#"`, les 4 liens de
catégorie fonctionnent.

---

# LOT 2 — Indexabilité (SEO technique)

## 2.1 Prérendu des pages

**Ce qui a été fait.** `scripts/prerender.mjs` génère un fichier HTML par route dans
`dist/`, avec son `<title>`, sa description, son `canonical`, ses balises Open Graph
et Twitter, son JSON-LD, et un contenu statique dans `#root`.

**Fichiers.** `scripts/prerender.mjs` (créé), `package.json`
(`build` = `vite build && node scripts/prerender.mjs`).

**Pourquoi.** TikTok, Discord, WhatsApp, Facebook et une partie des robots
d'indexation n'exécutent pas le JavaScript. Sans prérendu, les 28 URL du site
renvoyaient toutes le même `<title>` et aucune image de partage : tout lien partagé
apparaissait nu.

**Résultat.** 28 pages prérendues : accueil, 4 catégories, 18 jeux, 5 pages statiques.
Chaque page de jeu porte un JSON-LD `VideoGame` et un `BreadcrumbList` ; chaque page de
catégorie un `CollectionPage` + `ItemList` ; l'accueil un `WebSite` avec `SearchAction`.

**Tests.** `dist/play/<slug>/index.html` existe pour les 18 jeux ; contrôle du contenu
de `dist/play/snake/index.html` (title, description, canonical, og:image, 2 blocs
JSON-LD) ; lecture du HTML sans JavaScript (`curl`) : le titre, la description longue,
les contrôles, les crédits et les jeux similaires sont bien présents dans la source.

> Vercel exécute `npm run build` : le prérendu se lance à chaque déploiement.
> Le domaine se règle avec la variable d'environnement `SITE_URL` (voir `.env.example`),
> sinon il vient de `src/data/site.js`.

## 2.2 `sitemap.xml` et `robots.txt` générés

**Ce qui a été fait.** Les deux fichiers sont écrits par `prerender.mjs`, avec les
bonnes URL, une date de dernière modification et une priorité par type de page.

**Pourquoi.** Ils étaient écrits à la main, sur le mauvais domaine, et se désynchronisaient
à chaque ajout de jeu.

**Résultat.** 28 URL listées, `Disallow: /favorites` (page personnelle, rien à indexer),
et le lien vers le sitemap.

## 2.3 `vercel.json`

**Ce qui a été fait.** `cleanUrls`, `trailingSlash: false`, réécriture SPA qui exclut
`games/`, `thumbs/` et `assets/`, en-têtes de cache et 4 en-têtes de sécurité.

**Fichiers.** `vercel.json`.

**Pourquoi.** Vercel consulte le système de fichiers **avant** d'appliquer les
`rewrites` : les pages prérendues sont donc servies telles quelles, et la réécriture ne
sert plus que de filet de sécurité. Les assets hashés par Vite sont cachés un an
(`immutable`) ; les vignettes, dont le nom est stable, un jour avec
`stale-while-revalidate`. `X-Frame-Options: SAMEORIGIN` autorise tes propres iframes de
jeux tout en empêchant un tiers d'embarquer le site.

## 2.4 Image de partage par défaut

**Ce qui a été fait.** Génération de `public/og-default.png` (1200 × 630) par un script,
aux couleurs du thème.

**Fichiers.** `scripts/make-og-image.mjs` (créé), `public/og-default.png` (créé),
`package.json` (script `og-image`).

**Pourquoi.** C'est l'image affichée pour l'accueil et les pages sans vignette propre.
Générée par script pour être reproductible si le slogan change.

## 2.5 `<html lang>` dynamique et défaut en français

**Ce qui a été fait.** L'attribut `lang` suit la langue active ; la langue par défaut
passe à `fr` ; la lecture de `localStorage` est protégée.

**Fichiers.** `src/i18n.js`.

**Pourquoi.** L'attribut restait figé même quand l'interface passait en français
(problème d'accessibilité et signal SEO faux). La lecture de `localStorage` au niveau
module casserait un futur rendu serveur.

**Tests.** `document.documentElement.lang === 'fr'` vérifié en navigateur.

## 2.6 Pages de catégorie

**Ce qui a été fait.** Création de `/category/:slug` (fil d'Ariane, `<h1>`,
introduction, grille de jeux, lien vers les autres catégories) et d'une barre de
navigation par catégorie sur l'accueil.

**Fichiers.** `src/pages/category/CategoryPage.jsx` (+ `.module.css`),
`src/components/categoryNav/CategoryNav.jsx` (+ `.module.css`), `src/App.jsx`.

**Pourquoi.** Ces 4 pages ciblent des requêtes que l'accueil ne peut pas viser
(« jeux de puzzle gratuits en ligne »), donnent une structure de maillage interne, et
rendent le menu mobile réellement utile. La barre de navigation sur l'accueil est ce
qui permet à ces pages d'être découvertes — sans lien entrant, une page prérendue ne
sert à rien.

**Tests.** `/category/puzzle` liste bien les 7 jeux de la catégorie ;
`/category/inexistante` tombe sur la 404.

---

# LOT 3 — Produit et conformité

## 3.1 Pied de page et pages légales

**Ce qui a été fait.** Création du footer (présent sur toutes les pages) et de 4 pages :
À propos, Politique de confidentialité, Conditions d'utilisation, Contact.

**Fichiers.** `src/components/layout/Footer.jsx` (+ `.module.css`),
`src/pages/legal/About.jsx`, `Privacy.jsx`, `Terms.jsx`, `Contact.jsx`,
`src/pages/legal/StaticPage.module.css`, `src/data/site.js` (créé), `src/App.jsx`.

**Pourquoi.** L'absence de politique de confidentialité est un motif de refus
automatique chez toutes les régies, et une non-conformité RGPD dès le premier stockage
navigateur.

**Comment le texte a été écrit.** La politique décrit **uniquement ce que le site fait
réellement aujourd'hui** : aucun compte, aucun analytics, aucune publicité, trois
valeurs dans `localStorage` (`theme`, `language`, `gamewave:favorites`), Vercel comme
hébergeur, Google Fonts comme seule requête tierce. Les sections « mesure d'audience »
et « publicité » s'affichent automatiquement dès que les drapeaux correspondants
passent à `true` dans `src/data/site.js` — à faire **en même temps** que l'activation
de l'outil, pas après. Un texte qui décrit des traitements inexistants est aussi
problématique qu'une absence de texte.

> ⚠️ **`src/data/site.js` contient trois champs à compléter avant mise en ligne** :
> `publisher`, `contactEmail` et `country`. Ils sont affichés tels quels sur les pages
> légales. Une page de contact avec une adresse inexistante ne remplit pas son rôle.

**Tests.** Les 5 pages (`/about`, `/privacy`, `/terms`, `/contact`, `/tools`) se
rendent correctement, sans débordement horizontal, et sont prérendues.

## 3.2 Favoris (localStorage, sans backend)

**Ce qui a été fait.** Un hook `useFavorites`, un bouton étoile sur chaque carte et sur
chaque page de jeu, une page `/favorites`.

**Fichiers.** `src/hooks/useFavorites.js` (créé),
`src/components/favoriteButton/FavoriteButton.jsx` (+ `.module.css`),
`src/pages/favorites/FavoritesPage.jsx` (+ `.module.css`),
`src/components/gameCard/GameCard.jsx`, `src/pages/gameView/GameView.jsx`, `src/App.jsx`.

**Pourquoi.** C'est de la rétention réelle pour un coût quasi nul, sans backend, sans
compte, sans donnée personnelle.

**Écart avec le document.** Le hook proposé utilisait un `useState` par composant :
deux boutons étoile montés séparément auraient divergé, et le compteur ne se serait
pas mis à jour. Il a été remplacé par un petit store partagé au niveau du module,
lu avec `useSyncExternalStore`. Bénéfices : tous les boutons restent synchronisés,
les changements venus d'un autre onglet sont pris en compte (événement `storage`), et
un `getServerSnapshot` évite tout décalage à l'hydratation du prérendu.

**Tests.** État vide affiché sur `/favorites` ; clic sur une étoile → l'étoile devient
active, `localStorage` contient bien 1 entrée, et le jeu apparaît sur `/favorites`.

## 3.3 Page de jeu enrichie

**Ce qui a été fait.** Sous l'iframe : fil d'Ariane, `<h1>`, tags, description longue,
« Comment jouer », « Crédits et licence », emplacement publicitaire, « Jeux similaires ».

**Fichiers.** `src/pages/gameView/GameView.jsx`, `src/pages/gameView/GameView.module.css`.

**Pourquoi.** C'est la page qui doit référencer et monétiser, et elle ne contenait
qu'une iframe. Les crédits ne sont pas décoratifs : c'est la contrepartie normale de
l'hébergement d'un jeu indépendant.

**Effet de bord assumé.** La page était bloquée en `height: 100dvh; overflow: hidden`
— aucun contenu sous l'iframe n'aurait été atteignable. Elle défile désormais, mais le
jeu occupe toujours la hauteur visible (`height: clamp(320px, calc(100dvh - 190px), 760px)`)
et le mode plein écran retrouve exactement l'ancien comportement sans défilement.

## 3.4 Descriptions longues des 18 jeux

**Ce qui a été fait.** Rédaction d'un texte de 150 à 200 mots par jeu, en français,
basé sur le gameplay réel : la règle, ce qui fait la difficulté, et ce qui distingue un
débutant d'un joueur qui progresse.

**Fichiers.** `src/data/games.data.js`.

**Pourquoi.** C'est ce contenu qui fait référencer les pages de jeu, et c'est ce que le
prérendu envoie aux robots. Un champ vide retombait sur une phrase de 60 caractères.

> Ce sont des **brouillons à relire**. Ils sont factuels et vérifiables, mais ta voix
> et ta connaissance du public valent mieux qu'un texte générique. Les descriptions des
> 4 jeux js13k (CHOCH, Edge Not Found, Fourfold, Ninja vs EVILCORP) ont été écrites
> après inspection des fichiers du jeu.

---

# LOT 4 — Monétisation (désactivée par défaut)

## 4.1 Composant `AdSlot`

**Ce qui a été fait.** Un composant unique, piloté par la variable d'environnement
`VITE_ADS_ENABLED`, placé sous le hero de l'accueil, en haut des pages de catégorie et
sous l'iframe des pages de jeu.

**Fichiers.** `src/components/ads/AdSlot.jsx` (+ `.module.css`),
`src/components/ads/adsConfig.js` (créés), `.env.example` (créé),
`src/pages/home/Home.jsx`, `src/pages/category/CategoryPage.jsx`,
`src/pages/gameView/GameView.jsx`, `src/App.jsx`.

**Pourquoi.** Une seule abstraction : changer de régie = modifier un fichier. Et rien
n'est rendu tant que `VITE_ADS_ENABLED` n'est pas explicitement à `true`, donc rien ne
peut fuiter en production par accident.

**Colonnes latérales.** Elles affichaient un cadre « PUB GAUCHE / PUB DROITE » vide et
disparaissaient de toute façon sous 1150 px, c'est-à-dire pour la majorité du trafic
mobile. Elles ne sont maintenant insérées dans le DOM que si la publicité est activée :
sans publicité, le contenu occupe toute la largeur. Sur mobile, la publicité passe par
`AdSlot` dans le flux de la page.

> ⚠️ En Europe, un CMP de consentement certifié TCF v2.2 doit être en place **avant**
> de passer `VITE_ADS_ENABLED` à `true`.

## 4.2 Affiliation

**Ce qui a été fait.** Composant `AffiliateDisclosure` (mention visible avant les
liens), `src/data/tools.js` et la page `/tools`.

**Fichiers.** `src/components/affiliate/AffiliateDisclosure.jsx` (+ `.module.css`),
`src/data/tools.js`, `src/pages/tools/ToolsPage.jsx` (créés), `src/App.jsx`.

**Pourquoi.** La mention d'affiliation est une obligation légale (France, UE, FTC aux
États-Unis) et doit être visible **avant** le lien, pas en pied de page. Chaque lien
affilié porte `rel="sponsored nofollow noopener"` : sans `rel="sponsored"`, Google peut
considérer que le site vend des liens et sanctionner le domaine entier.

**Choix assumé : `tools.js` est livré vide.** Le document demandait 8 à 12 produits
« avec un avis réellement argumenté ». Je ne peux pas écrire un avis sur du matériel
que personne n'a testé : un texte générique ne convertit pas et expose à un vrai
problème de crédibilité. Le format attendu est documenté en commentaire dans le
fichier, et la page affiche un état d'attente honnête (« sélection en préparation »)
tant que le tableau est vide. La mention d'affiliation ne s'affiche que s'il y a
réellement des liens affiliés.

---

# Bugs trouvés en cours de route (hors document)

Ces trois bugs existaient déjà et n'étaient pas listés dans le document. Ils ont été
vérifiés sur le dépôt d'origine avant correction.

## B1. `<main>` n'utilisait jamais la largeur disponible

**Fichiers.** `src/styles/theme.css`.

**Le problème.** `.content-center` est un conteneur flex en colonne avec
`align-items: center`. `<main>` n'avait pas de largeur explicite : il était donc
dimensionné sur son contenu (*shrink-to-fit*), et la grille de jeux en
`repeat(auto-fill, minmax(..., 1fr))` s'effondrait. Mesuré sur le dépôt d'origine, en
1440 px de large : `main` = 1020 px mais la grille ne faisait que **422 px**. Le retrait
des colonnes latérales rendait le problème encore plus visible (grille à 280 px).

**La correction.** `align-items: stretch` sur `.content-center`. Les blocs qui doivent
rester centrés le font par leur propre `max-width` + `margin: 0 auto`.

**Résultat.** Grille sur 5 colonnes en 1440 px, `main` à 1420 px. Aucun débordement
horizontal vérifié en 390 px, 768 px et 1440 px.

## B2. Les animations des modules CSS ne se déclenchaient jamais

**Fichiers.** `src/components/mobileMenu/MobileMenu.module.css`,
`src/components/gameCard/GameCard.module.css`, `src/styles/theme.css`.

**Le problème.** Les `@keyframes slideIn`, `fadeInUp` et `shimmer` étaient déclarés dans
`theme.css` (feuille globale), alors que les `animation:` qui les utilisent sont écrits
dans des **modules CSS**. Vite renomme la référence en `_slideIn_xxxx`, qui ne
correspondait à aucun `@keyframes` : l'animation ne partait jamais.

**Conséquence visible.** `.menu-item` part à `opacity: 0` et attend l'animation pour
devenir visible : **toutes les entrées du menu mobile étaient invisibles.** Le menu
s'ouvrait sur une colonne vide. (Vérifié aussi sur le dépôt d'origine : `opacity` restait
à `0` sur les 8 entrées.) L'apparition des cartes et l'animation du squelette de
chargement ne jouaient pas non plus, sans conséquence visuelle grave.

**La correction.** Les `@keyframes` sont déclarés dans chaque module qui les utilise,
plus un repli `prefers-reduced-motion` qui force `opacity: 1` sur les entrées du menu.

## B3. Le squelette de chargement des cartes n'existait pas

**Fichiers.** `src/components/gameCard/GameCard.module.css`.

**Le problème.** Le JSX appliquait la classe `loading-shimmer`, la CSS déclarait
`.image-wrapper.loading`. Les deux ne se rencontraient jamais.

**La correction.** La règle CSS est renommée en `.image-wrapper.loading-shimmer`.

## B4. Deux boutons de fermeture superposés dans le menu mobile

Le bouton hamburger se transforme en croix quand le menu s'ouvre, et se superposait à
la croix du menu. Le hamburger est désormais masqué quand le menu est ouvert.

---

# Tests effectués

## Automatisés

`node scripts/smoke-test.mjs` — 64 assertions dans Chromium sur le build de
production, **toutes vertes** :

| Bloc | Ce qui est vérifié |
|---|---|
| Accueil | un seul `<h1>`, `<h1>` fixe et stable, 16 cartes, nav catégories, footer, liens légaux, bouton pause, vignettes WebP, aucune image d'origine, console propre |
| Recherche | page 2 → recherche → résultats affichés (bug de la page blanche) |
| Page de jeu | iframe présente et `loading="lazy"`, bon chemin de jeu, `<h1>` = titre du jeu, description longue > 600 caractères, sections « Comment jouer » et « Jeux similaires », fil d'Ariane |
| Renommages | les 4 nouveaux slugs affichent le bon titre |
| 404 | page affichée, suggestions présentes |
| Catégorie | `<h1>`, jeux listés, autres catégories, catégorie inconnue → 404 |
| Favoris | état vide, ajout, `localStorage`, affichage sur `/favorites` |
| Pages légales | les 5 pages se rendent |
| Anciennes URL | `/game/12` redirige, `/play/12` fonctionne encore |
| Mobile 390 px | aucun débordement horizontal, menu ouvrable, « 18 jeux », liens de catégorie, plus aucun `href="#"` |
| Jeu réel | l'iframe charge le jeu, aucune requête en erreur |
| Thème / langue | `lang="fr"`, bascule clair/sombre fonctionnelle |

## Manuels et vérifications de build

- `npm run build` : 108 modules, 28 pages prérendues, aucune erreur
- `npx eslint .` : 0 erreur
- `npm audit` : 0 vulnérabilité
- `node scripts/apply-content-fixes.mjs` relancé deux fois : idempotent
- Lecture du HTML prérendu sans JavaScript (`curl`) : contenu bien présent
- Captures d'écran en 1440 px et 390 px, thème clair et thème sombre
- `dist/` : 4,1 Mo (29 Mo avant)

---

# Ce qui reste à faire

## 🔴 Bloquant avant monétisation

1. **Les visuels des 4 jeux renommés portent encore les marques.** Les titres et les
   slugs sont changés, mais les vignettes montrent littéralement « CANDY CRUSH SAGA »,
   « TETRIS », « PACMAN NEON » et « FLAPPY BIRD », et les jeux eux-mêmes gardent leurs
   graphismes d'origine. Renommer sans remplacer les visuels règle la moitié du
   problème seulement. Ces 4 jeux restent le premier risque du site.
2. **Compléter `src/data/site.js`** : `publisher`, `contactEmail`, `country`. Les pages
   légales affichent aujourd'hui « À COMPLÉTER ».
3. **Licences des 14 autres jeux.** Le champ `license` vaut « à vérifier » pour la
   plupart. Pour les 4 entrées js13k, un e-mail à l'auteur suffit souvent. À noter :
   `public/games/ninja-vs-evil-corp/index.html` contient encore un lien de don vers
   `tipbot.com/remvst` — tu monétiserais une page qui pointe vers la cagnotte de son
   auteur. À retirer ou à assumer explicitement, après accord.
4. **`public/ads.txt`** : non créé volontairement. Le contenu vient de la régie après
   acceptation ; un fichier avec un mauvais identifiant est pire que pas de fichier.
5. **CMP de consentement** avant toute activation de `VITE_ADS_ENABLED`.

## 🟠 Important

6. **Relire les 18 descriptions longues.** Ce sont des brouillons.
7. **Définir `SITE_URL`** dans les variables d'environnement Vercel si tu utilises un
   autre domaine que `game-wave-3aa9.vercel.app`. Sans ça, les URL canoniques et le
   sitemap pointeront vers l'ancien domaine.
8. **Soumettre `sitemap.xml`** dans Google Search Console, puis vérifier les aperçus de
   partage sur `developers.facebook.com/tools/debug`.
9. **Multilingue.** 4 langues traduites mais une seule URL : trois quarts de ce travail
   restent invisibles pour Google. Soit tu concentres tout sur le français, soit tu
   passes à de vrais préfixes `/fr/` et `/en/` avec `hreflang`. À trancher, pas à
   bricoler.
10. **Analytics.** Rien n'est installé : tout le reste se pilote donc à l'aveugle.
    Plausible ou Umami (sans cookie, donc sans bandeau) sont les plus simples ici.
    Penser à passer `dataProcessing.analytics` à `true` dans `src/data/site.js` le jour
    où c'est fait.

## 🟡 Confort

11. Le JavaScript pèse 364 Ko (116 Ko compressés) en un seul bundle. Découper par route
    (`React.lazy`) ferait gagner sur le premier chargement — non fait ici parce que ce
    n'était pas demandé et que le gain reste secondaire face aux 28 Mo d'images déjà
    économisés.
12. Trois vignettes sont générées sans jeu correspondant (`load-runner`,
    `geometry-dash`, `outrun`) : des images existent dans `src/assets/` mais aucun jeu
    n'est présent dans `public/games/`. Soit les jeux arrivent, soit les images peuvent
    partir.
13. `src/assets/_originals/` contient les 21 images d'origine (29 Mo), ignorées par git.
    À conserver en local, c'est la source si tu veux régénérer les vignettes.

---

# Commandes utiles

```bash
npm install              # installer les dépendances
npm run dev              # serveur de développement
npm run build            # build + prérendu + sitemap + robots (c'est ce que Vercel lance)
npm run build:only       # build Vite seul, sans prérendu
npm run images           # régénérer les vignettes WebP depuis src/assets/
npm run og-image         # régénérer public/og-default.png
npm run fix-content      # réappliquer les retouches sur les jeux (idempotent)
npm run lint             # ESLint
npm run test:e2e         # tests navigateur (nécessite : npm i -D playwright)
npm run test:games       # charge les 18 jeux et liste leurs dépendances externes
```

## Rappel sur les traductions

Le français est la source de vérité : il vit dans `src/data/games.data.js`
(catalogue) et `src/locales/fr.json` (interface).
Pour ajouter un jeu : le décrire en français dans `games.data.js`, puis ajouter
sa traduction dans `src/locales/games.en.json`, `games.es.json` et
`games.de.json`. Une traduction manquante n'est pas un bug : le texte français
s'affiche à la place.
