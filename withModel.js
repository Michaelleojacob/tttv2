class View {
  constructor() {
    this.domGrid = document.querySelector('.board');
    this.domGrid.addEventListener('click', this.handleGridClick);
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
  handleGridClick(e) {
    console.log(e.target.getAttribute('data-index'));
  }
  displayTurn(currentPlayer, player1, player2) {
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

class Model {
  constructor(
    player1Instance = new Player(null, 'x', true),
    player2Instance = new Player(null, 'o', false),
    gameInstance = new TicTacToe(),
    viewInstance = new View()
  ) {
    this.player1 = player1Instance;
    this.player2 = player2Instance;
    this.game = gameInstance;
    this.view = viewInstance;
    this.view.displayGrid(this.game.board);
    this.view.displayTurn(this.game.getTurn, this.player1, this.player2);
  }
}

const player1 = new Player('migs', 'x', true);
const player2 = new Player('josh', 'o', false);
const modelGame = new Model(player1, player2);
