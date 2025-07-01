import Square from './Squire';
import calculateWinner from './calculateWinner';

export default function Board({ xIsNext, squares, onPlay, winningLine, isTie }) {
  const result = calculateWinner(squares);
  const winner = result.winner;

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const status = winner 
  ? `Winner: ${winner}` 
  : isTie 
    ? 'It’s a tie!' 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
      <>
        <div className="status">{status}</div>
        {[0, 3, 6].map(row => (
          <div className="board-row" key={row}>
            {Array(3)
              .fill(null)
              .map((_, col) => {
                const i = row + col;
                const isWinning = winningLine.includes(i);
                return (
                  <Square
                    key={i}
                    value={squares[i]}
                    onSquareClick={() => handleClick(i)}
                    highlight={isWinning}
                  />
                );
              })}
          </div>
        ))}
      </>
    );
}
