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

  placeShip(ship, coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      console.log("placing ship...");
      const [x, y] = coordinates[i];
      this._board[x][y] = ship;
      console.log(this._board[x][y]);
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
