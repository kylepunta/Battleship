import { Ship } from "../src/modules/ship.js";

test("Testing Ship Class", () => {
  const battleship = new Ship(0);
  const cruiser = new Ship(8);

  expect(battleship.length).toBe(2);
  expect(cruiser.length).toBe(5);

  expect(battleship.isSunk()).toBeFalsy();

  for (let i = 0; i < 10; i++) {
    battleship.hit();
  }
  expect(battleship.numberOfHits).toBe(2);
  for (let i = 0; i < 10; i++) {
    cruiser.hit();
  }
  expect(cruiser.numberOfHits).toBe(5);

  expect(battleship.isSunk()).toBeTruthy();
  expect(cruiser.isSunk()).toBeTruthy();
});
