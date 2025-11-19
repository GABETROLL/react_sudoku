import { Difficulty } from "./board";

/**
 * Logs in the user to the backend and returns the user's ID,
 * which SHOULD be in the `Response` object obtained from the server.
 *
 * @param {string} name - The username of the player that is attempting to log in.
 * @param {string} email - The email of the player that is attempting to log in.
 * @param {string} password - The password of the player that is attempting to log in.
 * @returns {Promise<Response>} The server's response, as a `Response` instance.
 * It SHOULD contain an ID for this player's login session, and the player's ID.
 */
export async function login(name: string, email: string, password: string): Promise<Response> {
	return new Response(JSON.stringify({playerId: "RANDOM_PLAYER_ID", sessionId: "RANDOM_SESSION_ID"}));
}

export async function logout(playerId: string, sessionId: string): Promise<Response> {
	return new Response();
}

/**
 * Starts a new game with `difficulty` as its difficulty in the backend.
 *
 * Requests the server at `/games` to start a new game session.
 * This API function should be called when the player has requested to start
 * a new game with a certain difficulty.
 *
 * @param {string} playerId - The ID of the player in the DB.
 * @param {string} sessionId - The ID of the LOGIN SESSION of the player. This ID is obtained from the `login` API.
 * @param {Difficulty} difficulty - The difficulty the player has set the game they want to start.
 * @returns {Promise<Response>} The server's response. It SHOULD contain an ID for this new "game session".
 * If an error occurs with the request itself,
 * the result will be a `Response` object who's body contains the error in a message, and a status code
 * of 500.
 */
export async function startGame(playerId: string, sessionId: string, difficulty: Difficulty): Promise<Response> {
	return new Response(JSON.stringify({gameId: "RANDOM_GAME_ID", startTime: Date.now()}));
}

/**
 * Quits the game with `sessionId` and `gameSessionId` UNSUCCESSFULLY in the backend,
 * which deletes the corresponding current game session, and DOESN'T add this
 * game to the Games table, because all of those games were successful games.
 *
 * @param {string} playerId - The ID of the player that started this game session
 * @param {string} sessionId - The sessionId given to the player when they logged in
 * The player MUST be logged in, and must own this game to perform this request successfully!
 * @param {string} gameSessionId - The ID of this game, the game the player is trying to quit.
 * @returns {Promise<Response>} - The server's response. If an error occurs with the request itself,
 * the result will be a `Response` object who's body contains the error in a message, and a status code
 * of 500.
 */
export async function quitGame(playerId: string, sessionId: string, gameSessionId: string): Promise<Response> {
	return new Response(`Game session deleted successfully.`);
}

/**
 * Ends the game with `gameSessionId` and `sessionId` SUCCESSFULLY in the backend, which would make the backend store and
 * remember the game's results (the time it took the player to beat the game,
 * and the difficulty the game was), and forget the corresponding current game session.
 *
 * @param {string} playerId - The ID of the player in the DB.
 * @param {string} sessionId - The ID of the LOGIN SESSION of the player. This ID is obtained from the `login` API.
 * @param {string} gameSessionId - The ID of the GAME SESSION. This ID is obtained from the `startGame` API.
 * @returns {Promise<Response>} The server's response. If an error occurs with the request itself,
 * the result will be a `Response` object who's body contains the error in a message, and a status code
 * of 500.
 */
export async function endGame(playerId: string, sessionId: string, gameSessionId: string): Promise<Response> {
	return new Response(JSON.stringify({time: Date.now()}));
}
