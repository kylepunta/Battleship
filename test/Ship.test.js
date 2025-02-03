import { Ship } from "../src/modules/ship.js";
import { GameBoard } from "../src/modules/gameBoard.js";
import { Player } from "../src/modules/player.js";

test("Testing Ship Class", () => {
  const carrier = new Ship("carrier", 5, "vertical");
  const battleship = new Ship("battleship", 4, "horizontal");
  const cruiser = new Ship("cruiser", 3, "vertical");
  const submarine = new Ship("submarine", 3, "horizontal");
  const destroyer = new Ship("destroyer", 2, "vertical");
  const ships = [carrier, battleship, cruiser, submarine, destroyer];

  const playerOne = new Player("Real");
  const gameBoard = playerOne._playerBoard;

  for (let i = 0; i < 5; i++) {
    let currentShip = ships.shift();
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    gameBoard.placeShip(currentShip, [row, col], 0);
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      gameBoard.receiveAttack([i, j]);
    }
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let ship = gameBoard._board[i][j];
      if (ship !== null) {
        expect(ship.isSunk()).toBeTruthy();
      }
    }
  }

  expect(gameBoard.allShipsSunk()).toBeTruthy();
});
