import Board, { CellInfo, Difficulty } from './board';
import './Game.css';
import { useEffect, useState } from 'react';
import BoardComponent from './BoardComponent';
import formatTime from './formatTime';

export default function Game(
  {difficulty, victory}
  : {difficulty: Difficulty, victory: (array: CellInfo[][]) => void}
) {
  const [array, setArray]: [CellInfo[][], any] = useState(new Board(undefined, difficulty).array);
  const [selectedCell, setSelectedCell]: [[number, number], any] = useState([0, 0]);
  const [showingInvalidCells, setShowingInvalidCells]: [boolean, any] = useState(false);
  const [gameTimeMilliseconds, setGameTimeMilliseconds]: [number, any] = useState(0);

  const board = new Board(array);

  function submitBoard() {
    if (board.playerWins()) {
      victory(array);
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

  useEffect(
    () => {
      const refreshTime = 250;

      const intervalId = setInterval(
        () => {
          setGameTimeMilliseconds(gameTimeMilliseconds + refreshTime);
        },
        refreshTime,
      );

      return () => clearInterval(intervalId);
    }
  );

  return (
    <div className="game">
      <BoardComponent
        array={array}
        selectedCell={selectedCell} setSelectedCell={setSelectedCell}
        showingInvalidCells={showingInvalidCells} setShowingInvalidCells={setShowingInvalidCells}
      />
      <p>Time: {formatTime(gameTimeMilliseconds)}</p>
      <button onClick={submitBoard}>Submit</button>
    </div>
  );
}
