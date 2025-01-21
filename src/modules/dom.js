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
    return document.querySelectorAll(".attack-square");
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
  get boardAndShips() {
    return document.querySelector(".board-and-ships");
  },
  get ships() {
    return document.querySelectorAll(".shipyard > div");
  },
  get shipUnits() {
    return document.querySelectorAll(".ship-unit");
  },
};

const renderDOM = (function () {
  const mainBody = document.querySelector("main");
  function clearPage() {
    mainBody.innerHTML = "";
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
  function renderBoards() {
    const boardsContainer = document.createElement("div");
    boardsContainer.classList.add("boards-container");
    const fleetBoardContainer = document.createElement("div");
    fleetBoardContainer.classList.add("fleet-board-container");
    const attackBoardContainer = document.createElement("div");
    attackBoardContainer.classList.add("attack-board-container");
    const boardAndShips = document.createElement("div");
    boardAndShips.classList.add("board-and-ships");

    boardAndShips.appendChild(createBoard("fleet"));
    attackBoardContainer.appendChild(createBoard("attack"));

    fleetBoardContainer.appendChild(boardAndShips);
    boardsContainer.appendChild(fleetBoardContainer);
    boardsContainer.appendChild(attackBoardContainer);
    mainBody.appendChild(boardsContainer);
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

    boardMenu.appendChild(clearBtn);
    boardMenu.appendChild(confirmBtn);

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
  function updateBoard(board) {
    clearBoard();
    const fleetSquares = domQueries.fleetSquares;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] !== null) {
          const shipUnit = document.createElement("div");
          const target = document.createElement("div");
          target.classList.add("target");
          shipUnit.appendChild(target);

          const isShipStart = renderDOM.isShipStart(board, i, j);
          const isShipEnd = renderDOM.isShipEnd(board, i, j);

          if (isShipStart) {
            shipUnit.classList.add("ship-start");
          } else if (isShipEnd) {
            shipUnit.classList.add("ship-end");
          } else {
            shipUnit.classList.add("ship-middle");
          }

          fleetSquares[i][j].appendChild(shipUnit);
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
  return {
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
  };
})();

export { domQueries, renderDOM };
