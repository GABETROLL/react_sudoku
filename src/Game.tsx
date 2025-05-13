import Board, { CellInfo } from './board';
import './Game.css';
import { ReactElement, useEffect, useState } from 'react';


function Cell({value, permanent, selected, select, showInvalid}:
    {value: number, permanent: boolean, selected: boolean, select: any, showInvalid: boolean}
  ) {
  let className = "cell";
  if (selected) className += " selected";
  if (showInvalid) className += " invalid";

  if (permanent) {
    className += " permanent";
  } else {
    className += " temporary";
  }

  return (
    <td className={className} onClick={select}>
      <p>
        {Board.validNumber(value) && value > 0 ? value.toString() : ''}
      </p>
    </td>
  );
}


function Game({victory}: {victory: () => void}) {
  const [array, setArray]: [CellInfo[][], any] = useState((Board.matrix()));
  const [selectedCell, setSelectedCell]: [number[], any] = useState([0, 0]);
  const [showingInvalidCells, setShowingInvalidCells]: [boolean, any] = useState(false);

  const board = new Board(array);

  function submitBoard() {
    if (board.playerWins()) {
      victory();
    } else {
      setShowingInvalidCells(true);
    }
  }

  useEffect(
    () => {
      function keyDownListener(event: KeyboardEvent) {
        if (event.key === "a" && selectedCell[1] > 0) {
          setSelectedCell([selectedCell[0], selectedCell[1] - 1]);
          setShowingInvalidCells(false);
          return;
        } else if (event.key === "d" && selectedCell[1] < 8) {
          setSelectedCell([selectedCell[0], selectedCell[1] + 1]);
          setShowingInvalidCells(false);
          return;
        } else if (event.key === "w" && selectedCell[0] > 0) {
          setSelectedCell([selectedCell[0] - 1, selectedCell[1]]);
          setShowingInvalidCells(false);
          return;
        } else if (event.key === "s" && selectedCell[0] < 8) {
          setSelectedCell([selectedCell[0] + 1, selectedCell[1]]);
          setShowingInvalidCells(false);
          return;
        }

        const eventKeyNumber: number = parseInt(event.key);

        if (Number.isInteger(eventKeyNumber) && eventKeyNumber >= 0 && eventKeyNumber <= 9) {
          let newBoard: Board;

          try {
            newBoard = board.writeCell(selectedCell[0], selectedCell[1], eventKeyNumber);
          } catch (error) {
            if (error !== "Attempting to write permanent cell!") {
              console.log(error);
            }
            return;
          }

          setArray(newBoard.array);
          setShowingInvalidCells(false);
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

    for (const [x, cellInfo] of row.entries()) {
      // TODO: ADD PROP TO CELL TO INDICATE IF IT'S PERMANENT,
      // AND MAKE `Cell` DISPLAY ITSELF AND FUNCTION AS SUCH.
      tableRow.push(
        <Cell
          key={`${y}${x}`}
          value={cellInfo.digit}
          permanent={cellInfo.permanent}
          selected={selectedCell !== null && selectedCell[0] === y && selectedCell[1] === x}
          select={() => { setSelectedCell([y, x]); setShowingInvalidCells(false); }}
          showInvalid={showingInvalidCells && !(board.valid_cell(y, x, false))}
        />
      );
    }

    tableRows.push(<tr key={`${y}`}>{tableRow}</tr>);
  }

  // TODO: LET THE PLAYER KNOW THEY'VE WON
  return (
    <>
      <table className="board">
        <tbody className="boardBody">
          {tableRows}
        </tbody>
      </table>
      <button onClick={() => setArray((new Board(undefined)).array)}>Generate</button>
      <button onClick={() => submitBoard()}>Submit</button>
    </>
  );
}

export default Game;
