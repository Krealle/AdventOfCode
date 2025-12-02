import { useState } from "react";
import "./App.css";
import { AdventModules, type Advent } from "./Advents";

function App() {
  const [input, setInput] = useState("");
  const [solutionOne, setSolutionOne] = useState("");
  const [solutionTwo, setSolutionTwo] = useState("");

  const [selectedAdvent, setSelectedAdvent] = useState<Advent | null>(null);

  const solveAdvent = () => {
    if (!selectedAdvent) {
      return;
    }

    const result = selectedAdvent.Solve(input);

    setSolutionOne(result.partOne);
    setSolutionTwo(result.partTwo);
  };

  return (
    <>
      <h1>Advent of Code</h1>

      <div className="advent-buttons">
        {AdventModules.map((advent) => {
          return (
            <button
              className={selectedAdvent?.id === advent.id ? "selected" : ""}
              key={`advent-${advent.id}`}
              onClick={() => setSelectedAdvent(advent)}
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
              <span>Input</span>
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
            {solutionOne && (
              <span>
                Part 1: <b>{solutionOne}</b>
              </span>
            )}
            {solutionTwo && (
              <span>
                Part 2: <b>{solutionTwo}</b>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
