const board = require('./board');
const boardTape = require('./boardTape');

const INIT = require('./mutable').init;
const MUTATE = require('./mutable').mutate;

const defaultScore = {
  p1: { pieces: [] },
  p2: { pieces: [] },
  playerHistory: [],
  playerCursor: 0
}

module.exports = {
  listen: (_, emitter) => {
    emitter.on(INIT, () => {
      emitter.emit(MUTATE, defaultScore);
    });

    emitter.on(boardTape.newGame, () => {
      emitter.emit(MUTATE, defaultScore);
    });

    emitter.on(board.move, ({ state, key }) => {
      console.log(state.board.pieces[key])
      if (state.board.pieces[key]) {
        const column = parseInt(key[1], 10);
        const player = `p${2 - Math.floor(column / 5)}`;

        const playerPieces = state[player].pieces.concat(state.board.pieces[key]);
        const playerObject = Object.assign({}, state[player], { pieces: playerPieces });
        emitter.emit(MUTATE, { [player]: playerObject });
        console.log(player)
        console.log(state[player].pieces)
      }
    });

    emitter.on(boardTape.undo, () => {
      emitter.emit(MUTATE, {});
    });

    emitter.on(boardTape.redo, () => {
      emitter.emit(MUTATE, {});
    });
  }
}
