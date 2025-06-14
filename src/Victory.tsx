import { CellInfo } from "./board";
import BoardComponent from "./BoardComponent";
import formatTime from "./formatTime";
import "./victory.css";


export default function Victory(
  {array, time, playAgain, goBackHome}
  : {array: CellInfo[][], time: number, playAgain: () => void, goBackHome: () => void}
) {
  const timeTextString: string = formatTime(time);

  return (
    <div className="victory">
      <div className="h-flex">
        <BoardComponent
          array={array}
          // TODO: SELECTED CELL MUST BE VALID AS NULL!
          selectedCell={null} setSelectedCell={() => {}}
          showingInvalidCells={true} setShowingInvalidCells={() => {}}
          // showingInvalidCells is true, in case the user made a mistake,
          // so that the bug is easier to spot.
        />
        <div className="v-flex">
          <h1>You win!</h1>
          <h2>Time: {timeTextString}</h2>
        </div>
      </div>
      <div className="h-flex">
        <div className="v-flex">
          <button onClick={playAgain}>Play again</button>
          <button onClick={goBackHome}>Go to Home</button>
        </div>
        <div>
          <h3>Submit your scores:</h3>
          <input type="text" placeholder="Your name" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
