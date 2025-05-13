import { useState } from "react";
import Game from "./Game";


export default function Menu() {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <Game victory={() => setGameStarted(false)} />;
  }

  return (
    <div id="menu">
      <h2>Difficulty</h2>
      <input type="number" />
      <button onClick={() => setGameStarted(true)}></button>
    </div>
  );
}
