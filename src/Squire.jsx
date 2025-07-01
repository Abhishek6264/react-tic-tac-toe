export default function Square({ value, onSquareClick, highlight }) {
  const className =
    'square ' +
    (value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : '') +
    (highlight ? ' square-highlight' : '');

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}
