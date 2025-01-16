import { GameBoard } from "./GameBoard.js";

class Player {
  constructor(playerName, playerType) {
    this._playerName = playerName;
    this._playerType = playerType;
    this._playerBoard = new GameBoard();
  }
}

export { Player };
