import { useState, useEffect } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const result = calculateWinner(currentSquares);
  const winner = result.winner;
  const winningLine = result.line;
  const isTie = !winner && currentSquares.every(Boolean);


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  // Auto-reset on win or Tie
  useEffect(() => {
    if (winner || isTie) {
      const timeout = setTimeout(() => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
      },5000);
      return () => clearTimeout(timeout);
    }
  }, [winner, isTie]);

  const moves = history.map((_, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay}
          winningLine={winningLine}
          isTie={isTie}
         />
       {winner && <div className="game-over">Winner: {winner}. Resetting...</div>}
       {isTie && <div className="game-over">It’s a tie. Resetting...</div>}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
