import { createDOMQueries, DOMState } from "./DOM.js";

const eventHandler = function () {
  const DOMQueries = createDOMQueries();
  const addShipEventListeners = function () {
    DOMQueries.carrier.addEventListener("click", () => {
      console.log("clicked!");
      DOMState.setActiveShip("carrier");
    });
    DOMQueries.battleship.addEventListener("click", () => {
      console.log("clicked!");
      DOMState.setActiveShip("battleship");
    });
    DOMQueries.cruiser.addEventListener("click", () => {
      console.log("clicked!");
      DOMState.setActiveShip("cruiser");
    });
    DOMQueries.submarine.addEventListener("click", () => {
      console.log("clicked!");
      DOMState.setActiveShip("submarine");
    });
    DOMQueries.destroyer.addEventListener("click", () => {
      console.log("clicked!");
      DOMState.setActiveShip("destroyer");
    });
  };
  const addFleetBoardListeners = function () {
    DOMQueries.squares.forEach((square) => {
      square.addEventListener("click", () => {
        switch (DOMState.getActiveShip()) {
          case "carrier":
            console.log("carrier");
            break;
          case "battleship":
            console.log("battleship");
            break;
          case "cruiser":
            console.log("cruiser");
            break;
          case "submarine":
            console.log("submarine");
            break;
          case "destroyer":
            console.log("destroyer");
            break;
        }
      });
    });
  };
  return { addShipEventListeners, addFleetBoardListeners };
};

export { eventHandler };
