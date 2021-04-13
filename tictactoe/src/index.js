import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({onClick, value}) {
  return <button className="square" onClick={onClick}>
    {value}
  </button>;
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
    />;
  }
  render() {
    return <div>
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
    </div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
          squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const stepNumber = history.length;
    const current = history[stepNumber - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.getNextToken();
    this.setState({
      history: history.concat([{squares}]),
      isXNext: !this.state.isXNext,
      stepNumber
    });
  }

  jumpTo(stepNumber) {
    this.setState({
        stepNumber,
        isXNext: (stepNumber % 2) === 0
    });
  }

  getNextToken() {
    return this.state.isXNext ? 'X' : 'O';
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move ? `Move #${move}` : 'Start';
      return <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{description}</button>
      </li>
    });

    const status = winner ? `${winner} WINS!` : `Next player: ${this.getNextToken()}`;

    return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}  />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
    return null;
  }).find(w => w);
}
