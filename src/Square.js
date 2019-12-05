import React from "react";

const Square = props => {
  return (
    <div
      class={`square ${props.selected ? "square-selected" : ""}`}
      onClick={() => props.onClick(props.number)}
    />
  );
};
export default Square;
