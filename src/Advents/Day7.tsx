import type { JSX } from "react";
import type { AdventResult } from ".";

export const Title = "Laboratories";

const BEAM = "|";
const SPLIT_BEAM = "-";
const START = "S";
const EMPTY_SPACE = ".";
const SPLITTER = "^";

export function Solve(input: string): AdventResult {
  const diagram = input
    .split("\n")
    .map((x) => x.trim().split(""))
    .filter((x) => x.length);

  const beamPaths = new Set<number>();
  let amountOfBeamSplits = 0;

  // Should prolly be an object instead of an array, but the I like the array prototypes
  const numberDiagramMap: number[][] = [];

  const completedDiagram = diagram.map((row, rowIndex) => {
    numberDiagramMap.push([]);

    if (rowIndex === 0) {
      const startIndex = row.indexOf(START);
      beamPaths.add(startIndex);

      numberDiagramMap[rowIndex][startIndex] = 1;

      return row;
    }

    return row.map((cell, colIndex) => {
      if (cell === SPLITTER) {
        beamPaths.delete(colIndex);
        return cell;
      }

      const aboveNumber = numberDiagramMap[rowIndex - 1][colIndex];
      if (!isNaN(aboveNumber)) {
        numberDiagramMap[rowIndex][colIndex] = aboveNumber;
      }

      const nextCell = row[colIndex + 1];
      if (nextCell === SPLITTER) {
        beamPaths.add(colIndex);
        beamPaths.add(colIndex + 2);

        const splitterNumber = numberDiagramMap[rowIndex - 1][colIndex + 1];
        if (splitterNumber) {
          if (!numberDiagramMap[rowIndex][colIndex]) {
            numberDiagramMap[rowIndex][colIndex] = 0;
          }
          numberDiagramMap[rowIndex][colIndex] += splitterNumber;
        }
      }

      const previousCell = row[colIndex - 1];
      if (previousCell === SPLITTER) {
        const splitterNumber = numberDiagramMap[rowIndex - 1][colIndex - 1];
        if (splitterNumber) {
          if (!numberDiagramMap[rowIndex][colIndex]) {
            numberDiagramMap[rowIndex][colIndex] = 0;
          }
          numberDiagramMap[rowIndex][colIndex] += splitterNumber;
        }
      }

      if (beamPaths.has(colIndex)) {
        if (rowIndex < diagram.length - 1) {
          const lowerCell = diagram[rowIndex + 1][colIndex];
          if (lowerCell === SPLITTER) {
            amountOfBeamSplits++;
            return SPLIT_BEAM;
          }
        }

        return BEAM;
      }

      return cell;
    });
  });

  const amountOfRealities =
    numberDiagramMap.at(-1)?.reduce((acc, x) => acc + x, 0) ?? -1;

  return {
    partOne: amountOfBeamSplits,
    partTwo: amountOfRealities,
    component: drawDiagram(completedDiagram, numberDiagramMap),
  };
}

const SQUARE_SIZE = 10;

function drawDiagram(
  diagram: string[][],
  numberDiagramMap: number[][]
): JSX.Element {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${diagram[0].length}, ${SQUARE_SIZE}px)`,
        gap: "2px",
      }}
    >
      {diagram.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const number = numberDiagramMap[rowIndex][colIndex];
          return (
            <div
              key={`${rowIndex},${colIndex}`}
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                background:
                  cell === START
                    ? "red"
                    : cell === BEAM
                    ? "blue"
                    : cell === EMPTY_SPACE
                    ? "#444" // original @ color
                    : cell === SPLIT_BEAM
                    ? "#08c3f1ff"
                    : "#ddd", // dots
              }}
            >
              {number}
            </div>
          );
        })
      )}
    </div>
  );
}
