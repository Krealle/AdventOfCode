export const Title = "Secret Entrance";

const STARTING_STEP = 50;
const TOTAL_STEPS = 100;
const MAX_STEP = 99;
const MIN_STEP = 0;

export function Solve(input: string) {
  const lines = input.split(/[\s\n]+/);

  const instructions = lines.map((line) => {
    const [, direction, number] = line.split(/(L|R)/);
    return { direction, amount: parseInt(number) };
  });

  let currentStep = STARTING_STEP;
  let oldStep = STARTING_STEP;

  let timesLandedAtMinStep = 0;
  let timesPassedMinStep = 0;

  for (const instruction of instructions) {
    const normalizedStep = instruction.amount % TOTAL_STEPS;

    const fullRotations = Math.floor(instruction.amount / TOTAL_STEPS);
    timesPassedMinStep += fullRotations;

    if (instruction.direction === "L") {
      currentStep -= normalizedStep;
      if (currentStep < MIN_STEP) {
        currentStep += TOTAL_STEPS;

        if (oldStep !== MIN_STEP && currentStep !== MIN_STEP) {
          timesPassedMinStep += 1;
        }
      }
    } else {
      currentStep += normalizedStep;
      if (currentStep > MAX_STEP) {
        currentStep -= TOTAL_STEPS;

        if (oldStep !== MIN_STEP && currentStep !== MIN_STEP) {
          timesPassedMinStep += 1;
        }
      }
    }

    if (currentStep === MIN_STEP) {
      timesLandedAtMinStep += 1;
    }
    oldStep = currentStep;
  }

  return {
    partOne: timesLandedAtMinStep.toString(),
    partTwo: (timesLandedAtMinStep + timesPassedMinStep).toString(),
  };
}
