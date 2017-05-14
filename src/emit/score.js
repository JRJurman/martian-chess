const board = require('./board');

const UPDATE_TAPE = require('./historyTape').update;

const INIT_SCORE = 'SCORE:INIT_SCORE';

const defaultScore = {
  p1: [], p2: []
};

module.exports = {
  init_score: INIT_SCORE,

  listen: (_, emitter) => {
    emitter.on(INIT_SCORE, (state) => {
      emitter.emit(UPDATE_TAPE, { state, newScore: defaultScore });
    });

    emitter.on(board.move, ({ state, key }) => {
      if (state.board.pieces[key]) {
        const column = parseInt(key[1], 10);
        const player = `p${2 - Math.floor(column / 5)}`;

        const playerPieces = state.score[player].concat(state.board.pieces[key]);
        const scoreObject = Object.assign({}, state.score, { [player]: playerPieces });
        emitter.emit(UPDATE_TAPE, { state, newScore: scoreObject });
      }
    });
  }
}
