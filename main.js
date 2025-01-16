import { Ship } from "./Ship.js";
import { GameBoard } from "./GameBoard.js";
import { Player } from "./Player.js";
import { eventHandler } from "./eventListeners.js";
import { createDOMQueries, renderDOM } from "./DOM.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDOM.renderBoards();
  // renderDOM.renderPlayerForms();
  renderDOM.renderShipSVGs();
  const DOMQueries = createDOMQueries();
  DOMQueries.playerFormSection.classList.toggle("hidden");
  // DOMQueries.boardSection.classList.toggle("hidden");
  DOMQueries.playerTwoBoards.classList.toggle("hidden");
  const eventHandlerObj = eventHandler();
  eventHandlerObj.addShipEventListeners();
  eventHandlerObj.addFleetBoardListeners();
});
