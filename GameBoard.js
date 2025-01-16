class GameBoard {
  constructor() {
    this._board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this._missedAttacks = Array(10)
      .fill()
      .map(() => Array(10).fill(false));
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

  placeShip(ship, [[i1, j1], [i2, j2]]) {
    if (i1 > i2 || j1 > j2) {
      [[i1, j1], [i2, j2]] = [
        [i2, j2],
        [i1, j1],
      ];
    }

    if (i1 === i2) {
      if (j2 - j1 != ship.length - 1) {
        throw new Error("Incorrect ship coordinates selected");
      }
    } else if (j1 === j2) {
      if (i2 - i1 != ship.length - 1) {
        throw new Error("Incorrect ship coordinates selected");
      }
    } else {
      throw new Error("Cannot place ships diagonally on the board");
    }

    if (i1 === i2) {
      for (let z = j1; z <= j2; z++) {
        this._board[i1][z] = ship;
      }
    } else if (j1 === j2) {
      for (let z = i1; z <= i2; z++) {
        this._board[z][j1] = ship;
      }
    }
  }

  receiveAttack([i, j]) {
    if (this._board[i][j] !== null) {
      const ship = this._board[i][j];
      ship.hit();
      return true;
    } else {
      this._missedAttacks[i][j] = true;
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
}

export { GameBoard };
