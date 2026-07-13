const GRID_SIZE = 10;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIRECTIONS = [
  { dr: 0, dc: 1 }, // horizontal
  { dr: 1, dc: 0 }, // vertical
  { dr: 1, dc: 1 }, // diagonal down-right
];

export function generateGrid(words: string[]): string[][] {
  const grid: (string | null)[][] = Array.from({ length: GRID_SIZE }, () =>
    Array<string | null>(GRID_SIZE).fill(null)
  );

  for (const word of words) {
    placeWord(grid, word);
  }

  return grid.map((row) =>
    row.map((cell) => cell ?? ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
  );
}

function placeWord(grid: (string | null)[][], word: string) {
  const maxAttempts = 300;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    const maxRow = GRID_SIZE - (dir.dr ? word.length : 1);
    const maxCol = GRID_SIZE - (dir.dc ? word.length : 1);
    if (maxRow < 0 || maxCol < 0) continue;

    const startRow = Math.floor(Math.random() * (maxRow + 1));
    const startCol = Math.floor(Math.random() * (maxCol + 1));

    let fits = true;
    for (let i = 0; i < word.length; i++) {
      const r = startRow + dir.dr * i;
      const c = startCol + dir.dc * i;
      const existing = grid[r][c];
      if (existing !== null && existing !== word[i]) {
        fits = false;
        break;
      }
    }

    if (fits) {
      for (let i = 0; i < word.length; i++) {
        const r = startRow + dir.dr * i;
        const c = startCol + dir.dc * i;
        grid[r][c] = word[i];
      }
      return;
    }
  }
}
