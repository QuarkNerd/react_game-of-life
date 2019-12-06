import React, { useState, useEffect, useRef } from "react";
import Square from "./Square";
const INTERVAL = 100;

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [size, setSize] = useState({ numRows: 5, numColumns: 10 });
  const [livings, setLivings] = useState(
    Array(size.numRows).fill(Array(size.numColumns).fill(false))
  );

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  useInterval(() => tick(), isRunning ? INTERVAL : null);

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

  const changeSize = e => {
    const number = parseInt(e.target.value, 10);
    const newSize = isNaN(number) ? 1 : number;
    setSize({ ...size, [e.target.name]: newSize });
  };

  useEffect(() => {
    setLivings(Array(size.numRows).fill(Array(size.numColumns).fill(false)));
  }, [size]);

  return (
    <div>
      <div>
        {livings.map((row, yValue) => (
          <div class="row">
            {row.map((isLiving, xValue) => (
              <Square
                x={xValue}
                y={yValue}
                selected={isLiving}
                onClick={changeSquare}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={start}> Start </button>
      <button onClick={tick}> Tick </button>
      <button onClick={stop}> Stop </button>
      <input name="numRows" onChange={changeSize}></input>
      <input name="numColumns" onChange={changeSize}></input>
    </div>
  );
};

export default App;
// React doesnt work well with setInterval, see this link for more detais
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
