import { useState } from "react";
import Game from "./Game";
import { Difficulty } from "./board";
import "./menu.css";

type GameInfo = {
  gameStarted: boolean, difficulty: Difficulty
};


export default function Menu() {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    gameStarted: false, difficulty: Difficulty.easy
  });

  if (gameInfo.gameStarted) {
    return <Game
      difficulty={gameInfo.difficulty}
      victory={() => setGameInfo({gameStarted: false, difficulty: Difficulty.easy})}
    />;
  }

  return (
    <div className="menu">
      <h2>Difficulty</h2>
      <button onClick={() => setGameInfo({gameStarted: true, difficulty: Difficulty.easy})}>Easy</button>
      <button onClick={() => setGameInfo({gameStarted: true, difficulty: Difficulty.medium})}>Medium</button>
      <button onClick={() => setGameInfo({gameStarted: true, difficulty: Difficulty.hard})}>Hard</button>
    </div>
  );
}
