import React from "react";

const Square = props => {
  return (
    <div
      className={`square ${props.selected ? "square-selected" : ""}`}
      onClick={() => props.onClick([props.x, props.y])}
    />
  );
};
export default Square;
