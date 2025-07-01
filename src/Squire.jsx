export default function Square({ value, onSquareClick }) {
    const className =
      'square ' + (value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : '');
  
    return (
      <button className={className} onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  