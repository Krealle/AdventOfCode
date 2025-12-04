import type { AdventResult } from ".";

export const Title = "Lobby";

const MAX_ADJACENT_ROLLS_OF_PAPER = 3;

const DEBUG = false;

export function Solve(input: string): AdventResult {
  const grid = input.split(/[\s\n]+/).map((x) => x.trim().split(""));

  const columnAmount = grid.length;
  const rowAmount = grid[0].length;

  const accessiblePaperRollsPositions = new Set<string>();

  let easilyAccessiblePaperRolls = 0;
  let loopCount = 0;

  while (true) {
    if (DEBUG) {
      console.log("Starting loop", loopCount + 1);
    }

    let foundAccessiblePaperRolls = false;

    const currentAccessiblePaperRollsPositions = new Set<string>();

    for (let columnIndex = 0; columnIndex < columnAmount; columnIndex++) {
      const column = grid[columnIndex];
      const lowerColumn =
        columnIndex < columnAmount - 1 ? grid[columnIndex + 1] : null;
      const upperColumn = columnIndex > 0 ? grid[columnIndex - 1] : null;

      for (let rowIndex = 0; rowIndex < rowAmount; rowIndex++) {
        const position = column[rowIndex];
        if (position === ".") continue;

        const key = getPositionKey(rowIndex, columnIndex);
        if (accessiblePaperRollsPositions.has(key)) continue;

        let adjacentRollsOfPaper = -1; // We are counting the roll itself as well for simplicity
        const start = rowIndex === 0 ? 0 : rowIndex - 1;
        const end = rowIndex === rowAmount - 1 ? rowIndex : rowIndex + 1;

        for (let i = start; i <= end; i++) {
          if (adjacentRollsOfPaper > MAX_ADJACENT_ROLLS_OF_PAPER) break;

          if (
            lowerColumn &&
            lowerColumn[i] === "@" &&
            !accessiblePaperRollsPositions.has(
              getPositionKey(i, columnIndex + 1)
            )
          ) {
            adjacentRollsOfPaper++;
          }

          if (
            upperColumn &&
            upperColumn[i] === "@" &&
            !accessiblePaperRollsPositions.has(
              getPositionKey(i, columnIndex - 1)
            )
          ) {
            adjacentRollsOfPaper++;
          }

          if (
            column[i] === "@" &&
            !accessiblePaperRollsPositions.has(getPositionKey(i, columnIndex))
          ) {
            adjacentRollsOfPaper++;
          }
        }

        if (adjacentRollsOfPaper <= MAX_ADJACENT_ROLLS_OF_PAPER) {
          currentAccessiblePaperRollsPositions.add(key);
          foundAccessiblePaperRolls = true;
        }
      }
    }

    for (const position of currentAccessiblePaperRollsPositions) {
      accessiblePaperRollsPositions.add(position);
    }

    if (!foundAccessiblePaperRolls) {
      if (DEBUG) {
        console.log("All accessible paper rolls found");
      }
      break;
    }

    if (DEBUG) {
      console.log(
        "Found accessible paper rolls",
        currentAccessiblePaperRollsPositions.size,
        "new total",
        accessiblePaperRollsPositions.size
      );
    }

    if (loopCount > 200) {
      console.log("fuck");
      break;
    }

    if (loopCount === 0) {
      easilyAccessiblePaperRolls = currentAccessiblePaperRollsPositions.size;
    }

    loopCount++;
  }

  const partTwoSum = accessiblePaperRollsPositions.size;

  return {
    partOne: easilyAccessiblePaperRolls,
    partTwo: partTwoSum,
  };
}

function getPositionKey(x: number, y: number): string {
  return `${x},${y}`;
}
