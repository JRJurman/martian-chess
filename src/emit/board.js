/* eslint-disable space-infix-ops, no-multi-spaces */

const INIT_BOARD = 'BOARD:INIT_BOARD';
const SELECT = 'BOARD:SELECT';
const DE_SELECT = 'BOARD:DE_SELECT';
const MOVE = 'BOARD:MOVE';

const PAWN = 'PAWN';
const DRONE = 'DRONE';
const QUEEN = 'QUEEN';

const UPDATE_TAPE = require('./historyTape').update;

/* generate highlights object based on paths */
const buildMoves = (state, key) => (pathLists) => {
  return pathLists
  /* stop sequential paths early if we run into pieces */
  .map( (coordList) => {
    // generate the first position we run into a piece (we can't jump over them)
    const stopIndex = coordList.reduce( (stopVar, coord, index) => {
      if (stopVar) { return stopVar; }

      const checkKey = [String.fromCharCode(coord[0]), coord[1]].join('');
      return (state.board.pieces[checkKey]) ? index+1 : stopVar;
    }, undefined);

    return coordList.slice(0, stopIndex);
  })

  /* join paths together to have one list of possible moves */
  .reduce( (paths, path) => paths.concat(path), [])

  /* return object of valid moves to highlight */
  .reduce( (highlights, coord) => {
    // translate numbers to chess notation
    const checkKey = [String.fromCharCode(coord[0]), coord[1]].join('');

    // if we hit a piece, it needs to be on the other board
    const diffSpace = Math.floor(parseInt(key[1], 10)/5) !== Math.floor(coord[1]/5);
    return Object.assign(
      {}, highlights,
      { [checkKey]: diffSpace || !state.board.pieces[checkKey] }
    );
  }, {});
}

const defaultBoard = {
  pieces: {
    a8: QUEEN,  b8: QUEEN,  c8: DRONE,
    a7: QUEEN,  b7: DRONE,  c7: PAWN,
    a6: DRONE,  b6: PAWN,   c6: PAWN,

    b3: PAWN,   c3: PAWN,   d3: DRONE,
    b2: PAWN,   c2: DRONE,  d2: QUEEN,
    b1: DRONE,  c1: QUEEN,  d1: QUEEN
  },
  highlights: {},
  selected: ''
}

module.exports = {
  init_board: INIT_BOARD,
  select: SELECT,
  de_select: DE_SELECT,
  move: MOVE,

  pawn: PAWN,
  drone: DRONE,
  queen: QUEEN,

  listen: (_, emitter) => {
    emitter.on(INIT_BOARD, (state) => {
      emitter.emit(UPDATE_TAPE, { state, newBoard: defaultBoard });
    });

    // highlight the board with the moves available
    emitter.on(SELECT, ({ state, key }) => {
      // convert chess notation to decimal
      const row = key[0].charCodeAt(0);
      const col = parseInt(key[1], 10);

      const buildKeyMoves = buildMoves(state, key);

      const newHighlights = ( () => {
        switch (state.board.pieces[key]) {
          case PAWN:
            return buildKeyMoves([
              [[row+1, col-1]],
              [[row+1, col+1]],
              [[row-1, col+1]],
              [[row-1, col-1]]
            ]);
          case DRONE:
            return buildKeyMoves([
              [[row, col+1], [row, col+2]],
              [[row, col-1], [row, col-2]]
            ]);
          case QUEEN:
            return buildKeyMoves([
              [[row, col-1], [row, col-2], [row, col-3], [row, col-4],
               [row, col-5], [row, col-6], [row, col-7], [row, col-8]],
              [[row, col+1], [row, col+2], [row, col+3], [row, col+4],
               [row, col+5], [row, col+6], [row, col+7], [row, col+8]],
              [[row+1, col-1], [row+2, col-2], [row+3, col-3], [row+4, col-4]],
              [[row-1, col-1], [row-2, col-2], [row-3, col-3], [row-4, col-4]],
              [[row+1, col+1], [row+2, col+2], [row+3, col+3], [row+4, col+4]],
              [[row-1, col+1], [row-2, col+2], [row-3, col+3], [row-4, col+4]],
              [[row-1, col], [row-2, col], [row-3, col], [row-4, col]],
              [[row+1, col], [row+2, col], [row+3, col], [row+4, col]]
            ]);
          default:
            return [];
        }
      })();
      const newBoard = Object.assign(
        {}, state.board, { highlights: newHighlights, selected: key }
      );
      emitter.emit(UPDATE_TAPE, { state, newBoard })
    });

    // clear the selection on the board
    emitter.on(DE_SELECT, ({ state }) => {
      const newBoard = Object.assign(
        {}, state.board,
        { highlights: {}, selected: '' }
      );
      emitter.emit(UPDATE_TAPE, { state, newBoard });
    });

    // move pieces on the board
    emitter.on(MOVE, ({ state, key }) => {
      const newPieces = Object.assign({}, state.board.pieces, {
        [key]: state.board.pieces[state.board.selected],
        [state.board.selected]: undefined
      });

      const newBoard = Object.assign(
        {}, state.board,
        { pieces: newPieces },
        { highlights: {}, selected: '' }
      );

      emitter.emit(UPDATE_TAPE, { state, newBoard });
    });
  }
}
