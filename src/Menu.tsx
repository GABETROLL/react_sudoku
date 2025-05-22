import { useState } from "react";
import Game from "./Game";
import Victory from "./Victory";
import Board, { Difficulty, CellInfo } from "./board";
import "./menu.css";

enum GameStages {
  notYetStarted,
  started,
  won,
}


type GameInfo = {
  gameStage: GameStages,
  difficulty: Difficulty,
  array: CellInfo[][],
  gameTimeMilliseconds: number,
};


export default function Menu() {
  const initialState = {
    gameStage: GameStages.notYetStarted,
    difficulty: Difficulty.easy,
    array: Board.matrix(),
    gameTimeMilliseconds: 0,
  };

  const [gameInfo, setGameInfo] = useState<GameInfo>(initialState);

  if (gameInfo.gameStage === GameStages.notYetStarted) {
    return (
      <div className="menu">
        <h2>Difficulty</h2>
        <button onClick={() => setGameInfo({...gameInfo, gameStage: GameStages.started, difficulty: Difficulty.easy})}>Easy</button>
        <button onClick={() => setGameInfo({...gameInfo, gameStage: GameStages.started, difficulty: Difficulty.medium})}>Medium</button>
        <button onClick={() => setGameInfo({...gameInfo, gameStage: GameStages.started, difficulty: Difficulty.hard})}>Hard</button>
      </div>
    );
  } else if (gameInfo.gameStage === GameStages.started) {
    return <Game
      difficulty={gameInfo.difficulty}
      victory={(array) => setGameInfo({...gameInfo, gameStage: GameStages.won, array: array})}
      updateStopwatch={(timeElapsed) => setGameInfo({...gameInfo, gameTimeMilliseconds: gameInfo.gameTimeMilliseconds + timeElapsed})}
    />;
  } else {
    return <Victory array={gameInfo.array} time={gameInfo.gameTimeMilliseconds} goBackHome={() => setGameInfo(initialState)} />
  }
}
