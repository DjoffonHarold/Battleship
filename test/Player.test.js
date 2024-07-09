import Ship from "../src/Ship";
import Gameboard from "../src/Gameboard";
import Player from "../src/Player";
describe('Player', () => {
    let player;
    let opponent;

    beforeEach(() => {
        player = new Player();
        opponent = new Player();
    });

    test('should make a move and hit opponent ship', () => {
        const ship = new Ship(1);
        opponent.gameboard.placeShip(ship, [0, 0], 'horizontal');
        player.makeMove(opponent.gameboard, [0, 0]);
        expect(ship.hits).toBe(1);
    });

    test('should make a move and miss', () => {
        player.makeMove(opponent.gameboard, [0, 0]);
        expect(opponent.gameboard.missedAttacks).toContainEqual([0, 0]);
    });

    test('computer should make a random move and hit or miss', () => {
        player = new Player(true); // Computer player
        player.makeRandomMove(opponent.gameboard);
        const allAttacks = opponent.gameboard.missedAttacks.concat(
            opponent.gameboard.ships.flatMap(ship => Array(ship.hits).fill(ship))
        );
        expect(allAttacks.length).toBe(1);
    });

    test('computer should not attack the same coordinates twice', () => {
        player = new Player(true); // Computer player
        const coordinates = [0, 0];
        player.makeMove(opponent.gameboard, coordinates);
        player.makeRandomMove(opponent.gameboard);
        expect(player.hasAlreadyAttacked(coordinates)).toBe(true);
    });
});
