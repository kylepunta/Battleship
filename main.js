import { Ship } from "./Ship.js";
import { GameBoard } from "./GameBoard.js";
import { Player } from "./Player.js";
import { eventHandler } from "./eventListeners.js";
import { DOMQueries, renderDOM } from "./DOM.js";

const gameState = (function () {
  const state = {
    playerOne: null,
    playerTwo: null,
    playerOneBoard: null,
    playerTwoBoard: null,
    playerBoards: null,
    currentTurn: "playerOne",
  };
  return {
    getPlayerOne: () => state.playerOne,
    setPlayerOne: (player) => (state.playerOne = player),
    getPlayerTwo: () => state.playerTwo,
    setPlayerTwo: (player) => (state.playerTwo = player),
    getPlayerOneBoard: () => state.playerOneBoard,
    setPlayerOneBoard: (board) => (state.playerOneBoard = board),
    getPlayerTwoBoard: () => state.playerTwoBoard,
    setPlayerTwoBoard: (board) => (state.playerTwoBoard = board),
    getCurrentTurn: () => state.currentTurn,
    setCurrentTurn: (turn) => (state.currentTurn = turn),
    getPlayerBoards: () => state.playerBoards,
    setPlayerBoards: (boards) => (state.playerBoards = boards),
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  renderDOM.renderBoards();
  // renderDOM.renderPlayerForms();
  renderDOM.renderShipSVGs();
  DOMQueries.playerFormSection.classList.toggle("hidden");
  // DOMQueries.boardSection.classList.toggle("hidden");
  // DOMQueries.playerTwoBoards.classList.toggle("hidden");
  const eventHandlerObj = eventHandler();
  eventHandlerObj.addShipEventListeners();
  eventHandlerObj.addFleetSquaresEventListeners();
  eventHandlerObj.addRotateBtnsEventListeners();
  console.log(gameState.playerOneAttackBoard);
  console.log(gameState.playerOneFleetBoard);
});

gameState.setPlayerOne(new Player("Real"));
gameState.setPlayerTwo(new Player("Real"));
gameState.setPlayerOneBoard(gameState.getPlayerOne().playerBoard);
gameState.setPlayerTwoBoard(gameState.getPlayerTwo().playerBoard);
gameState.setPlayerBoards([
  gameState.getPlayerOneBoard(),
  gameState.getPlayerTwoBoard(),
]);
renderDOM.hidePlayerInterface("playerTwo");

export { gameState };
