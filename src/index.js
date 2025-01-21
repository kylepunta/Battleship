import "./styles.css";
import { domQueries, renderDOM } from "./modules/dom.js";
import { addEventListeners } from "./modules/event.js";
import { Player } from "./modules/player.js";
import { GameBoard } from "./modules/gameBoard.js";
import { Ship } from "./modules/ship.js";
import { states } from "./modules/state.js";

renderDOM.clearPage();
renderDOM.renderBoards();
renderDOM.renderBoardMenu();
renderDOM.renderShipYard();
addEventListeners();

const playerOne = new Player("Real");
const playerTwo = new Player("Real");
states.setPlayerOne(playerOne);
states.setPlayerTwo(playerTwo);
states.setPlayerOneGameBoard(playerOne.playerBoard);
states.setPlayerTwoGameBoard(playerTwo.playerBoard);
states.setPlayerOneFleetBoard(playerOne.playerBoard.board);
states.setPlayerOneAttackBoard(playerOne.playerBoard.missedAttacks);
states.setPlayerTwoFleetBoard(playerTwo.playerBoard.board);
states.setPlayerTwoAttackBoard(playerTwo.playerBoard.missedAttacks);

console.log(states.getPlayerOneFleetBoard());
