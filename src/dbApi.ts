import { Difficulty } from "./board";

const serverUrl = "http://54.152.38.239";

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
async function login(name: string, email: string, password: string): Promise<Response> {
	try {
		return await fetch(`${serverUrl}/login`, {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
		});
	} catch (error) {
		return new Response(`Error making login fetch request: ${error}`, {status: 500});
	}
}

async function logout(playerId: string, sessionId: string): Promise<Response> {
	try {
		return await fetch(`${serverUrl}/login`, {
			method: "DELETE",
			body: JSON.stringify({ userId: playerId, sessionId }),
		});
	} catch (error) {
		return new Response(`Error making login fetch request: ${error}`, {status: 500});
	}
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
async function startGame(playerId: string, sessionId: string, difficulty: Difficulty): Promise<Response> {
	try {
		return await fetch(`${serverUrl}/games`, {
			method: "POST",
			body: JSON.stringify({ userId: playerId, sessionId, difficulty }),
		});
	} catch (error) {
		return new Response(`Error making startGame fetch request: ${error}`, {status: 500});
	}
}
/**
 * Ends the game with `sessionId` in the backend, which would make the backend store and
 * remember the game's results (the time it took the player to beat the game,
 * and the difficulty the game was).
 *
 * @param {string} playerId - The ID of the player in the DB.
 * @param {string} sessionId - The ID of the LOGIN SESSION of the player. This ID is obtained from the `login` API.
 * @param {string} gameSessionId - The ID of the GAME SESSION. This ID is obtained from the `startGame` API.
 * @returns {Promise<Response>} The server's response. If an error occurs with the request itself,
 * the result will be a `Response` object who's body contains the error in a message, and a status code
 * of 500.
 */
async function endGame(playerId: string, sessionId: string, gameSessionId: string): Promise<Response> {
	try {
		return await fetch(`${serverUrl}/games/${sessionId}`, {
			method: "PUT",
			body: JSON.stringify({ userId: playerId, sessionId, gameSessionId}),
		});
	} catch (error) {
		return new Response(`Error making endGame fetch request: ${error}`, {status: 500});
	}
}
