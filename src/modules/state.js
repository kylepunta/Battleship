import { Player } from "./player.js";
import { GameBoard } from "./gameBoard.js";
import { Ship } from "./ship.js";

const states = (() => {
  const domState = {
    draggedPiece: null,
    droppedPiece: null,
    rotateMode: "vertical",
    unitClicked: null,
    shipsPlaced: 0,
  };
  const gameState = {
    playerOne: null,
    playerTwo: null,
    playerOneGameBoard: null,
    playerTwoGameBoard: null,
    playerOneFleetBoard: null,
    playerOneAttackBoard: null,
    playerTwoFleetBoard: null,
    playerTwoAttackBoard: null,
    currentTurn: "playerOne",
    playerOneReady: false,
    playerTwoReady: false,
  };
  return {
    domState,
    gameState,
    getDraggedPiece: () => domState.draggedPiece,
    setDraggedPiece: (draggedPiece) => (domState.draggedPiece = draggedPiece),
    getDroppedPiece: () => domState.droppedPiece,
    setDroppedPiece: (droppedPiece) => (domState.droppedPiece = droppedPiece),
    getPlayerOne: () => gameState.playerOne,
    setPlayerOne: (player) => (gameState.playerOne = player),
    getPlayerTwo: () => gameState.playerTwo,
    setPlayerTwo: (player) => (gameState.playerTwo = player),
    getPlayerOneGameBoard: () => gameState.playerOneGameBoard,
    setPlayerOneGameBoard: (board) => (gameState.playerOneGameBoard = board),
    getPlayerTwoGameBoard: () => gameState.playerTwoGameBoard,
    setPlayerTwoGameBoard: (board) => (gameState.playerTwoGameBoard = board),
    getPlayerOneFleetBoard: () => gameState.playerOneFleetBoard,
    setPlayerOneFleetBoard: (board) => (gameState.playerOneFleetBoard = board),
    getPlayerOneAttackBoard: () => gameState.playerOneAttackBoard,
    setPlayerOneAttackBoard: (board) =>
      (gameState.playerOneAttackBoard = board),
    getPlayerTwoFleetBoard: () => gameState.playerTwoFleetBoard,
    setPlayerTwoFleetBoard: (board) => (gameState.playerTwoFleetBoard = board),
    getPlayerTwoAttackBoard: () => gameState.playerTwoAttackBoard,
    setPlayerTwoAttackBoard: (board) =>
      (gameState.playerTwoAttackBoard = board),
    getCurrentTurn: () => gameState.currentTurn,
    setCurrentTurn: (turn) => (gameState.currentTurn = turn),
    getRotateMode: () => domState.rotateMode,
    setRotateMode: (mode) => (domState.rotateMode = mode),
    getUnitClicked: () => domState.unitClicked,
    setUnitClicked: (unit) => (domState.unitClicked = unit),
    getPlayerOneReady: () => gameState.playerOneReady,
    setPlayerOneReady: (status) => (gameState.playerOneReady = status),
    getPlayerTwoReady: () => gameState.playerTwoReady,
    setPlayerTwoReady: (status) => (gameState.playerTwoReady = status),
    getShipsPlaced: () => domState.shipsPlaced,
    increaseShipsPlaced: () => domState.shipsPlaced++,
    resetShipsPlaced: () => (domState.shipsPlaced = 0),
  };
})();

export { states };
