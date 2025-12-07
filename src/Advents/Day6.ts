import type { AdventResult } from ".";

export const Title = "Trash Compactor";

type ColumnInfo = {
  operation: "*" | "+";
  rows: number;
  numbers: number[];
  cephalopodNumbers: string[];
};

export function Solve(input: string): AdventResult {
  const lines = input.split("\n").filter((x) => x);

  const operations: ColumnInfo[] = [];
  for (const char of lines.pop()!) {
    if (char === "*" || char === "+") {
      operations.push({
        operation: char,
        rows: 1,
        numbers: [],
        cephalopodNumbers: [],
      });
      if (operations.length > 1) {
        operations[operations.length - 2].rows--;
      }
    } else {
      operations[operations.length - 1].rows++;
    }
  }

  lines.forEach((line) => {
    let currentOperation = 0;
    let curSteps = 0;
    let curNumber = "";

    for (let i = 0; i <= line.length; i++) {
      if (curSteps === operations[currentOperation].rows) {
        operations[currentOperation].numbers.push(parseInt(curNumber));
        curNumber = "";

        curSteps = 0;
        currentOperation++;

        continue;
      }

      const char = line[i];

      curNumber += char;

      if (!operations[currentOperation].cephalopodNumbers[curSteps]) {
        operations[currentOperation].cephalopodNumbers[curSteps] = "";
      }
      operations[currentOperation].cephalopodNumbers[curSteps] += char;

      curSteps++;
    }
  });

  const partTwoResults = operations.map((operation) => {
    if (operation.operation === "*") {
      return operation.cephalopodNumbers.reduce(
        (acc, x) => acc * parseInt(x),
        1
      );
    }
    return operation.cephalopodNumbers.reduce((acc, x) => acc + parseInt(x), 0);
  });

  const partOneResults = operations.map((operation) => {
    if (operation.operation === "*") {
      return operation.numbers.reduce((acc, x) => acc * x);
    }
    return operation.numbers.reduce((acc, x) => acc + x);
  });

  const summedPartOne = partOneResults.reduce((acc, x) => acc + x);
  const summedPartTwo = partTwoResults.reduce((acc, x) => acc + x);

  return {
    partOne: summedPartOne,
    partTwo: summedPartTwo,
  };
}
