import {useEffect, useState} from "react";
import {startGame, endGame} from "./dbApi";
import {Difficulty, CellInfo} from "./board";
import Game from "./Game";

export default function LoadGame({
    playerId, sessionId, difficulty, victory
}: {playerId: string, sessionId: string, difficulty: Difficulty, victory: ()}) {
    const [gameSessionId, setGameSessionId]: [string, any] = useState('');

    function innerVictory(array: CellInfo[][]) {
        endGame(playerId, sessionId, gameSessionId).then((res: Response) => {
            res.json().then((jsonRes: any) => {
                jsonRes
            })
        })
    }

    useEffect(() => {
        startGame(playerId, sessionId, difficulty).then((res: Response) => {
            res.json().then((resJson) => {
                setGameSessionId(resJson.id);
            });
        });

        return () => {};
    });

    return (
        gameSessionId
        ? <Game difficulty={difficulty} victory={(array: CellInfo[][]) => {  }}/>
        : <div className="game-loader">
            <h1>Loading...</h1>
        </div>
    )
}