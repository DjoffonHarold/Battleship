import Ship from "../src/Ship";


describe('Ship', () => {
    test('should create a ship with the correct length', () => {
        const ship = new Ship(4);
        expect(ship.length).toBe(4);
        expect(ship.hits).toBe(0);
    });

    test('should register a hit', () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('should sink the ship when hits equal length', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    test('should not sink the ship when hits are less than length', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });
});
