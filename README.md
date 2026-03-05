# 🎮 GAME-WAVE

> A modern browser-based gaming platform with a curated collection of 16 classic and original HTML5 games — built with React and Vite.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?style=flat-square&logo=vite) ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- 🕹️ **16 embedded HTML5 games** playable directly in the browser via iframes
- 🎠 **Hero carousel** — auto-rotating spotlight of featured games every 3 seconds
- 🃏 **Game cards** with shimmer skeleton loading and HD image upscaling effect
- 🌙 **Dark / Light theme toggle** with persistent preference
- 📱 **Fully responsive** — optimized layout for desktop, tablet, and mobile
- 🍔 **Mobile-friendly navigation** with a slide-in menu
- ⛶ **Full-screen mode** — expand any game to fill the entire page
- 📄 **Pagination** — browse games with smooth scroll-to-top
- 🆕 **"New" badges** to highlight recently added games
- 🎨 **Immersive gaming experiences** — from classic strategy games to audio-visual experiences

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
│       ├── 2048/           # Number puzzle game
│       ├── Candycrash/     # Candy matching puzzle
│       ├── CHOCH/          # Audio-visual generative experience
│       ├── checkers/       # Strategy board game
│       ├── Chess/          # Classic chess
│       ├── floppybird/     # Bird obstacle avoidance
│       ├── fruits/         # Fruit slicing game
│       ├── Minesweeper/    # Mine clearing puzzle
│       ├── ninja-vs-evil-corp/  # Action platformer
│       ├── Pacman/         # Dot eating arcade classic
│       ├── Pong/           # Paddle ball game
│       ├── Snake/          # Growth and avoidance game
│       ├── tetris-game/    # Block falling puzzle
│       ├── TicTacToe/      # Turn-based strategy
│       ├── TiltMaze/       # Maze navigation
│       └── Whack-a-mole/   # Reflex game
├── src/
│   ├── assets/             # Game thumbnail images (PNG/JPG)
│   ├── components/
│   │   ├── CategorySection.jsx  # Paginated game grid
│   │   ├── CategorySection.css  # Grid styling
│   │   ├── GameCard.jsx    # Game thumbnail card with shimmer loader
│   │   ├── GameCard.css    # Card styling
│   │   ├── GameView.jsx    # Full-page iframe game player
│   │   ├── GameView.css    # Player styling
│   │   ├── Header.jsx      # Top navigation bar
│   │   ├── Header.css      # Header styling
│   │   ├── HeroBanner.jsx  # Auto-scrolling hero carousel
│   │   ├── HeroBanner.css  # Carousel styling
│   │   ├── Logo.jsx        # Animated brand logo
│   │   ├── Logo.css        # Logo styling
│   │   ├── MobileMenu.jsx  # Mobile slide-in navigation
│   │   ├── MobileMenu.css  # Menu styling
│   │   ├── ThemeToggle.jsx # Dark/light mode switch
│   │   └── ThemeToggle.css # Toggle styling
│   ├── data/
│   │   └── games.js        # Master game catalogue (16 games)
│   ├── pages/
│   │   └── Home.jsx        # Main homepage
│   ├── styles/
│   │   └── theme.css       # Global theme variables
│   ├── App.jsx             # Root layout with React Router
│   ├── App.css             # App-level styles
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
  - Mobile (320px - 768px) with portrait and landscape support
  - Tablet (768px - 1024px)
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
- **Audio-Visual Experience**: CHOCH (generative graphics + sound)
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
   - Recommended dimensions: 300x200px or similar aspect ratio
   - Keep file size optimized for fast loading

3. **Register the game** in `src/data/games.js`:

```js
{
    id: 22,
    title: "Your Game Title",
    description: "A brief, engaging description of your game.",
    image: YourGameImg,
    gamePath: "/games/YourGameName/index.html",
    isNew: true
}
```

4. **Import your image** at the top of `games.js`:
```js
import YourGameImg from "../assets/your-game.png";
```

That's it! The game card, hero carousel eligibility, and routing are all handled automatically. The game will appear in the gallery with the "New" badge.

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

### Build Output
```bash
npm run build
# Creates optimized dist/ folder ready for production
```

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
Vite provides instant feedback during development—changes are reflected immediately without page reload.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| **React 19** | UI framework |
| **React DOM 19** | React rendering layer |
| **React Router DOM 7** | Client-side routing |
| **Prop-Types ** | Runtime type checking |
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

---

<div align="center">
  Made with ❤️ by <strong>Ayoub</strong>
  
  [GitHub](https://github.com/BADIAMOHAMEDAYMANE) • [Live Demo](https://game-wave.vercel.app)
</div>
