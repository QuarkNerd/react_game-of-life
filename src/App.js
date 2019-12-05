import React, { useState, useEffect, useRef } from "react";
import Square from "./Square";
const INTERVAL = 100;

const App = props => {
  const [isRunning, setIsRunning] = useState(false);
  const [livings, setLivings] = useState({});

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  useInterval(() => tick(), isRunning ? INTERVAL : null);

  const tick = () => {
    const newState = {};

    for (let ii = 0; ii < props.numColumns * props.numRows; ii++) {
      let isLiving = livings[ii];
      const coordinates = convertNumberToCoordinates(ii);
      const neighboursCoors = getNeighbours(coordinates);
      const neighbours = neighboursCoors.map(coors =>
        convertCoordinatesToNumber(coors)
      );
      const living = countLiving(neighbours);

      if (living <= 1 || living > 3) {
        isLiving = false;
      } else if (living === 3) {
        isLiving = true;
      }

      newState[ii] = isLiving;
    }
    setLivings(newState);
  };

  const changeSquare = position => {
    setLivings({ ...livings, [position]: !livings[position] });
  };

  const convertNumberToCoordinates = number => {
    const x = number % props.numColumns;
    const y = Math.floor(number / props.numColumns);
    return [x, y];
  };

  const getNeighbours = ([x, y]) => {
    const xLeft = (x + props.numColumns - 1) % props.numColumns;
    const xRight = (x + 1) % props.numColumns;
    const yUp = (y + props.numRows - 1) % props.numRows;
    const yDown = (y + 1) % props.numRows;
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

  const convertCoordinatesToNumber = ([x, y]) => {
    return y * props.numColumns + x;
  };

  const countLiving = numbers => {
    return numbers.reduce(
      (total, number) => total + (livings[number] ? 1 : 0),
      0
    );
  };

  return (
    <div>
      <div>
        {Array.apply(null, { length: props.numRows }).map((a, rowNum) => (
          <div class="row">
            {Array.apply(null, { length: props.numColumns }).map(
              (a, columnNum) => (
                <Square
                  number={rowNum * props.numColumns + columnNum}
                  selected={livings[rowNum * props.numColumns + columnNum]}
                  onClick={changeSquare}
                />
              )
            )}
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
