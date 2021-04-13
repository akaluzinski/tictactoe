import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({onClick, value}) {
  return <button className="square" onClick={onClick}>
    {value}
  </button>;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true
    };
  }

  renderSquare(i) {
    return <Square
        onClick={() => this.handleClick(i)}
        value={this.state.squares[i]} />;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.getNextToken();
    const isXNext = !this.state.isXNext;
    this.setState({ squares, isXNext })
  }

  getNextToken() {
    return this.state.isXNext ? 'X' : 'O';
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = winner ? `${winner} WINS!` : `Next player: ${this.getNextToken()}`;

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


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

  return lines.map(([a, b, c]) => {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }).find(w => w);
}
