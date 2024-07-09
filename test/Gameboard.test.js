import Ship from "../src/Ship";
import Gameboard from "../src/Gameboard";

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should place a ship at the specified coordinates', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship, [0, 0], 'horizontal');
        expect(gameboard.board[0][0]).toBe(ship);
        expect(gameboard.board[0][1]).toBe(ship);
        expect(gameboard.board[0][2]).toBe(ship);
    });

    test('should register a hit on the correct ship', () => {
        const ship = new Ship(3);
        gameboard.placeShip(ship, [0, 0], 'horizontal');
        gameboard.receiveAttack([0, 0]);
        expect(ship.hits).toBe(1);
    });

    test('should register a missed attack', () => {
        gameboard.receiveAttack([1, 1]);
        expect(gameboard.missedAttacks).toContainEqual([1, 1]);
    });

    test('should report all ships as sunk', () => {
        const ship1 = new Ship(1);
        const ship2 = new Ship(1);
        gameboard.placeShip(ship1, [0, 0], 'horizontal');
        gameboard.placeShip(ship2, [1, 0], 'horizontal');
        gameboard.receiveAttack([0, 0]);
        gameboard.receiveAttack([1, 0]);
        expect(gameboard.areAllSunk()).toBe(true);
    });

    test('should report not all ships as sunk', () => {
        const ship1 = new Ship(1);
        const ship2 = new Ship(1);
        gameboard.placeShip(ship1, [0, 0], 'horizontal');
        gameboard.placeShip(ship2, [1, 0], 'horizontal');
        gameboard.receiveAttack([0, 0]);
        expect(gameboard.areAllSunk()).toBe(false);
    });
});
