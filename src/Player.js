import Gameboard from './Gameboard';

export default class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  makeMove(opponentGameboard, coordinates) {
    opponentGameboard.receiveAttack(coordinates);
  }

  makeRandomMove(opponentGameboard) {
    let coordinates;
    do {
      coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } while (this.hasAlreadyAttacked(coordinates));
    this.makeMove(opponentGameboard, coordinates);
  }

  hasAlreadyAttacked(coordinates) {
    const [x, y] = coordinates;
    return this.gameboard.board[x][y] !== null || this.gameboard.missedAttacks.some(coord => coord[0] === x && coord[1] === y);
  }
}
