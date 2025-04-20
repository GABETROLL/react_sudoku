import Board from './board';
import './App.css';
import { ReactElement, useState } from 'react';


function Cell({value, selected, select, setDigit, moveInDirection}:
    {value: number, selected: boolean, select: any, setDigit: any, moveInDirection: any}
  ) {
  return <input
    value={1 <= value && value <= 9 ? value : undefined}
    className={selected ? "selected" : ""}
    onClick={() => {console.log("SELECTING CELL"); select();}}
    onChange={(event) => {
      console.log("KEY DOWN");

      if (!selected || !event.target.value.length) return;

      const eventKey: string = event.target.value[event.target.value.length - 1];

      console.log("Key down. Checking for direction keys.");

      if (eventKey === 'w' || eventKey === 's' || eventKey === 'a' || eventKey === 'd') {
        moveInDirection(eventKey);
        return;
      }

      console.log("Key down. Checking for digit keys.");

      const eventKeyNumber: number = parseInt(eventKey);

      if (0 <= eventKeyNumber && eventKeyNumber <= 9) {
        setDigit(eventKeyNumber);
      }
    }}
  />;
}


function App() {
  const [array, setArray]: [number[][], any] = useState(Board.matrix());
  const [selectedCell, setSelectedCell]: [number[], any] = useState([0, 0]);

  const tableRows: Array<ReactElement> = [];

  for (const [y, row] of array.entries()) {
    const tableRow: Array<ReactElement> = [];

    for (const [x, digit] of row.entries()) {
      tableRow.push(
        // TODO: DO NOT ALLOW THE PLAYER TO CHANGE THE DIGIT VALUE TO A NUMBER THAT'S NOT 0-9.
        <td key={`${y}${x}`}>
          <Cell
            value={digit}
            selected={selectedCell !== null && selectedCell[0] === y && selectedCell[1] === x}
            select={() => setSelectedCell([y, x])}
            setDigit={(digit: number) => setArray((new Board(array)).writeCell(y, x, digit).array)}
            moveInDirection={(direction: string) => {
              if (direction === 'w' && y > 0) {
                setSelectedCell([y - 1, x]);
              } else if (direction === 's' && y < 8) {
                setSelectedCell([y + 1, x]);
              } else if (direction === 'a' && x > 0) {
                setSelectedCell([y, x - 1]);
              } else if (direction === 'd' && x < 8) {
                setSelectedCell([y, x + 1]);
              }
            }}
          />
        </td>
      );
    }

    tableRows.push(<tr key={`${y}`}>{tableRow}</tr>);
  }

  return (
    <>
      <table>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  );
}

export default App;
