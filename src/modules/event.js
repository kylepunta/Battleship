import { domQueries, renderDOM } from "./dom.js";
import { states } from "./state.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { GameBoard } from "./gameBoard.js";

const addEventListeners = function () {
  domQueries.ships.forEach((ship) => {
    ship.addEventListener("dragstart", (e) => {
      states.setDraggedPiece(e.target);
      console.log("Dragged piece", states.getDraggedPiece());
    });
    ship.addEventListener("dragend", (e) => {
      states.getDraggedPiece().classList.add("disabled");
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
        states.setDroppedPiece(states.getDraggedPiece());
        console.log("Dropped piece", states.getDroppedPiece());

        const shipType = states.getDroppedPiece().getAttribute("data-type");
        const shipLength = states.getDroppedPiece().getAttribute("data-length");
        const [row, col] = [i, j];
        console.log(shipType);
        console.log(shipLength);
        console.log(row);
        console.log(col);

        switch (states.getCurrentTurn()) {
          case "playerOne":
            const ship = new Ship(shipType, parseInt(shipLength));
            const unit = states.getUnitClicked();
            states.getPlayerOneGameBoard().placeShip(ship, [row, col], unit);
            renderDOM.updateBoard(states.getPlayerOneFleetBoard());
            break;
          case "playerTwo":
            break;
        }
      });
    }
  }
};

export { addEventListeners };
