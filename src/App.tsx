import Board from './board';
import './App.css';
import { ReactElement, useState } from 'react';


function Cell({value, selected, select, setDigit, moveInDirection, showInvalid}:
    {value: number, selected: boolean, select: any, setDigit: any, moveInDirection: any, showInvalid: boolean}
  ) {

  let className = "";
  if (selected) className += "selected";
  if (showInvalid) className += " invalid";

  return <input
    value={1 <= value && value <= 9 ? value.toString() : ''}
    className={className}
    onSelect={select}
    onChange={(event) => {
      if (!selected || !event.target.value.length) return;

      const eventKey: string = event.target.value[event.target.value.length - 1];

      if (eventKey === 'w' || eventKey === 's' || eventKey === 'a' || eventKey === 'd') {
        moveInDirection(eventKey);
        return;
      }

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
  const [showingInvalidCells, setShowingInvalidCells]: [boolean, any] = useState(false);

  const board = new Board(array);

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
            select={() => { setSelectedCell([y, x]); setShowingInvalidCells(false); }}
            setDigit={(digit: number) => setArray(board.writeCell(y, x, digit).array)}
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
            showInvalid={showingInvalidCells && !(board.valid_cell(y, x, false))}
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
      <button onClick={() => setShowingInvalidCells(true)}>Submit</button>
    </>
  );
}

export default App;
