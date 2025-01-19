import { Player } from "../src/modules/player.js";

test("Testing Player Class", () => {
  const playerOne = new Player("Kyle", "Real");
  console.log("Player One Board:", playerOne._playerBoard);
});
