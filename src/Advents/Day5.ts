import type { AdventResult } from ".";

export const Title = "Cafeteria";

type Range = { start: number; end: number };

export function Solve(input: string): AdventResult {
  const [rawFreshIngredientIdRanges, availableIngredientIds] = input
    .split("  ")
    .map((x) => x.split(" "));

  const freshIngredientIdRanges: Range[] = rawFreshIngredientIdRanges.map(
    (x) => {
      const [start, end] = x.split("-").map((x) => parseInt(x));
      return {
        start,
        end,
      };
    }
  );

  const normalizedFreshIngredientIdRanges = freshIngredientIdRanges
    .reduce<Range[]>((acc, range) => {
      if (!acc.length) {
        acc.push(range);
        return acc;
      }

      const relevantIndexes: number[] = [];
      let highestNumber = 0;
      let lowestNumber = Number.MAX_SAFE_INTEGER;

      acc.forEach((previousRange, idx) => {
        if (
          isRangesOverlapping(range, previousRange) ||
          isRangesOverlapping(previousRange, range)
        ) {
          relevantIndexes.unshift(idx);

          lowestNumber = Math.min(lowestNumber, previousRange.start);
          highestNumber = Math.max(highestNumber, previousRange.end);
        }
      });

      if (relevantIndexes.length) {
        for (const idx of relevantIndexes) {
          acc.splice(idx, 1);
        }

        acc.push({
          start: Math.min(range.start, lowestNumber),
          end: Math.max(range.end, highestNumber),
        });
      } else {
        acc.push(range);
      }

      return acc;
    }, [])
    .sort((a, b) => a.start - b.start);

  const sortedAvailableIngredientIds = availableIngredientIds
    .map((x) => parseInt(x))
    .sort((a, b) => a - b);
  const lowerLimit = normalizedFreshIngredientIdRanges[0].start;
  const upperLimit =
    normalizedFreshIngredientIdRanges[
      normalizedFreshIngredientIdRanges.length - 1
    ].end;

  let amountOfFreshIngredients = 0;
  let start = 0;

  for (const ingredientId of sortedAvailableIngredientIds) {
    if (ingredientId < lowerLimit || ingredientId > upperLimit) {
      continue;
    }

    for (let i = start; i < normalizedFreshIngredientIdRanges.length; i++) {
      const range = normalizedFreshIngredientIdRanges[i];

      // Because the data is sorted we know that we can ignore all the lower ranges from this point on
      if (ingredientId > range.end) {
        start = i;
      }

      if (ingredientId >= range.start && ingredientId <= range.end) {
        amountOfFreshIngredients++;
        start = i;
        break;
      }

      // Because the data is sorted we know that if the id is between two ranges, it is not fresh
      const previousRange = normalizedFreshIngredientIdRanges[i - 1];
      if (
        previousRange &&
        ingredientId > previousRange.end &&
        ingredientId < range.start
      ) {
        break;
      }
    }
  }

  // I wonder if part 2 is just really easy or if my approach just happened to cater for this case...
  const amountOfFreshIngredientIds = normalizedFreshIngredientIdRanges.reduce(
    (acc, range) => acc + (range.end - range.start + 1),
    0
  );

  return {
    partOne: amountOfFreshIngredients,
    partTwo: amountOfFreshIngredientIds,
  };
}

function isRangesOverlapping(a: Range, b: Range): boolean {
  return a.start <= b.start && a.end >= b.start;
}
