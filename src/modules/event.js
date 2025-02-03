import { domQueries, renderDOM } from "./dom.js";
import { states } from "./state.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { GameBoard } from "./gameBoard.js";
import { gameController } from "./gameController.js";

const addEventListeners = (function () {
  function addGameEventListeners() {
    domQueries.ships.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        states.setDraggedPiece(e.target);
        console.log("Dragged piece", states.getDraggedPiece());
      });
      ship.addEventListener("dragend", (e) => {
        states.setDraggedPiece(null);
        console.log("Dragged piece", states.getDraggedPiece());
      });
    });
    domQueries.shipUnits.forEach((unit) => {
      unit.addEventListener("mousedown", () => {
        states.setUnitClicked(parseInt(unit.getAttribute("data-index")));
        console.log(states.getUnitClicked());
      });
    });
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        domQueries.fleetSquares[i][j].addEventListener("dragover", (event) => {
          event.preventDefault();
        });
        domQueries.fleetSquares[i][j].addEventListener("drop", (event) => {
          event.preventDefault();
          gameController.insertShip(i, j);
        });
      }
    }
    domQueries.clearBtn.addEventListener("click", gameController.clearShips);

    domQueries.confirmBtn.addEventListener(
      "click",
      gameController.confirmShips
    );

    domQueries.randomizeBtn.addEventListener(
      "click",
      gameController.randomizeShips
    );

    domQueries.rotateBtn.addEventListener("click", gameController.rotateShips);
  }

  function addMainMenuListeners() {
    const newGameBtn = domQueries.newGameBtn;
    newGameBtn.addEventListener("click", gameController.selectGameMode);
  }
  function addSelectPlayerEventListeners() {
    const player = domQueries.playerSelection;
    const computer = domQueries.computerSelection;

    player.addEventListener("click", gameController.selectPlayerMode);

    computer.addEventListener("click", gameController.selectComputerMode);
  }

  function addAttackBoardEventListeners() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        domQueries.attackSquares[i][j].addEventListener("click", () => {
          gameController.placeAttack(i, j);
        });
      }
    }
  }
  function addGameOverDisplayListeners() {
    domQueries.playAgainBtn.addEventListener("click", () => {
      states.resetGame();
      renderDOM.clearPage();
      renderDOM.loadPlayerSelectionPage();
      addSelectPlayerEventListeners();
    });
  }
  return {
    addGameEventListeners,
    addMainMenuListeners,
    addSelectPlayerEventListeners,
    addAttackBoardEventListeners,
    addGameOverDisplayListeners,
  };
})();

export { addEventListeners };
