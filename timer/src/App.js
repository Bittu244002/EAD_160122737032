import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;

  // Toggle timer and set interval
  useEffect(() => {
    const interval = isRunning
      ? setInterval(() => setSeconds((prev) => prev + 1), 1000)
      : null;
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="App">
      <h1>React Timer</h1>
      <div className="timer">
        <p className="time-display">{formatTime(seconds)}</p>
        <div className="buttons">
          <button onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            onClick={() => {
              setSeconds(0);
              setIsRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
