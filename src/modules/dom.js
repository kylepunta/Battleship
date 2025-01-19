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
    return document.querySelectorAll(".fleet-square");
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
    const carrier = document.createElement("div");
    carrier.classList.add("carrier");
    const battleship = document.createElement("div");
    battleship.classList.add("battleship");
    const cruiser = document.createElement("div");
    cruiser.classList.add("cruiser");
    const submarine = document.createElement("div");
    submarine.classList.add("submarine");
    const destroyer = document.createElement("div");
    destroyer.classList.add("destroyer");

    for (let i = 0; i < 5; i++) {
      const shipUnit = document.createElement("div");
      shipUnit.classList.add("ship-unit");
      const target = document.createElement("div");
      target.classList.add("target");
      shipUnit.appendChild(target);
      carrier.appendChild(shipUnit);
    }
    for (let i = 0; i < 4; i++) {
      const shipUnit = document.createElement("div");
      shipUnit.classList.add("ship-unit");
      const target = document.createElement("div");
      target.classList.add("target");
      shipUnit.appendChild(target);
      battleship.appendChild(shipUnit);
    }
    for (let i = 0; i < 3; i++) {
      const shipUnit = document.createElement("div");
      shipUnit.classList.add("ship-unit");
      const target = document.createElement("div");
      target.classList.add("target");
      shipUnit.appendChild(target);
      cruiser.appendChild(shipUnit);
    }
    for (let i = 0; i < 3; i++) {
      const shipUnit = document.createElement("div");
      shipUnit.classList.add("ship-unit");
      const target = document.createElement("div");
      target.classList.add("target");
      shipUnit.appendChild(target);
      submarine.appendChild(shipUnit);
    }
    for (let i = 0; i < 2; i++) {
      const shipUnit = document.createElement("div");
      shipUnit.classList.add("ship-unit");
      const target = document.createElement("div");
      target.classList.add("target");
      shipUnit.appendChild(target);
      destroyer.appendChild(shipUnit);
    }

    return [carrier, battleship, cruiser, submarine, destroyer];
  }
  return {
    clearPage,
    createBoard,
    renderBoards,
    renderBoardMenu,
    renderShipYard,
    createShips,
  };
})();

export { domQueries, renderDOM };
