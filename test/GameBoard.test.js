import { GameBoard } from "../src/modules/gameBoard.js";
import { Ship } from "../src/modules/ship.js";

test("Testing GameBoard Class", () => {
  const gameBoard = new GameBoard();
  const cruiser = new Ship(5);
  const destroyer = new Ship(2);

  gameBoard.placeShip(cruiser, [
    [4, 0],
    [0, 0],
  ]);
  for (let i = 0; i < cruiser.length; i++) {
    expect(gameBoard._board[i][0]).toEqual(cruiser);
  }

  expect(gameBoard.receiveAttack([4, 0])).toBeTruthy();
  gameBoard.receiveAttack([4, 0]);
  gameBoard.receiveAttack([4, 0]);
  gameBoard.receiveAttack([4, 0]);
  gameBoard.receiveAttack([4, 0]);
  expect(gameBoard.allShipsSunk()).toBeTruthy();
});
