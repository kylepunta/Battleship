import { domQueries } from "./dom.js";
import { states } from "./state.js";

class GameBoard {
  constructor() {
    this._board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this._missedAttacks = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this._ships = 0;
    this._sunkShips = 0;
  }

  get board() {
    return this._board;
  }

  get missedAttacks() {
    return this._missedAttacks;
  }

  get ships() {
    return this._ships;
  }

  get sunkShips() {
    return this._sunkShips;
  }

  placeShip(ship, [row, col], unit) {
    console.log("placing ship...");
    console.log("Row", row);
    console.log("Col", col);
    if (ship.direction === "vertical") {
      switch (unit) {
        case 0:
          if (ship.length - 1 + row <= 9) {
            for (let i = row; i < row + ship.length; i++) {
              if (this._board[i][col] !== null) {
                return false;
              }
            }
            for (let i = row; i < row + ship.length; i++) {
              this._board[i][col] = ship;
            }
            return true;
          }
          break;
        case 1:
          if (row > 0 && row + ship.length - 2 <= 9) {
            for (let i = row - unit; i < row - 1 + ship.length; i++) {
              if (this._board[i][col] !== null) {
                return false;
              }
            }
            for (let i = row - unit; i < row - 1 + ship.length; i++) {
              this._board[i][col] = ship;
            }
            return true;
          }
          break;
        case 2:
          if (row > 1 && row + ship.length - 3 <= 9) {
            for (let i = row - unit; i < row - 2 + ship.length; i++) {
              if (this._board[i][col] !== null) {
                return false;
              }
            }
            for (let i = row - unit; i < row - 2 + ship.length; i++) {
              this._board[i][col] = ship;
            }
            return true;
          }
          break;
        case 3:
          if (row > 2 && row + ship.length - 4 <= 9) {
            for (let i = row - unit; i < row - 3 + ship.length; i++) {
              if (this._board[i][col] !== null) {
                return false;
              }
            }
            for (let i = row - unit; i < row - 3 + ship.length; i++) {
              this._board[i][col] = ship;
            }
            return true;
          }
          break;
        case 4:
          if (row - (ship.length - 1) >= 0) {
            for (let i = row; i > row - ship.length; i--) {
              if (this._board[i][col] !== null) {
                return false;
              }
            }
            for (let i = row; i > row - ship.length; i--) {
              this._board[i][col] = ship;
            }
            return true;
          }
          break;
      }
    } else if (ship.direction === "horizontal") {
      switch (unit) {
        case 0:
          if (ship.length - 1 + col <= 9) {
            for (let i = col; i < col + ship.length; i++) {
              if (this._board[row][i] !== null) {
                return false;
              }
            }
            for (let i = col; i < col + ship.length; i++) {
              this._board[row][i] = ship;
            }
            return true;
          }
          break;
        case 1:
          if (col > 0 && col + ship.length - 2 <= 9) {
            for (let i = col - unit; i < col - 1 + ship.length; i++) {
              if (this._board[row][i] !== null) {
                return false;
              }
            }
            for (let i = col - unit; i < col - 1 + ship.length; i++) {
              this._board[row][i] = ship;
            }
            return true;
          }
          break;
        case 2:
          if (col > 1 && col + ship.length - 3 <= 9) {
            for (let i = col - unit; i < col - 2 + ship.length; i++) {
              if (this._board[row][i] !== null) {
                return false;
              }
            }
            for (let i = col - unit; i < col - 2 + ship.length; i++) {
              this._board[row][i] = ship;
            }
            return true;
          }
          break;
        case 3:
          if (col > 2 && col + ship.length - 4 <= 9) {
            for (let i = col - unit; i < col - 3 + ship.length; i++) {
              if (this._board[row][i] !== null) {
                return false;
              }
            }
            for (let i = col - unit; i < col - 3 + ship.length; i++) {
              this._board[row][i] = ship;
            }
            return true;
          }
          break;
        case 4:
          if (col - (ship.length - 1) >= 0) {
            for (let i = col; i > col - ship.length; i--) {
              if (this._board[row][i] !== null) {
                return false;
              }
            }
            for (let i = col; i > col - ship.length; i--) {
              this._board[row][i] = ship;
            }
            return true;
          }
          break;
      }
    }
    return false;
  }

  receiveAttack([i, j]) {
    if (this._board[i][j] !== null) {
      const ship = this._board[i][j];
      ship.hit();
      this._missedAttacks[i][j] = true;
      console.log(
        `Ship was hit at coordinates ${i} ${j}`,
        this._missedAttacks[i][j]
      );
      return true;
    } else {
      this._missedAttacks[i][j] = false;
      console.log(
        `No ship at coordinates ${i} ${j}`,
        this._missedAttacks[i][j]
      );
      return false;
    }
  }

  allShipsSunk() {
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        if (this._board[i][j] !== null) {
          if (!this._board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return true;
  }

  clearBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this._board[i][j] = null;
      }
    }
  }
}

export { GameBoard };
