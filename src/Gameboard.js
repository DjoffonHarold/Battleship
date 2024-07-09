import Ship from './Ship';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.board = Array(10).fill().map(() => Array(10).fill(null)); // 10x10 board
  }

  placeShip(ship, coordinates, direction) {
    // Validate and place the ship on the board
    const [x, y] = coordinates;
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        this.board[x][y + i] = ship;
      } else {
        this.board[x + i][y] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(coordinates) {
    const [x, y] = coordinates;
    const target = this.board[x][y];
    if (target === null) {
      this.missedAttacks.push(coordinates);
    } else {
      target.hit();
    }
  }

  areAllSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}
