
import {
  getCols,
  getSquares,
  getUnitList,
  getUnits,
  getPeers,
  some,
  shuffle,
  all,
  getRandomInt
} from './sudoku-grid-util';

const level = {
  easy: 28,
  medium: 37,
  hard: 45,
  master: 65
};

const digits = getCols();
const squares = getSquares();
const unitlist = getUnitList();

let units = getUnits(squares, unitlist);
let peers = getPeers(squares, units);

/**
 * Convert grid to a dict of possible values, {square: digits},
 * or return false if a contradiction is detected.
 */
function parseGrid(grid) {
  let values = new Map();
  squares.forEach(s => values.set(s, digits));

  for (let [s, d] of gridValues(grid).entries()) {
    if (digits.has(d) && !assign(values, s, d)) {
      return false;
    }
  }

  return values;
}

/**
 * Convert grid into a dict of {square: char} with '0' or '.' for empties.
 */
function gridValues(grid) {
  let chars = grid.filter(c => digits.has(c) || c === '0' || c === '.');
  let values = new Map();
  let s = [...squares];

  for (let i = 0; i < s.length; i++) {
    values.set(s[i], chars[i]);
  }

  return values;
}

/**
 * Eliminate all the other values (except d) from values[s] and propagate.
 * Return values, except return False if a contradiction is detected.
 */
function assign(values, s, d) {
  let others = [...values.get(s)].filter(x => x !== d);
  return all(others.map(d2 => eliminate(values, s, d2))) ? values : false;
}

/**
 * Eliminate d from values[s]; propagate when values or places <= 2.
 * Return values, except return False if a contradiction is detected.
 */
function eliminate(values, s, d) {
  if (!values.get(s).has(d))
    return values;

  values.set(s, new Set([...values.get(s)].filter(x => x !== d)));

  if (!values.get(s).size) {
    return false;

  } else if (values.get(s).size === 1) {
    let d2 = [...values.get(s)][0];

    if (!all([...peers.get(s)].map(s2 => eliminate(values, s2, d2))))
      return false;
  }

  for (let unit of units.get(s)) {
    let dplaces = [...unit].filter(s2 => values.get(s2).has(d));

    if (!dplaces.length) {
      return false;
    } else if (dplaces.length === 1) {
      if (!assign(values, dplaces[0], d))
        return false;
    }
  }

  return values;
}

function solve(grid) {
  return search(parseGrid(grid));
}

/**
 * Using depth-first search and propagation, try all possible values.
 */
function search(values) {
  if (!values)
    return false;

  if (all([...squares].map(s => values.get(s).size === 1)))
    return values;

  let s = [...squares]
      .filter(s => values.get(s).size > 1)
      .sort((s1, s2) => values.get(s1).size - values.get(s2).size)[0];

  return some(values.get(s), d => search(assign(new Map(values), s, d)));
}

/**
 * A puzzle is solved if each unit is a permutation of the digits 1 to 9.
 */
function solved(values) {
  function unitSolved(unit) {
    for (let s of unit) {
      let diff = [...values.get(s)].filter(d => !digits.has(d));
      if (diff.length > 0) return false;
    }

    return true;
  }

  return values && all(unitlist.map(u => unitSolved(u)));
}

/**
 * Make a random puzzle with N or more assignments. Restart on contradictions.
 * Note the resulting puzzle is not guaranteed to be solvable, but empirically
 * about 99.8% of them are solvable. Some have multiple solutions
 */
function randomPuzzle(n = 17) {
  let values = new Map();
  squares.forEach(s => values.set(s, digits));

  for (let s of shuffle(squares)) {
    if (!assign(values, s, randomValue(values.get(s)))) {
      break;
    }

    let ds = [...squares]
        .filter(s => values.get(s).size === 1)
        .map(s => values.get(s));

    if (ds.length >= n && new Set(ds).size >= 8) {
      return [...squares]
          .map(s => values.get(s).size === 1 ? [...values.get(s)][0] : '0');
    }
  }

  return randomPuzzle(n);
}

function randomValue(values) {
  return [...values][getRandomInt(0, values.size - 1)];
}

function isUnique(original, test) {
  for (let [s, d] of original) {
    if ([...test.get(s)][0] !== [...d][0]) return false;
  }

  return true;
}

/**
 * Iterate through the randomly shuffled squares.
 * After removing each square from the solution
 * solve it and test if it is the same as the original.
 * If the solution doesn't match undo the removal and
 * try another square.
 */
function createPuzzle(solution) {
  let puzzle = [];
  let indices = {};
  let shuffled = shuffle(squares);

  [...squares].forEach((s, i) => {
    puzzle.push([...solution.get(s)][0]);
    indices[s] = i;
  });

  let result = new Map();

  for (let i = 0; i < shuffled.length; i++) {
    let j = indices[shuffled[i]];
    let v = puzzle[j];
    puzzle[j] = '0';

    if (!isUnique(solution, solve(puzzle))) {
      puzzle[j] = v;
      result.set(shuffled[i], v);
    } else {
      result.set(shuffled[i], '0');
    }
  }

  return result;
}

export default {
  getGame: (difficulty = level.easy) => {
    let solution = solve(randomPuzzle(81 - difficulty));

    while (!solved(solution)) {
      solution = solve(randomPuzzle());
    }

    return {
      puzzle: createPuzzle(solution),
      solution: solution
    };
  }
}
