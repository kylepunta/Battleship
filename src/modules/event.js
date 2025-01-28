import { domQueries, renderDOM } from "./dom.js";
import { states } from "./state.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { GameBoard } from "./gameBoard.js";

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
          states.setDroppedPiece(states.getDraggedPiece());
          console.log("Dropped piece", states.getDroppedPiece());

          const shipType = states.getDroppedPiece().getAttribute("data-type");
          const shipLength = states
            .getDroppedPiece()
            .getAttribute("data-length");
          const [row, col] = [i, j];
          console.log(shipType);
          console.log(shipLength);
          console.log(row);
          console.log(col);

          switch (states.getCurrentTurn()) {
            case "playerOne":
              const playerOneShip = new Ship(shipType, parseInt(shipLength));
              const playerOneUnit = states.getUnitClicked();
              const playerOnePlacedShip = states
                .getPlayerOneGameBoard()
                .placeShip(playerOneShip, [row, col], playerOneUnit);
              if (playerOnePlacedShip) {
                states.increaseShipsPlaced();
                states.getDraggedPiece().classList.add("disabled");
                renderDOM.updateBoard(states.getPlayerOneFleetBoard());
              }
              break;
            case "playerTwo":
              const playerTwoShip = new Ship(shipType, parseInt(shipLength));
              const playerTwoUnit = states.getUnitClicked();
              const playerTwoPlacedShip = states
                .getPlayerTwoGameBoard()
                .placeShip(playerTwoShip, [row, col], playerTwoUnit);
              if (playerTwoPlacedShip) {
                states.increaseShipsPlaced();
                states.getDraggedPiece().classList.add("disabled");
                renderDOM.updateBoard(states.getPlayerTwoFleetBoard());
              }
              break;
          }
        });
      }
    }
    domQueries.clearBtn.addEventListener("click", () => {
      switch (states.getCurrentTurn()) {
        case "playerOne":
          states.getPlayerOneGameBoard().clearBoard();
          break;
        case "playerTwo":
          states.getPlayerTwoGameBoard().clearBoard();
          break;
      }
      renderDOM.clearBoard();
      states.resetShipsPlaced();
      domQueries.ships.forEach((ship) => {
        ship.classList.remove("disabled");
      });
    });
    domQueries.confirmBtn.addEventListener("click", () => {
      if (states.getShipsPlaced() === 5) {
        console.log("Confirming...");
        let currentTurn =
          states.getCurrentTurn() === "playerOne" ? "playerTwo" : "playerOne";
        states.setCurrentTurn(currentTurn);
        console.log("Current Turn:", states.getCurrentTurn());
        switch (currentTurn) {
          case "playerOne":
            if (states.getPlayerOneReady() === true) {
              console.log("Clearing page...");
              renderDOM.clearPage();
              console.table(states.getPlayerOneFleetBoard());
              console.table(states.getPlayerTwoFleetBoard());
              renderDOM.loadGame();
            }
            break;
          case "playerTwo":
            states.setPlayerOneReady(true);
            renderDOM.clearBoard();
            renderDOM.renderPlayerHeading();
            states.resetShipsPlaced();
            domQueries.ships.forEach((ship) => {
              ship.classList.remove("disabled");
            });
            break;
        }
      }
    });
  }
  function addMainMenuListeners() {
    const newGameBtn = domQueries.newGameBtn;
    const rulesBtn = domQueries.rulesBtn;
    const settingsBtn = domQueries.settingsBtn;
    newGameBtn.addEventListener("click", () => {
      renderDOM.clearPage();
      renderDOM.loadPlayerSelectionPage();
      addSelectPlayerEventListeners();
    });
  }
  function addSelectPlayerEventListeners() {
    const player = domQueries.playerSelection;
    const computer = domQueries.computerSelection;

    player.addEventListener("click", () => {
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
      renderDOM.clearPage();
      renderDOM.renderBoards();
      renderDOM.renderPlayerHeading();
      renderDOM.renderBoardMenu();
      renderDOM.renderShipYard();
      addGameEventListeners();
    });

    computer.addEventListener("click", () => {
      const playerOne = new Player("Real");
      const playerTwo = new Player("Computer");
      states.setPlayerOne(playerOne);
      states.setPlayerTwo(playerTwo);
      states.setPlayerOneGameBoard(playerOne.playerBoard);
      states.setPlayerTwoGameBoard(playerTwo.playerBoard);
      states.setPlayerOneFleetBoard(playerOne.playerBoard.board);
      states.setPlayerOneAttackBoard(playerOne.playerBoard.missedAttacks);
      states.setPlayerTwoFleetBoard(playerTwo.playerBoard.board);
      states.setPlayerTwoAttackBoard(playerTwo.playerBoard.missedAttacks);
      renderDOM.clearPage();
      renderDOM.renderBoards();
      renderDOM.renderPlayerHeading();
      renderDOM.renderBoardMenu();
      renderDOM.renderShipYard();
      addGameEventListeners();
    });
  }
  return {
    addGameEventListeners,
    addMainMenuListeners,
    addSelectPlayerEventListeners,
  };
})();

export { addEventListeners };
