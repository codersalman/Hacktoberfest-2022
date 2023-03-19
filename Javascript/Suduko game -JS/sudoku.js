import generator from './sudoku-generator';
import SudokuGrid from './sudoku-grid';

export default class Sudoku {
  constructor() {
    this.game = generator.getGame();
    this.puzzle = this.game.puzzle;
    this.original = new Map(this.puzzle);
    this.solution = this.game.solution;

    this.grid = new SudokuGrid();
    this.grid.fillClues(this.puzzle);

    this.setKeyInputEvents();
    this.setBtnInputEvents();

    document.getElementById('reset').onclick = () => this.reset();
    document.getElementById('erase').onclick = () => this.erase();
  }

  reset() {
    this.puzzle = new Map(this.original);
    this.grid.fillClues(this.puzzle);
  }

  erase() {
    this.grid.setSquareValue('', this.puzzle);
  }

  setBtnInputEvents() {
    let grid = this.grid;
    let buttons = document.querySelectorAll('.number-btn');

    buttons.forEach(b => {
      b.onclick = () => {
        grid.setSquareValue(b.value, this.puzzle);
        if (this.solved()) Sudoku.displayMessage();
      }
    });
  }

  setKeyInputEvents() {
    let grid = this.grid;
    let squares = this.grid.squares;

    // Setup touch/click events for each square.
    for (let [s, el] of squares) {
      el.onclick = () => {
        grid.highlightSquare(el);
        grid.highlightPeers(s);
      }
    }

    // Input event
    document.onkeydown = (e) => {
      let value = e.key;
      let keycode = e.keyCode;

      if (keycode >= 49 && keycode <= 57) {
        grid.setSquareValue(value, this.puzzle);
        if (this.solved()) Sudoku.displayMessage()

      } else if (keycode === 8) {
        grid.setSquareValue('', this.puzzle);
      }
    }
  }

  solved() {
    for (let [s, d] of this.solution) {
      if ([...this.puzzle.get(s)][0] !== [...d][0]) return false;
    }

    return true;
  }

  static displayMessage() {
    window.alert(`Congratulations! You solved the puzzle.`)
  }
}