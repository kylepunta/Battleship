const renderDOM = (function () {
  const mainBody = document.querySelector("main");
  function clearPage() {
    mainBody.innerHTML = "";
  }
  function createBoard() {
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
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
    fleetBoardContainer.appendChild(createBoard());
    attackBoardContainer.appendChild(createBoard());
    boardsContainer.appendChild(fleetBoardContainer);
    boardsContainer.appendChild(attackBoardContainer);
    mainBody.appendChild(boardsContainer);
  }
  function renderBoardMenu() {
    const fleetBoardContainer = document.querySelector(
      ".fleet-board-container"
    );
    const boardMenu = document.createElement("div");
    boardMenu.classList.add("board-menu");

    const selectBtn = document.createElement("button");
    selectBtn.classList.add("select-button");
    selectBtn.textContent = "Select";
    const rotateBtn = document.createElement("button");
    rotateBtn.classList.add("rotate-button");
    rotateBtn.textContent = "Rotate";
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("clear-button");
    clearBtn.textContent = "Clear";
    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("confirm-button");
    confirmBtn.textContent = "Confirm";

    boardMenu.appendChild(selectBtn);
    boardMenu.appendChild(rotateBtn);
    boardMenu.appendChild(clearBtn);
    boardMenu.appendChild(confirmBtn);

    fleetBoardContainer.appendChild(boardMenu);
  }
  return { clearPage, createBoard, renderBoards, renderBoardMenu };
})();

export { renderDOM };
