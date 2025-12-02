import type { AdventResult } from ".";

export const Title = "Gift Shop";

export function Solve(input: string): AdventResult {
  const ranges = input.split(",").map((x) =>
    x
      .trim()
      .split("-")
      .map((z) => parseInt(z))
  );

  const partOneIds = new Set<number>();
  const partTwoIds = new Set<number>();

  for (const range of ranges) {
    const [start, end] = range;

    for (let i = start; i <= end; i++) {
      const stringId = i.toString();

      if (isRepeatingTwice(stringId)) partOneIds.add(i);
      if (isRepeatingSequence(stringId)) partTwoIds.add(i);
    }
  }

  const partOneSum = [...partOneIds].reduce((acc, x) => acc + x, 0);
  const partTwoSum = [...partTwoIds].reduce((acc, x) => acc + x, 0);

  return {
    partOne: partOneSum,
    partTwo: partTwoSum,
  };
}

function isRepeatingSequence(id: string): boolean {
  const length = id.length;
  const middle = length / 2 + 1;

  for (let windowLength = 1; windowLength < middle; windowLength++) {
    const sequence = id.slice(0, windowLength);

    let windowStart = windowLength;
    while (true) {
      const nextSequence = id.slice(windowStart, windowStart + windowLength);
      if (sequence !== nextSequence) break;

      windowStart += windowLength;
      if (windowStart >= length) return true;
    }
  }

  return false;
}

function isRepeatingTwice(id: string): boolean {
  const length = id.length;
  if (length % 2 === 0) {
    const half = length / 2;
    const left = id.slice(0, half);
    const right = id.slice(half);

    return left === right;
  }

  return false;
}
