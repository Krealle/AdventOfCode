export type Advent = {
  id: number;
  Solve: (input: string) => { partOne: string; partTwo: string };
  Title: string;
};

const advents: Record<string, Advent> = import.meta.glob("./Day*.ts", {
  eager: true,
});

export const AdventModules: Advent[] = Object.entries(advents)
  .map(([path, module]) => {
    const match = path.match(/Day(\d+)\.ts$/);
    return {
      id: Number(match![1]),
      Solve: module.Solve,
      Title: module.Title,
    };
  })
  .sort((a, b) => a.id - b.id);
