import React, { useState, useEffect } from "react";
import { useInterval, formatInput } from './utilities.js'
import Square from "./Square";

const App = () => {
  const [interval, setInterval] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [size, setSize] = useState({ numRows: 5, numColumns: 10 });
  const [livings, setLivings] = useState(
    Array(size.numRows).fill(Array(size.numColumns).fill(false))
  );

  const changeSize = e => {
    const newSize = formatInput(e.target.value);
    setSize({ ...size, [e.target.name]: newSize });
  };

  const changeInterval = e => {
    const newInterval = formatInput(e.target.value);
    setInterval(newInterval);
  };

  useEffect(() => {
    setLivings(Array(size.numRows).fill(Array(size.numColumns).fill(false)));
  }, [size]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  useInterval(() => tick(), isRunning ? interval : null);

  const tick = () => {
    const newLivings = livings.map(row => [...row]);
    for (let x = 0; x < size.numColumns; x++) {
      for (let y = 0; y < size.numRows; y++) {
        let isLiving = livings[y][x];
        const neighboursCoors = getNeighbours([x, y]);
        const living = countLiving(neighboursCoors);
        if (living <= 1 || living > 3) {
          isLiving = false;
        } else if (living === 3) {
          isLiving = true;
        }
        newLivings[y][x] = isLiving;
      }
    }

    setLivings(newLivings);
  };

  const changeSquare = ([x, y]) => {
    const newLivings = livings.map(row => [...row]);
    newLivings[y][x] = !newLivings[y][x];
    setLivings(newLivings);
  };

  const getNeighbours = ([x, y]) => {
    const xLeft = (x + size.numColumns - 1) % size.numColumns;
    const xRight = (x + 1) % size.numColumns;
    const yUp = (y + size.numRows - 1) % size.numRows;
    const yDown = (y + 1) % size.numRows;
    return [
      [xLeft, yUp],
      [x, yUp],
      [xRight, yUp],
      [xLeft, y],
      [xRight, y],
      [xLeft, yDown],
      [x, yDown],
      [xRight, yDown]
    ];
  };

  const countLiving = coordinates => {
    return coordinates.reduce(
      (total, [x, y]) => total + (livings[y][x] ? 1 : 0),
      0
    );
  };

  const buttons = [
    { name: "START", text: "Start", function: start },
    { name: "TICK", text: "Single tick", function: tick },
    { name: "STOP", text: "Stop", function: stop }
  ];

  const inputs = [
    {
      name: "numColumns",
      text: "Number of Columns",
      function: changeSize,
      value: size.numColumns,
      maxValue:100
    },
    {
      name: "numRows",
      text: "Number of Rows",
      function: changeSize,
      value: size.numRows,
      maxValue: 100
    },
    {
      name: "interval",
      text: "Gap between ticks (ms)",
      function: changeInterval,
      value: interval,
      maxValue: 1000
    }
  ];

  return (
    <div>
      <div className="inputHolder">
        {inputs.map(input => (
          <label className="field" key={input.name}>
            {input.text}: {input.value}
            <input
              name={input.name}
              onChange={input.function}
              value={input.value}
              type="range"
              min="1"
              max={input.maxValue}
            />
          </label>
        ))}
      </div>
      {buttons.map(button => (
        <button className="button" key={button.name} onClick={button.function}>
          {button.text}
        </button>
      ))}
      <div className="board">
        {livings.map((row, yValue) => (
          <div className="row" key={yValue}>
            {row.map((isLiving, xValue) => (
              <Square
                x={xValue}
                y={yValue}
                selected={isLiving}
                onClick={changeSquare}
                key={xValue + yValue * size.numRows}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
