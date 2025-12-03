import type { AdventResult } from ".";

export const Title = "Lobby";

const DIGITS_IN_A_BATTERY = 12;

export function Solve(input: string): AdventResult {
  const banks = input.split(/[\s\n]+/).map((x) => x.trim());

  const partOneJoltages: number[] = [];
  const partTwoJoltages: number[] = [];

  for (const bank of banks) {
    let precedingJoltage = "";
    let proceedingJoltage = "";

    const bankLength = bank.length;

    for (let i = 0; i < bankLength; i++) {
      const joltage = bank[i];

      // Last joltage can only ever be the proceeding joltage
      if (i === bankLength - 1) {
        if (joltage > proceedingJoltage) {
          proceedingJoltage = joltage;
        }
        break;
      }

      if (joltage > precedingJoltage) {
        precedingJoltage = joltage;
        proceedingJoltage = "";
        continue;
      }

      if (joltage > proceedingJoltage) {
        proceedingJoltage = joltage;
      }
    }

    partOneJoltages.push(parseInt(precedingJoltage + proceedingJoltage));

    let result = "";
    let start = 0;

    for (let digitsLeft = DIGITS_IN_A_BATTERY; digitsLeft > 0; digitsLeft--) {
      const end = bankLength - digitsLeft;
      let bestDigit = "";
      let bestIndex = start;

      for (let i = start; i <= end; i++) {
        const digit = bank[i];

        if (digit > bestDigit) {
          bestDigit = digit;
          bestIndex = i;
        }
      }

      result += bestDigit;
      start = bestIndex + 1;
    }

    partTwoJoltages.push(parseInt(result));
  }

  const partOneSum = partOneJoltages.reduce((acc, x) => acc + x, 0);
  const partTwoSum = partTwoJoltages.reduce((acc, x) => acc + x, 0);

  return {
    partOne: partOneSum,
    partTwo: partTwoSum,
  };
}
