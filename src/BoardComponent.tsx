import { ReactElement } from "react";
import Board, { CellInfo } from "./board";


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
        {Board.validNumber(value) ? value.toString() : '0'}
      </p>
    </td>
  );
}

/**
 * Renders `array` as an HTML table of `Cell` components.
 *
 * If this board is being used in a game, the props `selectedCell` and `setSelectedCell`
 * can be used to highlight the cell the user is supposed to currently be selecting,
 * and so that the user can select a cell by clicking it. (THIS COMPONENT DOES NOT
 * MANAGE THE KEYBOARD TO MOVE THE PLAYER FROM ONE CELL TO ANOTHER, NOR DOES THIS COMPONENT
 * HAVE STATE. THE STATE FOR WHICH CELL IS SELECTED MUST BE KEPT OUTSIDE THIS COMPONENT).
 * The props `showingInvalidCells` can be used
 * so that this component renders all the invalid cells in the board as wrong
 * (with red background) if true, and to change wether or not the wrong cells are
 * being highlighted.
 */
export default function BoardComponent(
  {array, selectedCell, setSelectedCell, showingInvalidCells, setShowingInvalidCells}
  : {
  array: CellInfo[][],
  selectedCell: [number, number] | null, setSelectedCell: (([y, x]: [number, number]) => void),
  showingInvalidCells: boolean, setShowingInvalidCells: (value: boolean) => void,
}) {
    const board = new Board(array);

    const tableRows: Array<ReactElement> = [];

    for (const [y, row] of array.entries()) {
      const tableRow: Array<ReactElement> = [];
  
      for (const [x, cellInfo] of row.entries()) {
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

    return (
      <table className="board">
        <tbody className="boardBody">
          {tableRows}
        </tbody>
      </table>
    );
}
