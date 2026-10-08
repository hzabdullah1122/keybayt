// Window grid cell size, matching the .iso-windows pattern in globals.css.
const CELL_W = 17;
const CELL_H = 13;
const LIT_CHANCE = 0.1;

// Small deterministic pseudo-random so lit windows are the same on server and client.
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/**
 * A few glowing windows on one building face. `width`/`height` are the face size in px;
 * columns count from the left and rows from the bottom, like the repeating gradient grid.
 */
export default function LitWindows({ width, height, seed }) {
  const cols = Math.floor(width / CELL_W);
  const rows = Math.floor(height / CELL_H);
  const cells = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (rand(seed * 1000 + c * 31 + r * 7) < LIT_CHANCE) {
        cells.push(
          <span
            key={`${c}-${r}`}
            className="absolute bg-primary/40"
            style={{ left: c * CELL_W, bottom: r * CELL_H, width: CELL_W - 2, height: CELL_H - 2 }}
          />,
        );
      }
    }
  }

  return cells;
}
