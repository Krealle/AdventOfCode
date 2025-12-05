import type { JSX } from "react";

export type Advent = {
  id: number;
  Solve: (input: string) => AdventResult;
  Title: string;
  component?: JSX.Element;
};

export type AdventResult = {
  partOne: string | number;
  partTwo: string | number;
  component?: JSX.Element;
};

const advents: Record<string, Advent> = import.meta.glob("./Day*.{ts,tsx}", {
  eager: true,
});

export const AdventModules: Advent[] = Object.entries(advents)
  .map(([path, module]) => {
    const match = path.match(/Day(\d+)\.tsx?$/);
    return {
      id: Number(match![1]),
      Solve: module.Solve,
      Title: module.Title,
      component: module.component,
    };
  })
  .sort((a, b) => a.id - b.id);
