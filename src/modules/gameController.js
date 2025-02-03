import { states } from "./state.js";
import { renderDOM, domQueries } from "./dom.js";
import { Ship } from "./ship.js";
import { addEventListeners } from "./event.js";
import { Player } from "./player.js";
import { GameBoard } from "./gameBoard.js";

const gameController = (function () {
  function selectGameMode() {
    renderDOM.clearPage();
    renderDOM.loadPlayerSelectionPage();
    addEventListeners.addSelectPlayerEventListeners();
  }
  function selectPlayerMode() {
    states.setGameMode("player");
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
    addEventListeners.addGameEventListeners();
  }
  function selectComputerMode() {
    states.setGameMode("computer");
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
    addEventListeners.addGameEventListeners();
  }
  function insertShip(row, col) {
    states.setDroppedPiece(states.getDraggedPiece());
    console.log("Dropped piece", states.getDroppedPiece());

    const shipType = states.getDroppedPiece().getAttribute("data-type");
    const shipLength = states.getDroppedPiece().getAttribute("data-length");
    console.log(shipType);
    console.log(shipLength);
    console.log(row);
    console.log(col);

    switch (states.getCurrentTurn()) {
      case "playerOne":
        const playerOneShip = new Ship(
          shipType,
          parseInt(shipLength),
          states.getRotateMode()
        );
        const playerOneUnit = states.getUnitClicked();
        const playerOnePlacedShip = states
          .getPlayerOneGameBoard()
          .placeShip(playerOneShip, [row, col], playerOneUnit);
        if (playerOnePlacedShip) {
          states.increaseShipsPlaced();
          states.getDraggedPiece().classList.add("disabled");
          renderDOM.updateBoard(states.getPlayerOneFleetBoard(), null);
        }
        break;
      case "playerTwo":
        const playerTwoShip = new Ship(
          shipType,
          parseInt(shipLength),
          states.getRotateMode()
        );
        const playerTwoUnit = states.getUnitClicked();
        const playerTwoPlacedShip = states
          .getPlayerTwoGameBoard()
          .placeShip(playerTwoShip, [row, col], playerTwoUnit);
        if (playerTwoPlacedShip) {
          states.increaseShipsPlaced();
          states.getDraggedPiece().classList.add("disabled");
          renderDOM.updateBoard(states.getPlayerTwoFleetBoard(), null);
        }
        break;
    }
  }
  function clearShips() {
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
  }
  function confirmShips() {
    console.log("Game Mode: ", states.getGameMode());
    if (states.getShipsPlaced() === 5) {
      let currentTurn =
        states.getCurrentTurn() === "playerOne" ? "playerTwo" : "playerOne";
      states.setCurrentTurn(currentTurn);
      console.log("Current Turn:", states.getCurrentTurn());
      switch (currentTurn) {
        case "playerOne":
          if (states.getPlayerOneReady() === true) startGame();
          break;
        case "playerTwo":
          if (states.getGameMode() !== "computer") {
            states.setPlayerOneReady(true);
            renderDOM.clearBoard();
            renderDOM.renderPlayerHeading();
            states.resetShipsPlaced();
            domQueries.ships.forEach((ship) => {
              ship.classList.remove("disabled");
            });
          } else {
            randomizeShips();
            startGame();
          }
          break;
      }
    }
  }
  function randomizeShips() {
    let board = null;
    states.resetShipsPlaced();
    if (states.getCurrentTurn() === "playerOne") {
      board = states.getPlayerOneGameBoard();
    } else {
      board = states.getPlayerTwoGameBoard();
    }
    board.clearBoard();

    console.log("Randomizing ships on the board...");

    const ships = [];
    let direction = "";
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0) {
        direction = "vertical";
      } else if (randomNumber === 1) {
        direction = "horizontal";
      }
      console.log(direction);
      switch (i) {
        case 0:
          const carrier = new Ship("carrier", 5, direction);
          ships.push(carrier);
          break;
        case 1:
          const battleship = new Ship("battleship", 4, direction);
          ships.push(battleship);
          break;
        case 2:
          const cruiser = new Ship("cruiser", 3, direction);
          ships.push(cruiser);
          break;
        case 3:
          const submarine = new Ship("submarine", 3, direction);
          ships.push(submarine);
          break;
        case 4:
          const destroyer = new Ship("destroyer", 2, direction);
          ships.push(destroyer);
          break;
      }
    }

    while (states.getShipsPlaced() < 5) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);

      let currentShip = ships.shift();
      let shipPlaced = board.placeShip(currentShip, [row, col], 0);
      while (!shipPlaced) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        shipPlaced = board.placeShip(currentShip, [row, col], 0);
      }
      states.increaseShipsPlaced();
    }

    renderDOM.updateBoard(board.board, null);
    domQueries.ships.forEach((ship) => {
      ship.classList.add("disabled");
    });
  }
  function rotateShips() {
    const rotateMode =
      states.getRotateMode() === "vertical" ? "horizontal" : "vertical";
    states.setRotateMode(rotateMode);
    const ships = domQueries.ships;
    const shipStartUnits = domQueries.shipStartUnits;
    const shipEndUnits = domQueries.shipEndUnits;

    ships.forEach((ship) => {
      ship.classList.toggle("rotate-ship");
    });

    shipStartUnits.forEach((unit) => {
      unit.classList.toggle("rotated-ship-start-vertical");
    });
    shipEndUnits.forEach((unit) => {
      unit.classList.toggle("rotated-ship-end-vertical");
    });
  }
  function startGame() {
    states.setCurrentTurn("playerOne");
    renderDOM.clearPage();
    console.table(states.getPlayerOneFleetBoard());
    console.table(states.getPlayerTwoFleetBoard());
    renderDOM.loadGame();
  }
  function endGame() {
    renderDOM.endGame();
  }
  function switchTurn() {
    if (states.getCurrentTurn() === "playerOne") {
      states.setCurrentTurn("playerTwo");
      if (states.getGameMode() !== "computer") {
        renderDOM.updateBoard(
          states.getPlayerTwoFleetBoard(),
          states.getPlayerTwoAttackBoard()
        );
      } else {
        renderDOM.clearBoard();
      }
      renderDOM.renderPlayerHeading();
      renderDOM.updateAttackBoard(
        states.getPlayerOneFleetBoard(),
        states.getPlayerOneAttackBoard()
      );
      domQueries.attackBoardContainer.classList.remove("temp-disabled");
      domQueries.attackMessageContainer.classList.remove("miss-message");
      domQueries.attackMessageContainer.classList.remove("hit-message");
      domQueries.attackMessageContainer.classList.remove("sunk-message");
      domQueries.attackMessageContainer.classList.add("hidden");

      if (states.getGameMode() === "computer") {
        placeComputerAttack();
      }
    } else {
      states.setCurrentTurn("playerOne");
      renderDOM.updateBoard(
        states.getPlayerOneFleetBoard(),
        states.getPlayerOneAttackBoard()
      );
      renderDOM.renderPlayerHeading();
      renderDOM.updateAttackBoard(
        states.getPlayerTwoFleetBoard(),
        states.getPlayerTwoAttackBoard()
      );
      domQueries.attackBoardContainer.classList.remove("temp-disabled");
      domQueries.attackMessageContainer.classList.remove("miss-message");
      domQueries.attackMessageContainer.classList.remove("hit-message");
      domQueries.attackMessageContainer.classList.remove("sunk-message");
      domQueries.attackMessageContainer.classList.add("hidden");
    }
  }
  function placeAttack(i, j) {
    const attackSquares = domQueries.attackSquares;
    const playerOneGameBoard = states.getPlayerOneGameBoard();
    const playerTwoGameBoard = states.getPlayerTwoGameBoard();

    const row = attackSquares[i][j].getAttribute("data-row");
    const col = attackSquares[i][j].getAttribute("data-col");
    domQueries.attackBoardContainer.classList.add("temp-disabled");
    const currentTurn = states.getCurrentTurn();
    let isHit = null;

    switch (currentTurn) {
      case "playerOne":
        isHit = playerTwoGameBoard.receiveAttack([row, col]);
        if (isHit) {
          console.log("rendering explosion");
          renderDOM.renderExplosion(attackSquares[row][col]);
          if (checkShipSunk(playerTwoGameBoard.board, row, col) === true) {
            renderDOM.renderAttackMessage("sunk");
          } else {
            renderDOM.renderAttackMessage(true);
            isHit = null;
          }
        } else {
          renderDOM.renderMissedAttack(attackSquares[row][col]);
          renderDOM.renderAttackMessage(false);
        }
        renderDOM.updateAttackBoard(
          playerTwoGameBoard.board,
          playerTwoGameBoard.missedAttacks
        );
        states.setGameOver(states.checkWin(playerTwoGameBoard));
        if (states.gameOver()) {
          endGame();
        } else {
          setTimeout(switchTurn, 2000);
        }
        break;
      case "playerTwo":
        isHit = playerOneGameBoard.receiveAttack([row, col]);
        renderDOM.updateAttackBoard(
          playerOneGameBoard.board,
          playerOneGameBoard.missedAttacks
        );
        if (isHit) {
          if (states.getGameMode() === "computer") {
            states.setComputerHits([parseInt(row, 10), parseInt(col, 10)]);
          }
          renderDOM.renderExplosion(attackSquares[row][col]);
          if (checkShipSunk(playerOneGameBoard.board, row, col)) {
            renderDOM.renderAttackMessage("sunk");
          } else {
            renderDOM.renderAttackMessage(true);
            isHit = null;
          }
        } else {
          renderDOM.renderMissedAttack(attackSquares[row][col]);
          renderDOM.renderAttackMessage(false);
        }
        states.setGameOver(states.checkWin(playerOneGameBoard));
        if (states.gameOver()) {
          endGame();
        } else {
          setTimeout(switchTurn, 2000);
        }
        break;
    }
  }
  function placeComputerAttack() {
    const computerHits = states.getComputerHits();
    const attackSquares = domQueries.attackSquares;
    const attackBoard = states.getPlayerOneAttackBoard();
    const fleetBoard = states.getPlayerOneFleetBoard();

    let attackRow = null;
    let attackCol = null;
    let firstHitRow = null;
    let firstHitCol = null;

    if (computerHits !== null && computerHits.length > 0) {
      [firstHitRow, firstHitCol] = computerHits[0].map((coord) =>
        parseInt(coord, 10)
      );
      let lastHitIndex = computerHits.length - 1;
      let [lastHitRow, lastHitCol] = computerHits[lastHitIndex].map((coord) =>
        parseInt(coord, 10)
      );

      let attackDirections = [
        [lastHitRow - 1, lastHitCol],
        [lastHitRow + 1, lastHitCol],
        [lastHitRow, lastHitCol - 1],
        [lastHitRow, lastHitCol + 1],
      ];

      if (computerHits.length > 1) {
        let [secondLastRow, secondLastCol] = computerHits[lastHitIndex - 1].map(
          (coord) => parseInt(coord, 10)
        );
        if (secondLastRow === lastHitRow) {
          attackDirections = [
            [lastHitRow, lastHitCol - 1],
            [lastHitRow, lastHitCol + 1],
          ];
        } else if (secondLastCol === lastHitCol) {
          attackDirections = [
            [lastHitRow - 1, lastHitCol],
            [lastHitRow + 1, lastHitCol],
          ];
        }
      }

      let validMoves = attackDirections.filter(([row, col]) => {
        return (
          row >= 0 &&
          row <= 9 &&
          col >= 0 &&
          col <= 9 &&
          attackBoard[row][col] === null
        );
      });

      if (validMoves.length > 0) {
        [attackRow, attackCol] =
          validMoves[Math.floor(Math.random() * validMoves.length)];
      } else {
        if (lastHitRow === firstHitRow) {
          attackDirections = [
            [firstHitRow, firstHitCol - 1],
            [firstHitRow, firstHitCol + 1],
          ];
        } else if (lastHitCol === firstHitCol) {
          attackDirections = [
            [firstHitRow - 1, firstHitCol],
            [firstHitRow + 1, firstHitCol],
          ];
        }
        validMoves = attackDirections.filter(([row, col]) => {
          return (
            row >= 0 &&
            row <= 9 &&
            col >= 0 &&
            col <= 9 &&
            attackBoard[row][col] === null
          );
        });
        if (validMoves.length > 0) {
          [attackRow, attackCol] =
            validMoves[Math.floor(Math.random() * validMoves.length)];
        }
      }
    }

    if (
      attackRow === null ||
      attackCol === null ||
      (firstHitRow !== null &&
        firstHitCol !== null &&
        fleetBoard[firstHitRow][firstHitCol].isSunk())
    ) {
      do {
        attackRow = Math.floor(Math.random() * 10);
        attackCol = Math.floor(Math.random() * 10);
      } while (attackBoard[attackRow][attackCol] !== null);
      states.resetComputerHits();
    }

    const event = new Event("click", { bubbles: true, cancelable: true });
    attackSquares[attackRow][attackCol].dispatchEvent(event);
  }
  function checkShipSunk(board, row, col) {
    console.log(board);
    if (board[row][col].isSunk()) {
      return true;
    }
    return false;
  }
  return {
    selectGameMode,
    selectPlayerMode,
    selectComputerMode,
    insertShip,
    clearShips,
    confirmShips,
    randomizeShips,
    rotateShips,
    startGame,
    endGame,
    switchTurn,
    placeAttack,
    placeComputerAttack,
    checkShipSunk,
  };
})();
export { gameController };
