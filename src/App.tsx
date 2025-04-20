import Board from './board';
import './App.css';
import { ReactElement, useState } from 'react';

function App() {
  const [board, setBoard] = useState(new Board(undefined));

  const tableRows: Array<ReactElement> = [];

  for (const [y, row] of board.array.entries()) {
    const tableRow: Array<ReactElement> = [];

    for (const [x, digit] of row.entries()) {
      tableRow.push(
        // TODO: DO NOT ALLOW THE PLAYER TO CHANGE THE DIGIT VALUE TO A NUMBER THAT'S NOT 0-9.
        <td id={`${y}${x}`}>
          <input type="number" value={digit} onChange={(event) => setBoard(board.writeCell(y, x, parseInt(event.target.value, 10)))}/>
        </td>
      );
    }

    tableRows.push(<tr>{tableRow}</tr>);
  }

  return (
    <>
      <table>{tableRows}</table>
    </>
  );
}

export default App;
