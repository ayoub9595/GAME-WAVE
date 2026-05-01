# 🎮 GAME-WAVE

> A modern browser-based gaming platform with a curated collection of 17 classic and original HTML5 games — built with React and Vite.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?style=flat-square&logo=vite) ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router) ![i18n](https://img.shields.io/badge/i18n-EN%20%7C%20FR%20%7C%20ES%20%7C%20DE-orange?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- 🕹️ **17 embedded HTML5 games** playable directly in the browser via iframes
- 🎠 **Hero carousel** — auto-rotating spotlight of featured games every 3 seconds
- 🃏 **Game cards** with shimmer skeleton loading and HD image upscaling effect
- 🌙 **Dark / Light theme toggle** with persistent preference
- 📱 **Fully responsive** — optimized layout for desktop, tablet, and mobile
- 🍔 **Mobile-friendly navigation** with a slide-in menu
- ⛶ **Full-screen mode** — expand any game to fill the entire page
- 📄 **Pagination** — browse games with smooth scroll-to-top
- 🆕 **"New" badges** to highlight recently added games
- 🌍 **Multilingual (i18n)** — full UI support for 🇬🇧 English, 🇫🇷 French, 🇪🇸 Spanish, and 🇩🇪 German
- 📝 **Dynamic page titles** — browser tab title adapts to the current page and active language

---

## 🎲 Games Library

| # | Game | Status |
|---|------|--------|
| 1 | 🔨 Whack-a-mole | ✅ New |
| 2 | 🐍 Snake | ✅ |
| 3 | ⭕ TicTacToe | ✅ |
| 4 | 🧩 Tilt Maze | ✅ |
| 5 | 🏓 Pong | ✅ New |
| 6 | 💣 Minesweeper | ✅ |
| 7 | 🍬 Candy-Crash | ✅ New |
| 8 | 🔢 2048 | ✅ |
| 9 | 🐦 Flappy Bird | ✅ |
| 10 | 🍉 Fruits | ✅ |
| 11 | 👻 PacMan | ✅ New |
| 12 | ♟️ Chess | ✅ New |
| 13 | 🧱 Tetris | ✅ New |
| 14 | 🏁 Checkers | ✅ New |
| 15 | 🥷 Ninja vs EVILCORP | ✅ New |
| 16 | 🎆 CHOCH | ✅ New |
| 17 | 🔲 Edge Not Found | ✅ New |
| 18 | 🕹️ Fourfold | ✅ New |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite (Rolldown) |
| Routing | React Router DOM v7 |
| Internationalisation | i18next + react-i18next |
| Styling | Vanilla CSS with CSS variables |
| Linting | ESLint 9 |

---

## 🌍 Internationalisation (i18n)

The entire UI is available in **4 languages**, switchable at any time from the language selector in the header. The chosen language is persisted in `localStorage`.

| Language | Code | Logo Subtitle |
|----------|------|---------------|
| 🇬🇧 English | `en` | RIDE THE NEXT LEVEL |
| 🇫🇷 French | `fr` | PASSEZ AU NIVEAU SUPÉRIEUR |
| 🇪🇸 Spanish | `es` | SUBE AL SIGUIENTE NIVEL |
| 🇩🇪 German | `de` | ERREICHE DIE NÄCHSTE STUFE |

Translation files live in `src/locales/<lang>.json`. To add a new language:

1. Create `src/locales/<code>.json` with all the required keys (copy from `en.json`).
2. Import and register it in `src/i18n.js`.
3. Add an `<option>` for it in `src/components/LanguageSwitcher.jsx`.

### Dynamic Page Titles
- **Home page**: `GAME WAVE – <logo subtitle>` (updates when language changes)
- **Game view**: `Play <GameName> on Game Wave` (translated per language, updates on language switch)

---

## 📁 Project Structure

```
GAME-WAVE/
├── public/
│   └── games/              # Self-contained HTML5 game files
│       ├── 2048/
│       ├── Candycrash/
│       ├── Chess/
│       ├── CHOCH/
│       ├── checkers/
│       ├── Edge-Not-Found/
│       ├── floppybird/
│       ├── fruits/
│       ├── Minesweeper/
│       ├── ninja-vs-evil-corp/
│       ├── Pacman/
│       ├── Pong/
│       ├── Snake/
│       ├── tetris-game/
│       ├── TicTacToe/
│       ├── TiltMaze/
│       └── Whack-a-mole/
├── src/
│   ├── assets/             # Game thumbnail images (PNG/JPG)
│   ├── components/
│   │   ├── CategorySection.jsx  # Paginated game grid
│   │   ├── GameCard.jsx    # Game thumbnail card with shimmer loader
│   │   ├── GameView.jsx    # Full-page iframe game player
│   │   ├── Header.jsx      # Top navigation bar
│   │   ├── HeroBanner.jsx  # Auto-scrolling hero carousel
│   │   ├── LanguageSwitcher.jsx # Language dropdown (EN/FR/ES/DE)
│   │   ├── Logo.jsx        # Animated brand logo
│   │   ├── MobileMenu.jsx  # Mobile slide-in navigation
│   │   └── ThemeToggle.jsx # Dark/light mode switch
│   ├── data/
│   │   └── games.js        # Master game catalogue (17 games)
│   ├── locales/
│   │   ├── en.json         # English translations
│   │   ├── fr.json         # French translations
│   │   ├── es.json         # Spanish translations
│   │   └── de.json         # German translations
│   ├── pages/
│   │   └── Home.jsx        # Main homepage
│   ├── styles/
│   │   └── theme.css       # Global theme variables
│   ├── App.jsx             # Root layout with React Router
│   ├── App.css             # App-level styles
│   ├── i18n.js             # i18next configuration
│   ├── index.css           # Global styles
│   └── main.jsx            # React app entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
├── package.json            # Dependencies and scripts
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/BADIAMOHAMEDAYMANE/GAME-WAVE.git
cd GAME-WAVE

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

### Preview Production Build

```bash
npm run preview
```

---

## 📱 Responsive Design

The platform has been fully optimized for multi-device compatibility:

- **Mobile-first design** with viewport meta tags for all devices
- **Breakpoint optimization** covering:
  - Mobile (320px – 768px) with portrait and landscape support
  - Tablet (768px – 1024px)
  - Desktop (1024px and above)
- **Touch-friendly controls** integrated where applicable
- **Canvas game optimization** to prevent unwanted zoom on mobile
- **Fluid layouts** using CSS flexbox and grid
- **Performance-conscious** with lazy-loaded images and shimmer effects

---

## 🎮 Game Features

### Diversity of Gameplay
- **Strategy Games**: Chess, Checkers, TicTacToe
- **Puzzle Games**: 2048, Tetris, Minesweeper, Tilt Maze
- **Action Games**: Snake, Flappy Bird, Fruits, PacMan, Whack-a-mole
- **Classic Arcade**: Pong, Ninja vs EVILCORP
- **Audio-Visual Experiences**: CHOCH, Edge Not Found
- **Candy Crash**: Match-3 puzzle gameplay

### Game Integration
All games are **self-contained** in `public/games/<GameName>/` with their own:
- HTML landing page (`index.html`)
- JavaScript game logic
- CSS styling
- Asset files (images, sprites, audio)

---

## ➕ Adding a New Game

Adding a new game to GAME-WAVE is simple:

1. **Add game files** to `public/games/<GameName>/`
   - Ensure the game has an `index.html` entry point
   - Include all required assets and scripts
   - Test responsiveness on mobile devices

2. **Add a thumbnail image** to `src/assets/`
   - Use PNG or JPG format
   - Recommended dimensions: 300×200px or similar aspect ratio
   - Keep file size optimized for fast loading

3. **Import your image** at the top of `src/data/games.js`:
```js
import YourGameImg from "../assets/your-game.png";
```

4. **Register the game** in `src/data/games.js`:
```js
{
    id: 23,  // next available ID
    title: "Your Game Title",
    description: "A brief, engaging description of your game.",
    image: YourGameImg,
    gamePath: "/games/YourGameName/index.html",
    isNew: true
}
```

5. **Add translated descriptions** to each locale file in `src/locales/`:
```json
"game_desc_23": "Your translated description here."
```

That's it! The game card, hero carousel eligibility, and routing are all handled automatically.

---

## 🌐 Deployment

GAME-WAVE is optimized for deployment on modern hosting platforms:

### Vercel (Recommended)
The project includes `vercel.json` for seamless Vercel deployment:
```bash
npm run build
vercel deploy
```

### Other Platforms
- **Netlify**: Drag-and-drop the `dist/` folder
- **GitHub Pages**: Configure GitHub Actions for CI/CD
- **Traditional Web Servers**: Upload contents of `dist/` folder

---

## 👨‍💻 Development Workflow

### Code Quality
- **Linting**: Run `npm run lint` to check for code issues
- **ESLint Config**: Rules defined in `eslint.config.js`
- **React Hooks Plugin**: Enforces proper React hooks usage

### Building
- **Development**: `npm run dev` starts Vite dev server on `http://localhost:5173`
- **Production**: `npm run build` creates optimized output in `dist/`
- **Preview**: `npm run preview` tests the production build locally

### Hot Module Replacement (HMR)
Vite provides instant feedback during development — changes are reflected immediately without page reload.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| **React 19** | UI framework |
| **React DOM 19** | React rendering layer |
| **React Router DOM 7** | Client-side routing |
| **i18next** | Internationalisation core |
| **react-i18next** | React bindings for i18next |
| **Prop-Types** | Runtime type checking |
| **Vite (Rolldown)** | Lightning-fast build tool |
| **ESLint 9** | Code linting |

---

## 🔧 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Check code with ESLint |
| `npm run preview` | Preview production build |

---

## 📄 License

This project is licensed under the **MIT License** — free to use, fork, and modify.

See [LICENSE](LICENSE) for full details.

---

## 🤝 Contributing

Contributions are welcome! To add a new game or improve existing features:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-game`
3. Commit your changes: `git commit -m "Add my awesome game"`
4. Push to the branch: `git push origin feature/my-game`
5. Open a Pull Request

Please ensure:
- Games are fully functional in browsers
- Mobile responsiveness is tested
- Code follows the existing style conventions
- Thumbnails are optimized for web
- Translations are added for all 4 languages (EN, FR, ES, DE)

---

<div align="center">
  Made with ❤️ by <strong>Ayoub</strong>
  
  [GitHub](https://github.com/BADIAMOHAMEDAYMANE) • [Live Demo](https://game-wave.vercel.app)
</div>
