# Pocket Blocks Project Guide

## Overview

Pocket Blocks is a small, phone-friendly falling-shapes puzzle game designed for short play sessions. It is a static browser game served by a minimal Node.js HTTP server. There are no accounts, external APIs, tracking, or build step.

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm start
```

Open `http://localhost:3000` (or the value of the `PORT` environment variable).

Run the regression checks with:

```bash
npm test
```

## Repository structure

- `index.html` — complete game UI, styling, canvas renderer, game state, input handling, and persistence.
- `server.js` — dependency-free static HTTP server; defaults to port 3000.
- `package.json` — start and test scripts.
- `test/speed-controls.test.js` — lightweight Node regression checks for the player-facing options.
- `README.md` — quick-start instructions and feature summary.

## Game behavior

- The board is a 10 × 20 canvas grid.
- Seven falling shape families are selected randomly and rendered with colored blocks.
- Completed rows are removed and award points.
- The level increases every 10 cleared rows, reducing the base automatic-drop interval.
- The next shape is previewed above the board.
- The best score is stored in browser `localStorage` under `pocketBlocksBest`.
- A run can be paused, restarted, manually moved, rotated, soft-dropped, or hard-dropped.

## Input controls

- Keyboard: arrow keys move/soft-drop, Up rotates, Space hard-drops, `P` pauses, and `N` starts a new run.
- Touch: swipe left/right to move, swipe down to soft-drop, swipe up to hard-drop, and tap the board to rotate.
- On-screen buttons provide the same actions for mobile users.

## Runtime architecture

The game uses `requestAnimationFrame` for its loop. Each frame accumulates elapsed time in `dropTimer`; when the speed-adjusted interval is reached, the active piece moves down or locks into the grid. Rendering is performed on the board canvas, and no server-side game state is maintained.

The server returns `index.html` for `/` and serves static files from the repository root with a path traversal guard. Railway supplies the production `PORT` value at runtime.

## Theme behavior

The sun/moon button in the header switches the document between dark and light themes. Theme colors are CSS custom properties, and the canvas reads the active board colors before drawing so the game board follows the selected theme. The selected theme is saved under `pocketBlocksTheme` and restored on the next visit. Dark mode is the default.

## Speed behavior

The Fall speed control offers:

- `0.5×` — half the normal automatic-drop rate.
- `1×` — normal automatic-drop rate.
- `2×` — twice the normal automatic-drop rate.

The selected value is held in the client-side `speed` state. The current level's base interval is divided by that value, so manual movement and hard drop behavior are unchanged. Changing speed does not restart the current run.

## Deployment

The production Railway service is `pocket-blocks` in the `zeus-pocket-blocks` project:

- URL: <https://pocket-blocks-production.up.railway.app>
- Source repository: <https://github.com/litmusjp/zeus-pocket-blocks>

Deploying the repository directory with Railway CLI:

```bash
railway up --detach --yes
```

After a deployment, verify the service reaches `SUCCESS` and read the live URL back to confirm the expected UI is served.

## Change history

### 2026-09-04 — Player controls and themes

- Added selectable automatic fall speeds: 0.5×, 1×, and 2×.
- Added a persistent light/dark theme toggle in the header.
- Updated canvas and overlay colors to follow the active theme.
- Added regression checks covering speed options, speed scaling, and theme persistence.
- Updated the README and this project guide.

The speed-only change was committed as `843f127` (`feat: add selectable game speeds`). The theme update was subsequently applied through the Zeus Slack workflow, verified on Railway, and synchronized into the working tree for version control.
