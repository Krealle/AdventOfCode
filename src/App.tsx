import { useState } from "react";
import "./App.css";
import { AdventModules } from "./Advents";

function App() {
  const [input, setInput] = useState("");
  const [solutionOne, setSolutionOne] = useState<string | number>("");
  const [solutionTwo, setSolutionTwo] = useState<string | number>("");

  const [selectedAdventId, setSelectedAdventId] = useState<number | null>(null);
  const selectedAdvent =
    selectedAdventId !== null ? AdventModules[selectedAdventId] : null;

  const solveAdvent = () => {
    if (!selectedAdvent) {
      return;
    }

    const result = selectedAdvent.Solve(input);

    setSolutionOne(result.partOne);
    setSolutionTwo(result.partTwo);
    setAdventComponent(result.component);
  };

  const selectAdvent = (index: number) => {
    setSelectedAdventId(index);

    setSolutionOne("");
    setSolutionTwo("");
    setAdventComponent(undefined);
  };

  return (
    <>
      <h1>Advent of Code</h1>

      <div className="advent-buttons">
        {AdventModules.map((advent, idx) => {
          return (
            <button
              className={selectedAdvent?.id === advent.id ? "selected" : ""}
              key={`advent-${advent.id}`}
              onClick={() => selectAdvent(idx)}
            >
              Day {advent.id}
            </button>
          );
        })}
      </div>

      {selectedAdvent && (
        <div className="advent-container">
          <h2>{`Day ${selectedAdvent.id}: ${selectedAdvent.Title}`}</h2>

          <div className="input-solve-container">
            <div className="input-container">
              <span className="input-container-label">Input</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              className="solve-button"
              onClick={solveAdvent}
              disabled={!input}
            >
              Solve!
            </button>
          </div>

          <div className="solutions">
            {solutionOne ? (
              <span>
                Part 1: <b>{solutionOne}</b>
              </span>
            ) : null}
            {solutionTwo ? (
              <span>
                Part 2: <b>{solutionTwo}</b>
              </span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
