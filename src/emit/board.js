const SELECT =    'BOARD:SELECT';
const DE_SELECT = 'BOARD:DE_SELECT';
const MOVE =      'BOARD:MOVE';

const PAWN =      'PAWN';
const DRONE =     'DRONE';
const QUEEN =     'QUEEN';

/* generate highlights object based on paths */
const buildMoves = (state, key) => (pathLists) => {
  return pathLists
  /* stop sequential paths early if we run into pieces */
  .map((coordList) => {
    // create a list of booleans on if there is a piece
    //  at a coord we want to go to
    const boolList = coordList.map(coord => {
      const checkKey = [String.fromCharCode(coord[0]), coord[1]].join('');
      return !state.board.pieces[checkKey];
    });

    // determine the first piece that we could land on
    const stop = boolList.indexOf(false);

    // if there is a stop, we'll go +1 past it
    // (we want to include capturable pieces)
    // otherwise, return all the coords
    return coordList.slice(0, stop!=-1 ? stop+1 : undefined);
  })

  /* join paths together to have one list of possible moves */
  .reduce((paths, path) => paths.concat(path), [])

  /* return object of valid moves to highlight */
  .reduce((highlights, coord) => {
    // translate numbers to chess notation
    const checkKey = [String.fromCharCode(coord[0]), coord[1]].join('');

    // if we hit a piece, it needs to be on the other board
    const diffSpace = Math.floor(parseInt(key[1])/5) ^ Math.floor(coord[1]/5);
    return Object.assign(
      {}, highlights,
      {[checkKey]: diffSpace || !state.board.pieces[checkKey]}
    );
  }, {});
}

module.exports = {
  select: SELECT,
  de_select: DE_SELECT,
  move: MOVE,

  store: (state, emitter) => {
    // default state
    state.board = {
      pieces: {
        a8: QUEEN,  b8: QUEEN,  c8: DRONE,
        a7: QUEEN,  b7: DRONE,  c7: PAWN,
        a6: DRONE,  b6: PAWN,   c6: PAWN,

        b3: PAWN,   c3: PAWN,   d3: DRONE,
        b2: PAWN,   c2: DRONE,  d2: QUEEN,
        b1: DRONE,  c1: QUEEN,  d1: QUEEN,
      },
      highlights: {},
      selected: ''
    }
    emitter.on(SELECT, (key) => {
      // highlight the board with the moves available

      // convert chess notation to decimal
      const row = key[0].charCodeAt(0);
      const col = parseInt(key[1]);

      const buildKeyMoves = buildMoves(state, key);

      const newHighlights = (() => {
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
              [[row+1, col], [row+2, col], [row+3, col], [row+4, col]],
            ]);
        }
      })();
      state.board.highlights = newHighlights;
      state.board.selected = key;
      emitter.emit('render')
    });
    emitter.on(DE_SELECT, () => {
      state.board = Object.assign(
        {}, state.board,
        {highlights:{}, selected:''}
      );
      emitter.emit('render');
    });
    emitter.on(MOVE, (key) => {
      // move pieces on the board
      state.board.pieces[key] = state.board.pieces[state.board.selected];
      // remove the piece on the old space
      delete state.board.pieces[state.board.selected];
      // remove highlights
      emitter.emit(DE_SELECT);
      emitter.emit('render');
    });
  }
}
