import { addEventListeners } from "./event.js";
import { Ship } from "./ship.js";
import { states } from "./state.js";

const domQueries = {
  get mainBody() {
    return document.querySelector("main");
  },
  get mainMenu() {
    return document.querySelector(".main-menu");
  },
  get mainHeading() {
    return document.querySelector(".main-heading");
  },
  get newGameBtn() {
    return document.querySelector(".new-game");
  },
  get rulesBtn() {
    return document.querySelector(".rules");
  },
  get settingsBtn() {
    return document.querySelector(".settings");
  },
  get boardsContainer() {
    return document.querySelector(".boards-container");
  },
  get fleetBoardContainer() {
    return document.querySelector(".fleet-board-container");
  },
  get attackBoardContainer() {
    return document.querySelector(".attack-board-container");
  },
  get boards() {
    return document.querySelectorAll(".board");
  },
  get squares() {
    return document.querySelectorAll(".square");
  },
  get fleetSquares() {
    const fleetSquares = document.querySelectorAll(".fleet-square");
    const fleetGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
    fleetSquares.forEach((square) => {
      const row = square.getAttribute("data-row");
      const col = square.getAttribute("data-col");
      fleetGrid[row][col] = square;
    });
    return fleetGrid;
  },
  get attackSquares() {
    const attackSquares = document.querySelectorAll(".attack-square");
    const attackGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
    attackSquares.forEach((square) => {
      const row = square.getAttribute("data-row");
      const col = square.getAttribute("data-col");
      attackGrid[row][col] = square;
    });
    return attackGrid;
  },
  get boardMenu() {
    return document.querySelector(".board-menu");
  },
  get clearBtn() {
    return document.querySelector(".clear-button");
  },
  get confirmBtn() {
    return document.querySelector(".confirm-button");
  },
  get randomizeBtn() {
    return document.querySelector(".random-button");
  },
  get rotateBtn() {
    return document.querySelector(".rotate-button");
  },
  get boardAndShips() {
    return document.querySelector(".board-and-ships");
  },
  get ships() {
    return document.querySelectorAll(".shipyard > div");
  },
  get shipUnits() {
    return document.querySelectorAll(".ship-unit");
  },
  get shipStartUnits() {
    return document.querySelectorAll(
      ".shipyard > div > .ship-unit:first-child"
    );
  },
  get shipEndUnits() {
    return document.querySelectorAll(".shipyard > div > .ship-unit:last-child");
  },
  get playerSelection() {
    return document.querySelector(".player-selection");
  },
  get computerSelection() {
    return document.querySelector(".computer-selection");
  },
  get boardNameHeading() {
    return document.querySelector(".board-name-heading");
  },
  get attackMessageContainer() {
    return document.querySelector(".attack-message-container");
  },
  get attackMessage() {
    return document.querySelector(".attack-message");
  },
  get playAgainBtn() {
    return document.querySelector(".play-again-button");
  },
};

const renderDOM = (function () {
  function clearPage() {
    domQueries.mainBody.innerHTML = "";
  }
  function createBoard(boardType) {
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.classList.add(`${boardType}-square`);
        square.dataset.row = i;
        square.dataset.col = j;
        board.appendChild(square);
      }
    }
    return board;
  }
  function renderPlayerHeading() {
    const playerHeading = document.createElement("h2");
    const currentTurn = states.getCurrentTurn();
    if (currentTurn === "playerOne") {
      playerHeading.textContent = "Player One";
    } else if (currentTurn === "playerTwo") {
      if (states.getGameMode() === "computer") {
        playerHeading.textContent = "Computer";
      } else {
        playerHeading.textContent = "Player Two";
      }
    }
    domQueries.boardNameHeading.innerHTML = "";
    domQueries.boardNameHeading.appendChild(playerHeading);
  }
  function renderBoards() {
    const boardsContainer = document.createElement("div");
    boardsContainer.classList.add("boards-container");
    const fleetBoardContainer = document.createElement("div");
    fleetBoardContainer.classList.add("fleet-board-container");
    const attackBoardContainer = document.createElement("div");
    attackBoardContainer.classList.add("attack-board-container");
    attackBoardContainer.classList.add("hidden");
    const boardAndShips = document.createElement("div");
    boardAndShips.classList.add("board-and-ships");

    const nameHeading = document.createElement("div");
    nameHeading.classList.add("board-name-heading");
    const attackHeadingContainer = document.createElement("div");
    const attackHeading = document.createElement("h2");
    attackHeading.textContent = "Attack Board";
    attackHeading.classList.add("attack-board-heading");

    const attackMessageContainer = document.createElement("div");
    const attackMessage = document.createElement("h2");
    attackMessageContainer.classList.add("attack-message-container");
    attackMessageContainer.classList.add("hidden");
    attackMessage.classList.add("attack-message");
    attackMessageContainer.appendChild(attackMessage);

    boardAndShips.appendChild(createBoard("fleet"));
    attackHeadingContainer.appendChild(attackHeading);
    attackBoardContainer.appendChild(attackHeadingContainer);
    attackBoardContainer.appendChild(createBoard("attack"));
    attackBoardContainer.appendChild(attackMessageContainer);

    fleetBoardContainer.appendChild(nameHeading);
    fleetBoardContainer.appendChild(boardAndShips);
    boardsContainer.appendChild(fleetBoardContainer);
    boardsContainer.appendChild(attackBoardContainer);
    domQueries.mainBody.appendChild(boardsContainer);
  }
  function renderBoardMenu() {
    const fleetBoardContainer = domQueries.fleetBoardContainer;
    const boardMenu = document.createElement("div");
    boardMenu.classList.add("board-menu");

    const clearBtn = document.createElement("button");
    clearBtn.classList.add("clear-button");
    clearBtn.textContent = "Clear";
    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("confirm-button");
    confirmBtn.textContent = "Confirm";
    const randomBtn = document.createElement("button");
    randomBtn.classList.add("random-button");
    randomBtn.textContent = "Random";
    const rotateBtn = document.createElement("button");
    rotateBtn.classList.add("rotate-button");
    rotateBtn.textContent = "Rotate";

    boardMenu.appendChild(clearBtn);
    boardMenu.appendChild(confirmBtn);
    boardMenu.appendChild(randomBtn);
    boardMenu.appendChild(rotateBtn);

    fleetBoardContainer.appendChild(boardMenu);
  }
  function renderShipYard() {
    const boardAndShips = domQueries.boardAndShips;
    const shipYard = document.createElement("div");
    shipYard.classList.add("shipyard");
    const ships = createShips();
    shipYard.appendChild(ships[0]);
    shipYard.appendChild(ships[1]);
    shipYard.appendChild(ships[2]);
    shipYard.appendChild(ships[3]);
    shipYard.appendChild(ships[4]);
    boardAndShips.appendChild(shipYard);
  }
  function createShips() {
    const shipInfo = [
      { type: "carrier", length: 5 },
      { type: "battleship", length: 4 },
      { type: "cruiser", length: 3 },
      { type: "submarine", length: 3 },
      { type: "destroyer", length: 2 },
    ];

    const ships = shipInfo.map((shipInfo) => {
      const ship = document.createElement("div");
      ship.classList.add(shipInfo.type);
      ship.setAttribute("draggable", true);
      ship.dataset.type = shipInfo.type;
      ship.dataset.length = shipInfo.length.toString();

      for (let i = 0; i < shipInfo.length; i++) {
        const shipUnit = document.createElement("div");
        shipUnit.classList.add("ship-unit");
        shipUnit.dataset.index = i;
        const target = document.createElement("div");
        target.classList.add("target");

        shipUnit.appendChild(target);
        ship.appendChild(shipUnit);
      }
      return ship;
    });
    return ships;
  }
  function clearBoard() {
    const fleetSquares = domQueries.fleetSquares;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        fleetSquares[i][j].innerHTML = "";
      }
    }
  }
  function updateBoard(board, attacks) {
    clearBoard();
    const fleetSquares = domQueries.fleetSquares;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] !== null) {
          let currentShip = board[i][j];
          const shipUnit = document.createElement("div");
          const target = document.createElement("div");
          target.classList.add("target");
          shipUnit.appendChild(target);
          if (attacks !== null) {
            if (attacks[i][j] === true) {
              target.classList.add("target-hit");
            }
          }
          const isShipStart = renderDOM.isShipStart(board, i, j);
          const isShipEnd = renderDOM.isShipEnd(board, i, j);

          if (isShipStart) {
            if (board[i][j].direction === "vertical") {
              shipUnit.classList.add("ship-start-vertical");
            } else {
              shipUnit.classList.add("ship-start-horizontal");
            }
          } else if (isShipEnd) {
            if (board[i][j].direction === "vertical") {
              shipUnit.classList.add("ship-end-vertical");
            } else {
              shipUnit.classList.add("ship-end-horizontal");
            }
          } else {
            if (board[i][j].direction === "vertical") {
              shipUnit.classList.add("ship-middle-vertical");
            } else {
              shipUnit.classList.add("ship-middle-horizontal");
            }
          }

          if (!fleetSquares[i][j].hasChildNodes()) {
            fleetSquares[i][j].appendChild(shipUnit);
          }
        }
      }
    }
  }
  function isShipStart(board, row, col) {
    return (
      (row === 0 ||
        board[row - 1][col] === null ||
        board[row - 1][col] !== board[row][col]) &&
      (col === 0 ||
        board[row][col - 1] === null ||
        board[row][col - 1] !== board[row][col])
    );
  }
  function isShipEnd(board, row, col) {
    return (
      (row === 9 ||
        board[row + 1][col] === null ||
        board[row + 1][col] !== board[row][col]) &&
      (col === 9 ||
        board[row][col + 1] === null ||
        board[row][col + 1] !== board[row][col])
    );
  }
  function loadPlayerSelectionPage() {
    const parser = new DOMParser();
    const playerAndComputer = document.createElement("div");
    playerAndComputer.classList.add("player-and-computer-selection");
    const player = document.createElement("div");
    player.classList.add("player-selection");
    const computer = document.createElement("div");
    computer.classList.add("computer-selection");

    const playerHeading = document.createElement("h2");
    playerHeading.textContent = "Play against another player";
    const computerHeading = document.createElement("h2");
    computerHeading.textContent = "Play against AI";

    const playerBtn = document.createElement("div");
    playerBtn.classList.add("player-button");
    const playerSvgString = `<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 32 32" xml:space="preserve">
<style type="text/css">
	.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
</style>
<path d="M11.5,28H2.2c0.6-2,2.2-3.5,4.2-4.1c2.7-0.7,4.5-3.1,4.5-5.8c0-0.4-0.2-0.7-0.5-0.9C9,16.4,8.1,14.7,8,12.9
	c0-0.7,0.5-1.4,1.2-1.6l1.1-0.4c0.4-0.1,0.7-0.5,0.7-0.9V6.8c1.8,2.5,4.4,4.2,7.3,4.9C18.1,12.1,18,12.5,18,13c0,1.8-1,3.4-2.5,4.3
	c-0.3,0.2-0.5,0.5-0.5,0.9c0,1.7,0.8,3.3,2,4.4c1.5-0.2,2.9-0.3,4.3-0.1c-0.5-0.2-0.9-0.4-1.4-0.5c-1.6-0.4-2.7-1.7-2.9-3.2
	c1.8-1.3,3-3.4,3-5.7c0-0.6,0.4-1,1-1c0.6,0,1-0.4,1-1V8.7c0-3.4-2.5-6.3-5.8-6.7c-2-0.2-4,0.5-5.4,2C9.8,3.9,8.9,4.2,8,4.9
	C6.7,5.8,6,7.3,6,9v3.8c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0.1,2.2,1.2,4.3,2.9,5.6c-0.2,1.6-1.4,2.9-3,3.3
	c-3,0.8-5.2,3.1-5.8,6.1c-0.1,0.5,0,0.9,0.3,1.3C0.8,29.8,1.2,30,1.7,30h10.2C11.3,29.5,11.2,28.6,11.5,28z"/>
<path d="M26,20c-1.2,0-2.3,0.3-3.3,1h-4.4c-1-0.7-2.1-1-3.3-1c-3.3,0-6,2.7-6,6s2.7,6,6,6c1.2,0,2.3-0.3,3.3-1h4.4
	c1,0.7,2.1,1,3.3,1c3.3,0,6-2.7,6-6S29.3,20,26,20z M17,27h-1v1c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1h-1c-0.6,0-1-0.4-1-1s0.4-1,1-1h1v-1
	c0-0.6,0.4-1,1-1s1,0.4,1,1v1h1c0.6,0,1,0.4,1,1S17.6,27,17,27z M25.7,27.7c-0.1,0.1-0.2,0.2-0.3,0.2C25.3,28,25.1,28,25,28
	c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.2-0.2-0.3S24,27.1,24,27
	c0-0.3,0.1-0.5,0.3-0.7c0.3-0.3,0.7-0.4,1.1-0.2c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.2,0.3,0.4,0.3,0.7C26,27.3,25.9,27.5,25.7,27.7z
	 M28,25.2c0,0.1,0,0.1-0.1,0.2c0,0.1,0,0.1-0.1,0.2c0,0-0.1,0.1-0.1,0.1C27.5,25.9,27.3,26,27,26c-0.1,0-0.1,0-0.2,0
	c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1-0.1-0.2-0.1c0,0-0.1-0.1-0.1-0.1C26.1,25.5,26,25.3,26,25c0-0.3,0.1-0.5,0.3-0.7
	c0.4-0.4,1-0.4,1.4,0c0,0,0.1,0.1,0.1,0.1c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0,0.1,0.1,0.2c0,0.1,0,0.1,0,0.2S28,25.1,28,25.2z"/>
</svg>`;
    const playerSvg = parser.parseFromString(
      playerSvgString,
      "image/svg+xml"
    ).documentElement;

    const computerBtn = document.createElement("div");
    computerBtn.classList.add("computer-button");
    const computerSvgString = `<svg fill="#000000" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<polygon points="466.943,444.488 466.943,389.901 45.057,389.901 45.057,444.488 212.175,444.488 212.175,478.552 
			169.652,478.552 169.652,512 342.346,512 342.346,478.552 299.823,478.552 299.823,444.488 		"/>
	</g>
</g>
<g>
	<g>
		<path d="M272.724,0v78.578l10.741-4.649l24.532-65.324C297.144,4.226,285.349,1.339,272.724,0z"/>
	</g>
</g>
<g>
	<g>
		<path d="M204.002,8.605l24.532,65.324l10.741,4.649V0C226.65,1.339,214.855,4.226,204.002,8.605z"/>
	</g>
</g>
<g>
	<g>
		<path d="M202.213,98.984l-27.457-73.115c-6.762,5.54-12.916,11.905-18.398,19.093c-3.249,4.261-6.219,8.792-8.952,13.534
			l28.265,60.554l-30.31,14.148l-14.443-30.941c-2.849,13.241-4.305,27.417-4.305,42.329c0,81.661,44.594,168.655,112.66,181.066
			v-41.126h-18.539v-33.448h18.54V115.027L202.213,98.984z M189.103,207.577c-11.38,0-20.605-9.225-20.605-20.605
			c0-11.38,9.225-20.605,20.605-20.605s20.605,9.225,20.605,20.605C209.709,198.352,200.483,207.577,189.103,207.577z"/>
	</g>
</g>
<g>
	<g>
		<path d="M380.614,100.277l-15.366,32.921l-30.31-14.148l28.88-61.872c-2.522-4.26-5.231-8.352-8.177-12.216
			c-5.482-7.188-11.636-13.554-18.398-19.093l-27.458,73.115l-37.062,16.043v136.051h18.54v33.448h-18.54v41.127
			c68.065-12.412,112.66-99.405,112.66-181.066C385.383,128.922,383.753,114.087,380.614,100.277z M322.896,207.577
			c-11.38,0-20.605-9.225-20.605-20.605c0-11.38,9.225-20.605,20.605-20.605c11.38,0,20.605,9.225,20.605,20.605
			C343.503,198.352,334.276,207.577,322.896,207.577z"/>
	</g>
</g>
<g>
	<g>
		<path d="M418.788,149.348c-0.904,49.23-15.766,99.245-41.09,137.92c-23.784,36.324-54.795,60.098-89.419,69.185h178.663V149.348
			H418.788z"/>
	</g>
</g>
<g>
	<g>
		<path d="M134.302,287.268c-25.325-38.675-40.187-88.691-41.09-137.92H45.057v207.105h178.663
			C189.097,347.366,158.086,323.592,134.302,287.268z"/>
	</g>
</g>
</svg>`;
    const computerSvg = parser.parseFromString(
      computerSvgString,
      "image/svg+xml"
    ).documentElement;
    playerBtn.appendChild(playerSvg);
    computerBtn.appendChild(computerSvg);
    player.appendChild(playerHeading);
    player.appendChild(playerBtn);
    computer.appendChild(computerHeading);
    computer.appendChild(computerBtn);
    playerAndComputer.appendChild(player);
    playerAndComputer.appendChild(computer);
    domQueries.mainBody.appendChild(playerAndComputer);
  }
  function loadGame() {
    renderDOM.renderBoards();
    renderDOM.renderPlayerHeading();
    renderDOM.updateBoard(states.getPlayerOneFleetBoard(), null);
    domQueries.attackBoardContainer.classList.remove("hidden");
    addEventListeners.addAttackBoardEventListeners();
    states.setCurrentTurn("playerOne");
  }
  function renderExplosion(square) {
    square.classList.add("explosion");
    setTimeout(() => {
      square.classList.remove("explosion");
    }, 1000);
  }
  function renderMissedAttack(square) {
    square.classList.add("miss-animation");
    setTimeout(() => {
      square.classList.remove("miss-animation");
    }, 1000);
  }
  function updateAttackBoard(fleetBoard, attackBoard) {
    const attackSquares = domQueries.attackSquares;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        attackSquares[i][j].classList.remove("hit");
        attackSquares[i][j].classList.remove("miss");
        attackSquares[i][j].classList.remove("temp-disabled");
        attackSquares[i][j].classList.remove("ship-sunk");
        if (attackBoard[i][j] === true) {
          if (fleetBoard[i][j].isSunk()) {
            attackSquares[i][j].classList.add("ship-sunk");
            attackSquares[i][j].classList.add("temp-disabled");
          } else {
            attackSquares[i][j].classList.add("hit");
            attackSquares[i][j].classList.add("temp-disabled");
          }
        } else if (attackBoard[i][j] === false) {
          attackSquares[i][j].classList.add("miss");
          attackSquares[i][j].classList.add("temp-disabled");
        }
      }
    }
  }
  function renderAttackMessage(message) {
    domQueries.attackMessageContainer.classList.remove("hidden");
    if (message === true) {
      domQueries.attackMessageContainer.classList.add("hit-message");
      domQueries.attackMessage.textContent = "Hit!";
    } else if (message === false) {
      domQueries.attackMessageContainer.classList.add("miss-message");
      domQueries.attackMessage.textContent = "Miss";
    } else if (message === "sunk") {
      domQueries.attackMessageContainer.classList.add("sunk-message");
      domQueries.attackMessage.textContent = "Sunk!";
    }
  }
  function endGame() {
    domQueries.boardsContainer.classList.add("disabled");

    const gameOverDisplay = document.createElement("modal");
    gameOverDisplay.classList.add("game-over-display");
    const headingContainer = document.createElement("div");
    headingContainer.classList.add("game-over-heading-container");
    const gameOverHeading = document.createElement("h1");
    gameOverHeading.classList.add("game-over-heading");
    gameOverHeading.textContent = "Game Over";
    const newGameBtn = document.createElement("button");
    newGameBtn.classList.add("play-again-button");
    newGameBtn.textContent = "Play Again";
    headingContainer.appendChild(gameOverHeading);
    gameOverDisplay.appendChild(headingContainer);
    gameOverDisplay.appendChild(newGameBtn);
    domQueries.mainBody.appendChild(gameOverDisplay);
    addEventListeners.addGameOverDisplayListeners();
  }
  return {
    endGame,
    renderAttackMessage,
    renderMissedAttack,
    renderExplosion,
    clearPage,
    createBoard,
    renderBoards,
    renderBoardMenu,
    renderShipYard,
    createShips,
    clearBoard,
    updateBoard,
    isShipStart,
    isShipEnd,
    loadPlayerSelectionPage,
    loadGame,
    renderPlayerHeading,
    updateAttackBoard,
  };
})();

export { domQueries, renderDOM };
