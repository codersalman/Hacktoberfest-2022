const rows = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
const cols = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
const lowerCaseRows = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

export function getRows() {
  return rows;
}

export function getLowerCaseRows() {
  return lowerCaseRows;
}

export function getCols() {
  return cols
}

export function getSquares() {
  return cross(rows, cols);
}

export function getUnitList() {
  return [...cols].map(c => cross(rows, new Set(c)))
      .concat([...rows].map(r => cross(new Set(r), cols)))
      .concat((() => {
        let u = [];
        [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']].forEach(r => {
          [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']].forEach(c => {
            u.push(cross(new Set(r), new Set(c)))
          })
        });

        return u;
      })());
}

export function getUnits(squares, unitlist) {
  let units = new Map();
  [...squares].forEach(s => units.set(s, unitlist.filter(u => u.has(s))));

  return units;
}

export function getPeers(squares, units) {
  let peers = new Map();

  [...squares].forEach(s => {
    let p = units.get(s);
    peers.set(s, new Set(
        [...new Set([...p[0], ...p[1], ...p[2]])].filter(x => x !== s)));
  });

  return peers;
}

export function cross(a, b) {
  let c = new Set();

  for (let a1 of a.values()) {
    for (let b1 of b.values() || b) {
      c.add(a1 + b1);
    }
  }

  return c;
}

export function some(seq, func) {
  for (let d of seq) {
    let result = func(d);
    if (result) return result;
  }

  return false;
}

/**
 * Fisher-Yates Shuffle
 * See http://bit.ly/2gMXijX
 */
export function shuffle(seq) {
  let array = [...seq];
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function all(values) {
  for (let v of values)
    if (!v) return false;

  return true;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}