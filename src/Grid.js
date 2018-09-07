import React, { Component } from 'react'

const Square = props => {
  const size = 30
  const a = {
    width: size,
    height: size,
    background: props.selected ? 'purple' : 'yellow'
  }

  return (
    <div style={a} onClick={() => props.onClick(props.number)}>
      {props.number}
    </div>
  )
}

class Grid extends Component {
  state = {
    1: true
  }

  changeSquare = position => {
    this.setState(prevState => ({ [position]: !prevState[position] }))
  }

  tick = () => {
    const newState = {}

    for (let ii = 0; ii < this.props.numColumns * this.props.numRows; ii++) {
      let isLiving = this.state[ii]
      const coordinates = this.convertNumberToCoordinates(ii)
      const neighboursCoors = this.getNeighbours(coordinates)
      const neighbours = neighboursCoors.map(coors =>
        this.convertCoordinatesToNumber(coors)
      )
      const living = this.countLiving(neighbours)

      if (living <= 1 || living > 3) {
        isLiving = false
      } else if (living === 3) {
        isLiving = true
      }

      newState[ii] = isLiving
    }
    this.setState(newState)
  }

  convertNumberToCoordinates = number => {
    const x = number % this.props.numColumns
    const y = Math.floor(number / this.props.numColumns)
    return [x, y]
  }

  getNeighbours = ([x, y]) => {
    const xLeft = (x + this.props.numColumns - 1) % this.props.numColumns
    const xRight = (x + 1) % this.props.numColumns
    const yUp = (y + this.props.numRows - 1) % this.props.numRows
    const yDown = (y + 1) % this.props.numRows
    return [
      [xLeft, yUp],
      [x, yUp],
      [xRight, yUp],
      [xLeft, y],
      [xRight, y],
      [xLeft, yDown],
      [x, yDown],
      [xRight, yDown]
    ]
  }

  convertCoordinatesToNumber = ([x, y]) => {
    return y * this.props.numColumns + x
  }

  countLiving = numbers => {
    return numbers.reduce(
      (total, number) => total + (this.state[number] ? 1 : 0),
      0
    )
  }

  render () {
    const numSquares = this.props.numColumns * this.props.numRows
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${this.props.numColumns}, 30px)`,
          gridAutoRows: 30,
          gridGap: 1
        }}
      >
        {Array.apply(null, { length: numSquares }).map((a, index) => (
          <Square
            number={index}
            selected={this.state[index]}
            onClick={this.changeSquare}
          />
        ))}
      </div>
    )
  }
}

export default Grid
