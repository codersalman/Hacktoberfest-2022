import {
  getLowerCaseRows,
  getCols,
  getSquares,
  getPeers, getUnits, getUnitList
} from "./sudoku-grid-util";

const n = 9;
const squareClass = 'col-1 square';
const contentClass = 'square-content';

let createRow = (cellSize) => {
  let row = document.createElement('div');
  row.setAttribute('class', 'row');
  row.style.height = `${cellSize}px`;

  return row;
};

let createSquare = (cellSize) => {
  let square = document.createElement('div');
  square.setAttribute('class', squareClass);

  square.style.height = `${cellSize}px`;
  square.style.width = `${cellSize}px`;
  square.style.maxWidth = `${cellSize}px`;
  square.style.flex = `0 0 ${cellSize}px`;

  return square;
};

let createSquareContent = (id) => {
  let content = document.createElement('div');
  content.id = id;
  content.setAttribute('class', contentClass);

  return content;
};

let toLowerCase = (squares) => {
  let result = new Map();
  for (let [s, d] of squares) {
    result.set(s.toLowerCase(), new Set([...d].map(d1 => d1.toLowerCase())));
  }

  return result;
};

export function build(id='grid-container') {
  let rows = [...getLowerCaseRows()];
  let cols = [...getCols()];

  let element = document.getElementById(id);
  let squares = new Map();
  let cellSize = element.offsetWidth ? (element.offsetWidth / n) - 3 : 50;

  for (let i = 0; i < n; i++) {
    let row = createRow(cellSize);

    for (let j = 0; j < n; j++) {
      let id = `${rows[i]}${cols[j]}`;
      let square = createSquare(cellSize);
      let content = createSquareContent(id);

      square.appendChild(content);
      row.appendChild(square);
      squares.set(id, content);
    }

    element.appendChild(row);
  }

  let s = getSquares();
  let u = getUnitList();
  let peerIds = toLowerCase(getPeers(s, getUnits(s, u)));
  let peers = new Map();

  for (let [s, p] of peerIds) {
    peers.set(s, [...p].map(x => squares.get(x)));
  }

  return {
    peers: peers,
    squares: squares
  };
}
