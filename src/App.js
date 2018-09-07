import React, { Component } from 'react'
import Grid from './Grid'

class App extends Component {
  grid = React.createRef()
  state = { interval: 1000 }

  componentDidMount () {}

  tick = () => {
    this.grid.current.tick()
  }

  start = () => {
    if (!this.timer) {
      this.timer = setInterval(this.tick, this.state.interval)
    }
  }

  stop = () => {
    clearInterval(this.timer)
    this.timer = null
  }

  intervalChange = e => {
    const interval = Number(e.target.value) * 1000
    if (!isNaN(interval) && interval >= 0) {
      this.setState({ interval })
    }
  }

  render () {
    return (
      <div>
        <Grid numRows={9} numColumns={9} ref={this.grid} />
        <button onClick={this.start}> Start </button>
        <button onClick={this.tick}> Tick </button>
        <button onClick={this.stop}> Stop </button>
      </div>
    )
  }
}

export default App

// const rootElement = document.getElementById("root");
/// // size is number of rows , numbr of columns
/// /ReactDOM.render(<Square/>, rootElement);
// ReactDOM.render(<Grid numRows={9} numColumns={9}/>, rootElement);
