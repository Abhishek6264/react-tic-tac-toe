import Square from './Squire';
import calculateWinner from './calculateWinner';

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div className="status">{status}</div>
      {[0, 3, 6].map(row => (
        <div className="board-row" key={row}>
          {Array(3)
            .fill(null)
            .map((_, col) => (
              <Square
                key={row + col}
                value={squares[row + col]}
                onSquareClick={() => handleClick(row + col)}
              />
            ))}
        </div>
      ))}
    </>
  );
}
