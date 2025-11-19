import { useState } from "react";
import Game from "./Game";
import Victory from "./Victory";
import Board, { Difficulty, CellInfo } from "./board";
import { startGame, endGame } from "./api";
import "./menu.css";

enum GameStages {
  notYetStarted,
  loading,
  failedToStartGame,
  started,
  winning,
  quitting,
  failedToWin,
  won,
}


type GameInfo = {
  gameStage: GameStages,
  difficulty: Difficulty,
  array: CellInfo[][],
  gameTimeMilliseconds: number,
  playerId: string,
  sessionId: string,
  gameSessionId: string,
};


export default function Menu() {
  const initialState = {
    gameStage: GameStages.notYetStarted,
    difficulty: Difficulty.easy,
    array: Board.matrix(),
    gameTimeMilliseconds: 0,
    playerId: '',
    sessionId: '',
    gameSessionId: '',
  };

  const [gameInfo, setGameInfo] = useState<GameInfo>(initialState);

  function innerStartGame(difficulty: Difficulty) {
    setGameInfo({...gameInfo, gameStage: GameStages.loading, difficulty})

    startGame(gameInfo.playerId, gameInfo.sessionId, difficulty).then((res: Response) => {
      if (!res.ok) {
        setGameInfo({...gameInfo, gameStage: GameStages.failedToStartGame});
      } else {
        res.json().then((resJson: any) => {
          setGameInfo({...gameInfo, gameStage: GameStages.started, gameSessionId: resJson.gameSessionId});
        }).catch((error: any) => {
          setGameInfo({...gameInfo, gameStage: GameStages.failedToStartGame});
        });
      }
      
    }).catch((error: any) => {
      setGameInfo({...gameInfo, gameStage: GameStages.failedToStartGame});
    });
  }

  function innerEndGame(array: CellInfo[][]) {
    setGameInfo({...gameInfo, gameStage: GameStages.winning, array, gameSessionId: ''});

    endGame(gameInfo.playerId, gameInfo.sessionId, gameInfo.gameSessionId).then((res: Response) => {
      if (!res.ok) {
        setGameInfo({...gameInfo, gameStage: GameStages.failedToWin});
      } else {
        res.json().then((resJson: any) => {
          setGameInfo({...gameInfo, gameStage: GameStages.won, gameTimeMilliseconds: resJson.time});
        }).catch((error: any) => {
          setGameInfo({...gameInfo, gameStage: GameStages.failedToWin});
        });
      }
    }).catch((error: any) => {
      setGameInfo({...gameInfo, gameStage: GameStages.failedToWin});
    });
  }

  if (gameInfo.gameStage === GameStages.notYetStarted) {
    return (
      <>
        <header>
          <h1>Difficulty</h1>
        </header>
        <div className="menu">
          <button onClick={() => innerStartGame(Difficulty.easy)}>Easy</button>
          <button onClick={() => innerStartGame(Difficulty.medium)}>Medium</button>
          <button onClick={() => innerStartGame(Difficulty.hard)}>Hard</button>
        </div>
      </>
    );
  } else if (gameInfo.gameStage === GameStages.loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (gameInfo.gameStage === GameStages.failedToStartGame) {
    return (<div><h1>Failed to start game...</h1></div>);
  } else if (gameInfo.gameStage === GameStages.started) {
    return <Game difficulty={gameInfo.difficulty} victory={innerEndGame} />;
  } else if (gameInfo.gameStage === GameStages.failedToWin) {
    return (<div><h1>Failed to win game...</h1></div>);
  } else {
    return <Victory
      array={gameInfo.array}
      time={gameInfo.gameTimeMilliseconds}
      gameId={gameInfo.gameSessionId}
      playAgain={() => innerStartGame(gameInfo.difficulty)}
      goBackHome={() => setGameInfo(initialState)}
    />
  }
}
