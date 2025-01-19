import { GameBoard } from "./gameBoard.js";

class Player {
  constructor(playerType) {
    this._playerType = playerType;
    this._playerBoard = new GameBoard();
  }

  get playerType() {
    return this._playerType;
  }

  get playerBoard() {
    return this._playerBoard;
  }
}

export { Player };
