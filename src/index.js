import "./styles.css";
console.log("CSS File Loaded!");
import { domQueries, renderDOM } from "./modules/dom.js";
import { addEventListeners } from "./modules/event.js";
import { Player } from "./modules/player.js";
import { GameBoard } from "./modules/gameBoard.js";
import { Ship } from "./modules/ship.js";
import { states } from "./modules/state.js";

document.addEventListener("DOMContentLoaded", () => {
  addEventListeners.addMainMenuListeners();
});
