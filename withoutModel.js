class View {
  constructor() {
    this.domGrid = document.querySelector('.board');
    // this.domGrid.addEventListener('click', this.handleGridClick);
    this.currentPlayer = document.querySelector('.playerTurn');
  }
  clearGrid() {
    while (this.domGrid.firstChild) {
      this.domGrid.removeChild(this.domGrid.lastChild);
    }
  }
  displayGrid(arr) {
    this.clearGrid();
    arr.forEach((tile, index) => {
      const cell = document.createElement('div');
      cell.textContent = tile || 'null';
      cell.setAttribute('data-index', index);
      this.domGrid.appendChild(cell);
    });
  }
  // handleGridClick() {
  // console.log(e.target.getAttribute('data-index'));
  // }
  handleTurnText(currentPlayer, player1, player2) {
    this.currentPlayer.textContent = currentPlayer
      ? `${player1.name} - ${player1.symb}`
      : `${player2.name} - ${player2.symb}`;
  }
}

class Player {
  constructor(name, symb, isPlayerOne) {
    this.name = name;
    this.symb = symb;
    this.isPlayerOne = isPlayerOne;
  }
}

class TicTacToe {
  constructor(turn = true) {
    this.board = Array(9).fill(null);
    this.isPlayerOneTurn = turn;
  }
  changeTurn() {
    this.isPlayerOneTurn = !this.isPlayerOneTurn;
  }
  move(player, tileIndex) {
    if (this.board[tileIndex] !== null) return false;
    if (player.isPlayerOne && this.isPlayerOneTurn) {
      this.board[tileIndex] = player.symb;
      this.changeTurn();
      return true;
    } else if (!player.isPlayerOne && !this.isPlayerOneTurn) {
      this.board[tileIndex] = player.symb;
      this.changeTurn();
      return true;
    }
    return false;
  }
  get getTurn() {
    return this.isPlayerOneTurn;
  }
  get getBoard() {
    return this.board;
  }
}

/**
 * sample game
 */

const game = new TicTacToe();

const player1 = new Player('migs', 'x', true);
const player2 = new Player('josh', 'o', false);

game.move(player1, 4);
game.move(player2, 4);
game.move(player2, 1);
console.log(game.getBoard);

const domView = new View();
domView.displayGrid(game.board);
domView.handleTurnText(game.getTurn, player1, player2);

/**
 * handling the click event
 */

const board = document.querySelector('.board');
board.addEventListener('click', (e) => {
  const currentPlayer = game.getTurn ? player1 : player2;
  game.move(currentPlayer, e.target.getAttribute('data-index'));
  domView.displayGrid(game.board);
  domView.handleTurnText(game.getTurn, player1, player2);
});
