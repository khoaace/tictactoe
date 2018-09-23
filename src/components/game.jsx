import React, { Component } from 'react';
import Board from './board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      locationSquare: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      currentLocation: [],
      isSort: false,
      locationWin: [],
      isDraw: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let currentLocation = [...this.state.currentLocation];
    if (this.state.stepNumber === 0) {
      currentLocation = [];
      currentLocation.push(i);
    } else {
      currentLocation = this.state.currentLocation.slice(
        0,
        this.state.stepNumber
      );
    }
    if (
      this.state.currentLocation.indexOf(i) === -1 &&
      this.state.stepNumber !== 0
    )
      currentLocation.push(i);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    if (calculateWinner(squares)) {
      const locationWin = calculateWinner(squares).slice(0, 3);
      this.setState({ locationWin: locationWin });
    }
    if (squares.indexOf(null) === -1) {
      this.setState({ isDraw: true });
    }
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      currentLocation: currentLocation,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      locationWin: [],
      isDraw: false,
    });
  }
  handleSort = () => {
    this.setState({ isSort: !this.state.isSort });
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const resultWin = calculateWinner(current.squares);
    let winner = null;
    if (resultWin !== null) {
      winner = resultWin[3];
    }
    const moves = history.map((step, move) => {
      const desc = move
        ? 'Go to move #' +
          move +
          ' (' +
          this.state.locationSquare[this.state.currentLocation[move - 1]] +
          ')'
        : 'Go to game start';
      return (
        <li key={move}>
          {move === history.length - 1 && move !== 0 ? (
            <button
              onClick={() => this.jumpTo(move)}
              style={{ backgroundColor: 'grey' }}
            >
              {desc}
            </button>
          ) : (
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          )}
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if (this.state.isDraw) status = 'Draw !!!';
      else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    if (this.state.isSort) moves.reverse();
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            locationWin={this.state.locationWin}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={this.handleSort}>Sort</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const result = [a, b, c, squares[a]];
      return result;
    }
  }
  return null;
}

export default Game;
