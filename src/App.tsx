import Board from './board';
import './App.css';
import { ReactElement, useEffect, useState } from 'react';


function Cell({value, selected, showInvalid}:
    {value: number, selected: boolean, showInvalid: boolean}
  ) {
  let className = "cell";
  if (selected) className += " selected";
  if (showInvalid) className += " invalid";

  return (
    <td className={className}>
      <p>
        {Board.validNumber(value) && value > 0 ? value.toString() : ''}
      </p>
    </td>
  );
}


function App() {
  const [array, setArray]: [number[][], any] = useState(Board.matrix());
  const [selectedCell, setSelectedCell]: [number[], any] = useState([0, 0]);
  const [showingInvalidCells, setShowingInvalidCells]: [boolean, any] = useState(false);

  const board = new Board(array);

  useEffect(
    () => {
      function keyDownListener(event: KeyboardEvent) {
        if (event.key === "a" && selectedCell[0] > 0) {
          setSelectedCell([selectedCell[0], selectedCell[1] - 1]);
          return;
        } else if (event.key === "d" && selectedCell[0] < 8) {
          setSelectedCell([selectedCell[0], selectedCell[1] + 1]);
          return;
        } else if (event.key === "w" && selectedCell[1] > 0) {
          setSelectedCell([selectedCell[0] - 1, selectedCell[1]]);
          return;
        } else if (event.key === "s" && selectedCell[1] < 8) {
          setSelectedCell([selectedCell[0] + 1, selectedCell[1]]);
          return;
        }

        const eventKeyNumber: number = parseInt(event.key);

        if (Number.isInteger(eventKeyNumber) && eventKeyNumber >= 0 && eventKeyNumber <= 9) {
          setArray(board.writeCell(selectedCell[0], selectedCell[1], eventKeyNumber).array);
          // return; <-------
        }
      }

      const result = () => {
        document.removeEventListener("keydown", keyDownListener);
      };

      document.addEventListener("keydown", keyDownListener);

      return result;
    },
  );

  const tableRows: Array<ReactElement> = [];

  for (const [y, row] of array.entries()) {
    const tableRow: Array<ReactElement> = [];

    for (const [x, digit] of row.entries()) {
      tableRow.push(
        <Cell
          key={`${y}${x}`}
          value={digit}
          selected={selectedCell !== null && selectedCell[0] === y && selectedCell[1] === x}
          showInvalid={showingInvalidCells && !(board.valid_cell(y, x, false))}
        />
      );
    }

    tableRows.push(<tr key={`${y}`}>{tableRow}</tr>);
  }

  return (
    <>
      <table className="board">
        <tbody className="boardBody">
          {tableRows}
        </tbody>
      </table>
      <button onClick={() => setShowingInvalidCells(true)}>Submit</button>
    </>
  );
}

export default App;
