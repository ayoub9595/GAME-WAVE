# 🎮 GAME-WAVE

> A modern browser-based gaming platform with a curated collection of 15 classic and original HTML5 games — built with React and Vite.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?style=flat-square&logo=vite) ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- 🕹️ **15 embedded HTML5 games** playable directly in the browser via iframes
- 🎠 **Hero carousel** — auto-rotating spotlight of featured games every 3 seconds
- 🃏 **Game cards** with shimmer skeleton loading and HD image upscaling effect
- 🌙 **Dark / Light theme toggle** with persistent preference
- 📱 **Fully responsive** — optimized layout for desktop, tablet, and mobile
- 🍔 **Mobile-friendly navigation** with a slide-in menu
- ⛶ **Full-screen mode** — expand any game to fill the entire page
- 📄 **Pagination** — browse up to 16 games per page with smooth scroll-to-top
- 🆕 **"New" badges** to highlight recently added games

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

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite (Rolldown) |
| Routing | React Router DOM v7 |
| Styling | Vanilla CSS with CSS variables |
| Linting | ESLint 9 |

---

## 📁 Project Structure

```
GAME-WAVE/
├── public/
│   └── games/              # Self-contained HTML5 game files
│       ├── Hangman/
│       ├── Snake/
│       ├── TicTacToe/
│       └── ...             # One folder per game
├── src/
│   ├── assets/             # Game thumbnail images
│   ├── components/
│   │   ├── Header.jsx      # Top navigation bar
│   │   ├── Logo.jsx        # Animated brand logo
│   │   ├── HeroBanner.jsx  # Auto-scrolling hero carousel
│   │   ├── GameCard.jsx    # Game thumbnail card with shimmer loader
│   │   ├── CategorySection.jsx  # Paginated game grid
│   │   ├── GameView.jsx    # Full-page iframe game player
│   │   ├── MobileMenu.jsx  # Mobile slide-in navigation
│   │   └── ThemeToggle.jsx # Dark/light mode switch
│   ├── data/
│   │   └── games.js        # Master game catalogue
│   ├── pages/
│   │   └── Home.jsx        # Main homepage
│   ├── App.jsx             # Root layout with routing
│   └── main.jsx            # App entry point
├── index.html
├── vite.config.js
└── package.json
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

## ➕ Adding a New Game

1. **Add the game files** to `public/games/<GameName>/`
2. **Add a thumbnail** image to `src/assets/`
3. **Register the game** in `src/data/games.js`:

```js
{
  id: 18,
  title: "My New Game",
  image: myGameImg,
  gamePath: "/games/MyNewGame/index.html",
  isNew: true
}
```

That's it — the game card, hero carousel eligibility, and routing are all handled automatically.

---

## 📱 Responsive Design

The platform has been fully audited for mobile compatibility:

- **87.5%** of games have proper viewport meta tags and touch support
- Responsive breakpoints cover mobile portrait/landscape, tablet, and desktop
- Touch controls (including Nipple.js joystick for Mario) are integrated
- Zoom prevention is applied where needed for canvas-based games

---

## 📜 License

This project is licensed under the **MIT License** — free to use, fork, and modify.

---

<div align="center">
  Made with ❤️ by <strong>Ayoub</strong>
</div>
