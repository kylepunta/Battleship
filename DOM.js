import { gameState } from "./main.js";

const DOMQueries = {
  get attackBoardContainers() {
    return document.querySelectorAll(".attack-board");
  },
  get fleetBoardContainers() {
    return document.querySelectorAll(".fleet-board");
  },
  get attackBoards() {
    return document.querySelectorAll(".attack-board > .board");
  },
  get fleetBoards() {
    return document.querySelectorAll(".fleet-board > .board");
  },
  get playerOneBoards() {
    return document.querySelector(".player-one-boards");
  },
  get playerTwoBoards() {
    return document.querySelector(".player-two-boards");
  },
  get playerFormSection() {
    return document.querySelector(".player-form-section");
  },
  get boards() {
    return document.querySelectorAll(".board");
  },
  get ships() {
    return document.querySelectorAll(".ship");
  },
  get carriers() {
    return document.querySelectorAll(".carrier-svg");
  },
  get battleships() {
    return document.querySelectorAll(".battleship-svg");
  },
  get cruisers() {
    return document.querySelectorAll(".cruiser-svg");
  },
  get submarines() {
    return document.querySelectorAll(".submarine-svg");
  },
  get destroyers() {
    return document.querySelectorAll(".destroyer-svg");
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
  get playerOneFleetSquares() {
    return document.querySelectorAll(".player-one-boards .fleet-square");
  },
  get playerTwoFleetSquares() {
    return document.querySelectorAll(".player-two-boards .fleet-square");
  },
  get rotateButtons() {
    return document.querySelectorAll(".rotate > div:last-child");
  },
  get shipContainers() {
    return document.querySelectorAll(".fleet-section > div");
  },
  get playerOneHeading() {
    return document.querySelector(".player-one-heading");
  },
  get playerTwoHeading() {
    return document.querySelector(".player-two-heading");
  },
};

const DOMState = (function () {
  let playerOneActiveShip = null;
  let playerTwoActiveShip = null;
  let playerOneShipPlacementDirection = "vertical";
  let playerTwoShipPlacementDirection = "vertical";
  return {
    getPlayerOneActiveShip: () => playerOneActiveShip,
    setPlayerOneActiveShip: (ship) => (playerOneActiveShip = ship),
    getPlayerTwoActiveShip: () => playerTwoActiveShip,
    setPlayerTwoActiveShip: (ship) => (playerTwoActiveShip = ship),
    getPlayerOneShipPlacementDirection: () => playerOneShipPlacementDirection,
    setPlayerOneShipPlacementDirection: (direction) =>
      (playerOneShipPlacementDirection = direction),
    getPlayerTwoShipPlacementDirection: () => playerTwoShipPlacementDirection,
    setPlayerTwoShipPlacementDirection: (direction) =>
      (playerTwoShipPlacementDirection = direction),
  };
})();

const renderDOM = (function () {
  function renderBoards() {
    DOMQueries.attackBoardContainers.forEach((attackBoardContainer, index) => {
      const heading = document.createElement("h2");
      heading.textContent = "Attacks";
      const board = document.createElement("div");
      board.classList.add("board");
      board.dataset.player = index + 1;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const square = document.createElement("div");
          square.classList.add("square");
          square.classList.add("attack-square");
          square.dataset.row = i;
          square.dataset.col = j;
          board.appendChild(square);
        }
      }
      attackBoardContainer.appendChild(heading);
      attackBoardContainer.appendChild(board);
    });
    DOMQueries.fleetBoardContainers.forEach((fleetBoardContainer, index) => {
      const heading = document.createElement("h2");
      heading.textContent = "Current Fleet";
      const board = document.createElement("div");
      board.classList.add("board");
      board.dataset.player = index + 1;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const square = document.createElement("div");
          square.classList.add("square");
          square.classList.add("fleet-square");
          square.dataset.row = i;
          square.dataset.col = j;
          board.appendChild(square);
        }
      }
      fleetBoardContainer.appendChild(heading);
      fleetBoardContainer.appendChild(board);
    });
  }
  function renderPlayerForms() {
    for (let i = 0; i < 2; i++) {
      const formHeading = document.createElement("h3");
      formHeading.classList.add("form-heading");
      switch (i) {
        case 0:
          formHeading.textContent = "Player One";
          break;
        case 1:
          formHeading.textContent = "Player Two";
          break;
      }
      const form = document.createElement("form");

      const nameSection = document.createElement("div");
      nameSection.classList.add("name-section");
      const nameLabel = document.createElement("label");
      nameLabel.textContent = "Enter Name:";
      const nameInput = document.createElement("input");
      nameInput.classList.add("name-input");

      const playerTypeSection = document.createElement("div");
      playerTypeSection.classList.add("player-type-section");
      const playerTypeLabel = document.createElement("label");
      playerTypeLabel.textContent = "Enter Player Type:";
      const playerTypeSelect = document.createElement("select");
      playerTypeSelect.classList.add("player-type-select");
      const real = document.createElement("option");
      real.textContent = "Real";
      real.setAttribute("value", "real");
      const computer = document.createElement("option");
      computer.textContent = "Computer";
      computer.setAttribute("value", "computer");

      const buttonSection = document.createElement("div");
      buttonSection.classList.add("button-section");
      const enterPlayerBtn = document.createElement("button");
      enterPlayerBtn.textContent = "Enter Player";
      enterPlayerBtn.classList.add("enter-player-button");

      nameSection.appendChild(nameLabel);
      nameSection.appendChild(nameInput);

      playerTypeSelect.appendChild(real);
      playerTypeSelect.appendChild(computer);
      playerTypeSection.appendChild(playerTypeLabel);
      playerTypeSection.appendChild(playerTypeSelect);

      buttonSection.appendChild(enterPlayerBtn);

      form.appendChild(formHeading);
      form.appendChild(nameSection);
      form.appendChild(playerTypeSection);
      form.appendChild(buttonSection);
      DOMQueries.playerFormSection.appendChild(form);
    }
  }
  function renderShipSVGs() {
    const parser = new DOMParser();
    for (let i = 0; i < 10; i++) {
      const svgString = `<svg fill="#7C98DB" width="40px" height="40px" viewBox="0 0 512 512" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">


<g>

<rect class="st0" height="52.1" width="25.3" x="233.6" y="142.2"/>

<polygon class="st1" points="18.9,325.4 370.2,325.4 478.5,296.1 426.3,393.3 18.8,393.3  "/>

<rect class="st2" height="15" width="67.3" x="132.7" y="430.1"/>

<rect class="st2" height="15" width="15" x="102.7" y="430.1"/>

<rect class="st2" height="15" width="67.3" x="374.4" y="66.9"/>

<rect class="st2" height="15" width="15" x="344.4" y="66.9"/>

<polygon class="st1" points="177.6,209.3 314.9,209.3 314.9,227.3 256.1,227.3 256.1,242.3 358.8,242.3 358.8,260.2 314.9,260.2    314.9,310.4 177.6,310.4  "/>

<path class="st2" d="M402.4,301.2v-41h-28.5v-32.9h-43.9v-32.9h-56v-15.9h33v-15h-33v-36.2h-20.1v-15c21.8-3.6,38.4-22.5,38.4-45.3   h-15c0,17.1-13.9,30.9-30.9,30.9c-17.1,0-30.9-13.9-30.9-30.9h-15c0,22.8,16.7,41.7,38.4,45.3v15h-20.1v36.2h-33v15h33v15.9h-56   v32.9h-26.7v-25.8h-15v25.8H79.2v83.1H3.9l-0.1,97.8h431.4l73-135.8L402.4,301.2z M387.4,275.2v30l-19.1,5.2h-38.4v-35.2H387.4z    M233.6,142.2h25.3v52.1h-25.3V142.2z M177.6,209.3h137.3v17.9h-58.8v15h102.7v17.9h-43.9v50.2H177.6V209.3z M94.2,242.3h68.5v17.9   h-23.5v15h23.5v35.2H94.2V242.3z M370.2,366.8l82.2-22.3l-26.2,48.7H18.8l0.1-67.8h351.4l108.2-29.3l-16.3,30.3l-93.9,25.5H79.6v15   H370.2z"/>

<rect class="st3" height="15" width="15" x="226.1" y="227.3"/>

<rect class="st2" height="15" width="15" x="109.1" y="260.2"/>

<rect class="st3" height="15" width="15" x="49.6" y="351.8"/>

</g>

</svg>`;
      const shipSVG = parser.parseFromString(
        svgString,
        "image/svg+xml"
      ).documentElement;
      switch (i) {
        case 0:
          shipSVG.classList.add("carrier-svg");
          shipSVG.dataset.type = "carrier";
          break;
        case 1:
          shipSVG.classList.add("battleship-svg");
          shipSVG.dataset.type = "battleship";
          break;
        case 2:
          shipSVG.classList.add("cruiser-svg");
          shipSVG.dataset.type = "cruiser";
          break;
        case 3:
          shipSVG.classList.add("submarine-svg");
          shipSVG.dataset.type = "submarine";
          break;
        case 4:
          shipSVG.classList.add("destroyer-svg");
          shipSVG.dataset.type = "destroyer";
          break;
        case 5:
          shipSVG.classList.add("carrier-svg");
          shipSVG.dataset.type = "carrier";
          break;
        case 6:
          shipSVG.classList.add("battleship-svg");
          shipSVG.dataset.type = "battleship";
          break;
        case 7:
          shipSVG.classList.add("cruiser-svg");
          shipSVG.dataset.type = "cruiser";
          break;
        case 8:
          shipSVG.classList.add("submarine-svg");
          shipSVG.dataset.type = "submarine";
          break;
        case 9:
          shipSVG.classList.add("destroyer-svg");
          shipSVG.dataset.type = "destroyer";
          break;
      }
      DOMQueries.ships[i].appendChild(shipSVG);
    }
  }
  function highlightShipPlacement(activeShip, row, col, grid) {
    console.log("Highlighting ship placement for:", activeShip.type);
    const playerTurn = gameState.getCurrentTurn();
    clearHighlightedShips(activeShip);

    if (playerTurn === "playerOne") {
      if (DOMState.getPlayerOneShipPlacementDirection() === "vertical") {
        if (activeShip.length - 1 <= row) {
          console.log("Placing ship vertically...");
          console.log(`${activeShip.type}`);
          for (let i = row; i > row - activeShip.length; i--) {
            grid[i][col].classList.add(`${activeShip.type}`);
            console.log(grid[i][col]);
          }
        } else {
          for (let i = 0; i < activeShip.length; i++) {
            grid[i][col].classList.add(`${activeShip.type}`);
          }
        }
      } else if (
        DOMState.getPlayerOneShipPlacementDirection() === "horizontal"
      ) {
        if (col + activeShip.length <= 9) {
          for (let i = col; i < col + activeShip.length; i++) {
            grid[row][i].classList.add(`${activeShip.type}`);
            console.log(grid[row][i]);
          }
        } else {
          for (let i = 9; i > 9 - activeShip.length; i--) {
            grid[row][i].classList.add(`${activeShip.type}`);
          }
        }
      }
    } else if (playerTurn === "playerTwo") {
      if (DOMState.getPlayerTwoShipPlacementDirection() === "vertical") {
        if (activeShip.length - 1 <= row) {
          console.log("Placing ship vertically...");
          console.log(`${activeShip.type}`);
          for (let i = row; i > row - activeShip.length; i--) {
            grid[i][col].classList.add(`${activeShip.type}`);
            console.log(grid[i][col]);
          }
        } else {
          for (let i = 0; i < activeShip.length; i++) {
            grid[i][col].classList.add(`${activeShip.type}`);
          }
        }
      } else if (
        DOMState.getPlayerTwoShipPlacementDirection() === "horizontal"
      ) {
        if (col + activeShip.length <= 9) {
          for (let i = col; i < col + activeShip.length; i++) {
            grid[row][i].classList.add(`${activeShip.type}`);
            console.log(grid[row][i]);
          }
        } else {
          for (let i = 9; i > 9 - activeShip.length; i--) {
            grid[row][i].classList.add(`${activeShip.type}`);
          }
        }
      }
    }
  }
  function clearHighlightedShips(activeShip) {
    console.log("Clearing -> ", activeShip);
    if (activeShip !== null) {
      const currentTurn = gameState.getCurrentTurn();

      if (currentTurn === "playerOne") {
        const fleetSquares = DOMQueries.playerOneFleetSquares;
        fleetSquares.forEach((square) => {
          square.classList.remove(`${activeShip.type}`);
        });
      } else if (currentTurn === "playerTwo") {
        const fleetSquares = DOMQueries.playerTwoFleetSquares;
        fleetSquares.forEach((square) => {
          square.classList.remove(`${activeShip.type}`);
        });
      }
    }
  }
  function hidePlayerInterface(player) {
    if (player === "playerOne") {
      DOMQueries.playerOneHeading.classList.add("disabled");
    } else if (player === "playerTwo") {
      DOMQueries.playerTwoHeading.classList.add("disabled");
      DOMQueries.playerTwoBoards.classList.add("disabled");
      DOMQueries.shipContainers[1].classList.add("disabled");
    }
  }
  return {
    renderBoards,
    renderPlayerForms,
    renderShipSVGs,
    highlightShipPlacement,
    clearHighlightedShips,
    hidePlayerInterface,
  };
})();

export { DOMQueries, renderDOM, DOMState };
