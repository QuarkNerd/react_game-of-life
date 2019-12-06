import React, { useState, useEffect, useRef } from "react";
import Square from "./Square";
const INTERVAL = 100;
const NUMCOLUMNS = 10;
const NUMROWS = 10;

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [livings, setLivings] = useState(
    Array(NUMROWS).fill(Array(NUMCOLUMNS).fill(false))
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
    for (let x = 0; x < NUMCOLUMNS; x++) {
      for (let y = 0; y < NUMROWS; y++) {
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
    const xLeft = (x + NUMCOLUMNS - 1) % NUMCOLUMNS;
    const xRight = (x + 1) % NUMCOLUMNS;
    const yUp = (y + NUMROWS - 1) % NUMROWS;
    const yDown = (y + 1) % NUMROWS;
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
