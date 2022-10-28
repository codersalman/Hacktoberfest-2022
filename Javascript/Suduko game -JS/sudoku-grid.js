import {build} from './sudoku-grid-builder';

export default class SudokuGrid {
  constructor(id='grid-container') {
    this.grid = build(id);
    this.peers = this.grid.peers;
    this.squares = this.grid.squares;
  }

  fillClues(clues) {
    for (let [s, d] of clues) {
      let clue = [...d][0];
      let square = this.squares.get(s.toLowerCase());

      if (clue === '0' || clue === '.') {
        square.innerHTML = '';
      } else {
        square.classList.add('clue');
        square.innerHTML = clue;
      }
    }
  }

  setSquareValue(value, puzzle) {
    if (this.highlightedSquare) {
      puzzle.set(this.highlightedSquare.id.toUpperCase(), new Set(value));
      this.highlightedSquare.innerHTML = value;
    }
  }

  highlightSquare(square) {
    if (!square.classList.contains('clue')) {
      if (this.highlightedSquare) {
        this.highlightedSquare.classList.remove('focused-content');
        this.highlightedSquare.classList.remove('highlight');
      }

      this.highlightedSquare = square;
      this.highlightedSquare.classList.add('focused-content');
    }
  }

  highlightPeers(square) {
    if (!this.squares.get(square).classList.contains('clue')) {
      if (this.highlightedPeers) {
        this.highlightedPeers.forEach(p => {
          if (p.id !== square) p.classList.remove('highlight');
        });
      }

      this.highlightedPeers = this.peers.get(square);
      this.highlightedPeers.forEach(p => p.classList.add('highlight'));
    }
  }
}