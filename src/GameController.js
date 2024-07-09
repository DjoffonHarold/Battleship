import Player from './Player';
import Ship from './Ship';

const GameController = (() => {
  const player1 = new Player();
  const player2 = new Player(true);

  const setupBoard = (player) => {
    // Example of placing ships
    player.gameboard.placeShip(new Ship(5), [0, 0], 'horizontal');
    player.gameboard.placeShip(new Ship(4), [1, 0], 'horizontal');
    // Add more ships as needed
  };

  const renderBoard = (gameboard, container) => {
    container.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.coordinates = `${i},${j}`;
        container.appendChild(cell);
      }
    }
  };

  const handleCellClick = (event) => {
    const coordinates = event.target.dataset.coordinates.split(',').map(Number);
    player1.makeMove(player2.gameboard, coordinates);
    renderBoard(player2.gameboard, document.querySelector('#player2-board'));

    if (player2.gameboard.areAllSunk()) {
      alert('Player 1 wins!');
    } else {
      player2.makeRandomMove(player1.gameboard);
      renderBoard(player1.gameboard, document.querySelector('#player1-board'));

      if (player1.gameboard.areAllSunk()) {
        alert('Player 2 wins!');
      }
    }
  };

  const startGame = () => {
    setupBoard(player1);
    setupBoard(player2);

    renderBoard(player1.gameboard, document.querySelector('#player1-board'));
    renderBoard(player2.gameboard, document.querySelector('#player2-board'));

    document.querySelector('#player2-board').addEventListener('click', handleCellClick);
  };

  return {
    startGame
  };
})();

export default GameController;
