# Changelog

All notable Pocket Blocks changes are recorded here so local Hermes sessions, Slack/Zeus sessions, and other contributors can reconstruct the project history from GitHub.

## 2026-09-04

### Added — selectable game speed

- Added `0.5×`, `1×`, and `2×` Fall speed buttons.
- `0.5×` halves the automatic falling rate, `1×` is normal, and `2×` doubles it.
- Speed changes apply to the current run without resetting the board.
- Added regression coverage for the three choices and interval scaling.
- Commit: `843f127` (`feat: add selectable game speeds`).

### Added — light/dark mode

- Added a sun/moon theme button beside `New run`.
- Dark mode remains the default; light mode updates the page, panels, board, grid, and overlay colors.
- Added accessible label and pressed-state updates.
- Saved the preference in `localStorage` as `pocketBlocksTheme`.
- Added regression coverage for the theme switch and persistence.
- This update was made through the Zeus Slack workflow after the speed deployment, then synchronized into this repository.

### Deployment

- Railway production service: `pocket-blocks`.
- Live URL: <https://pocket-blocks-production.up.railway.app>.
- The live deployment was read back and confirmed to contain both the speed controls and theme toggle.

## Earlier history

### 2026-09-04 — Initial game

- Added the Pocket Blocks browser game, Node static server, mobile controls, canvas board, scoring, levels, next-shape preview, pause/restart actions, and local best-score persistence.
- Commit: `36db6c1` (`feat: add Pocket Blocks mobile puzzle game`).
