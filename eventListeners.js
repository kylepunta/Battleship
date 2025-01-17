import { DOMQueries, DOMState, renderDOM } from "./DOM.js";
import { gameState } from "./main.js";
import { Ship } from "./Ship.js";

const eventHandler = function () {
  const addShipEventListeners = function () {
    DOMQueries.carriers.forEach((carrier, index) => {
      carrier.addEventListener("click", () => {
        DOMQueries.shipContainers.forEach((shipContainer) => {
          shipContainer.classList.remove("disabled");
        });
        if (index === 0) {
          if (DOMState.getPlayerOneActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerOneActiveShip());
          }
          DOMState.setPlayerOneActiveShip({ type: "carrier", length: 5 });
          DOMQueries.shipContainers[0].classList.add("disabled");
        } else {
          if (DOMState.getPlayerTwoActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerTwoActiveShip());
          }
          DOMState.setPlayerTwoActiveShip({ type: "carrier", length: 5 });
          DOMQueries.shipContainers[5].classList.add("disabled");
        }
      });
    });
    DOMQueries.battleships.forEach((battleship, index) => {
      battleship.addEventListener("click", () => {
        DOMQueries.shipContainers.forEach((shipContainer) => {
          shipContainer.classList.remove("disabled");
        });
        if (index === 0) {
          if (DOMState.getPlayerOneActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerOneActiveShip());
          }
          DOMState.setPlayerOneActiveShip({ type: "battleship", length: 4 });
          DOMQueries.shipContainers[1].classList.add("disabled");
        } else {
          if (DOMState.getPlayerTwoActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerTwoActiveShip());
          }
          DOMState.setPlayerTwoActiveShip({ type: "battleship", length: 4 });
          DOMQueries.shipContainers[6].classList.add("disabled");
        }
      });
    });
    DOMQueries.cruisers.forEach((cruiser, index) => {
      cruiser.addEventListener("click", () => {
        DOMQueries.shipContainers.forEach((shipContainer) => {
          shipContainer.classList.remove("disabled");
        });
        if (index === 0) {
          if (DOMState.getPlayerOneActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerOneActiveShip());
          }
          DOMState.setPlayerOneActiveShip({ type: "cruiser", length: 3 });
          DOMQueries.shipContainers[2].classList.add("disabled");
        } else {
          if (DOMState.getPlayerTwoActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerTwoActiveShip());
          }
          DOMState.setPlayerTwoActiveShip({ type: "cruiser", length: 3 });
          DOMQueries.shipContainers[7].classList.add("disabled");
        }
      });
    });
    DOMQueries.submarines.forEach((submarine, index) => {
      submarine.addEventListener("click", () => {
        DOMQueries.shipContainers.forEach((shipContainer) => {
          shipContainer.classList.remove("disabled");
        });
        if (index === 0) {
          if (DOMState.getPlayerOneActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerOneActiveShip());
          }
          DOMState.setPlayerOneActiveShip({ type: "submarine", length: 3 });
          DOMQueries.shipContainers[3].classList.add("disabled");
        } else {
          if (DOMState.getPlayerTwoActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerTwoActiveShip());
          }
          DOMState.setPlayerTwoActiveShip({ type: "submarine", length: 3 });
          DOMQueries.shipContainers[8].classList.add("disabled");
        }
      });
    });
    DOMQueries.destroyers.forEach((destroyer, index) => {
      destroyer.addEventListener("click", () => {
        DOMQueries.shipContainers.forEach((shipContainer) => {
          shipContainer.classList.remove("disabled");
        });
        if (index === 0) {
          if (DOMState.getPlayerOneActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerOneActiveShip());
          }
          DOMState.setPlayerOneActiveShip({ type: "destroyer", length: 2 });
          DOMQueries.shipContainers[4].classList.add("disabled");
        } else {
          if (DOMState.getPlayerTwoActiveShip() !== null) {
            renderDOM.clearHighlightedShips(DOMState.getPlayerTwoActiveShip());
          }
          DOMState.setPlayerTwoActiveShip({ type: "destroyer", length: 2 });
          DOMQueries.shipContainers[9].classList.add("disabled");
        }
      });
    });
  };
  const addFleetSquaresEventListeners = function () {
    const playerOneGrid = Array.from({ length: 10 }, () =>
      Array(10).fill(null)
    );
    const playerTwoGrid = Array.from({ length: 10 }, () =>
      Array(10).fill(null)
    );
    DOMQueries.playerOneFleetSquares.forEach((square) => {
      const row = parseInt(square.dataset.row, 10);
      const col = parseInt(square.dataset.col, 10);
      playerOneGrid[row][col] = square;
    });
    DOMQueries.playerTwoFleetSquares.forEach((square) => {
      const row = parseInt(square.dataset.row, 10);
      const col = parseInt(square.dataset.col, 10);
      playerTwoGrid[row][col] = square;
    });
    DOMQueries.playerOneFleetSquares.forEach((square) => {
      square.addEventListener("mouseover", () => {
        const activeShip = DOMState.getPlayerOneActiveShip();
        console.log("Player One Active Ship", activeShip);
        const row = parseInt(square.dataset.row, 10);
        const col = parseInt(square.dataset.col, 10);
        renderDOM.highlightShipPlacement(activeShip, row, col, playerOneGrid);
      });
    });
    DOMQueries.playerTwoFleetSquares.forEach((square) => {
      square.addEventListener("mouseover", () => {
        const activeShip = DOMState.getPlayerTwoActiveShip();
        console.log("Player Two Active Ship", activeShip);
        const row = parseInt(square.dataset.row, 10);
        const col = parseInt(square.dataset.col, 10);
        renderDOM.highlightShipPlacement(activeShip, row, col, playerTwoGrid);
      });
    });
  };
  const addRotateBtnsEventListeners = function () {
    DOMQueries.rotateButtons[0].addEventListener("click", () => {
      const switchDirection =
        DOMState.getPlayerOneShipPlacementDirection() === "vertical"
          ? "horizontal"
          : "vertical";
      DOMState.setPlayerOneShipPlacementDirection(switchDirection);
    });
    DOMQueries.rotateButtons[1].addEventListener("click", () => {
      const switchDirection =
        DOMState.getPlayerTwoShipPlacementDirection() === "vertical"
          ? "horizontal"
          : "vertical";
      DOMState.setPlayerTwoShipPlacementDirection(switchDirection);
    });
  };
  return {
    addShipEventListeners,
    addFleetSquaresEventListeners,
    addRotateBtnsEventListeners,
  };
};

export { eventHandler };
