const board = require('./board');

const UPDATE_TAPE = require('./historyTape').update;

const INIT_SCORE = 'SCORE:INIT_SCORE';

const defaultScore = {
  p1: [], p2: []
};

module.exports = {
  initScore: INIT_SCORE,

  listen: (mutableState, emitter) => {
    emitter.emit(UPDATE_TAPE, { state: mutableState, newScore: defaultScore });

    emitter.on(board.move, ({ state, key }) => {
      // eslint-disable-next-line no-console
      if (state.logger) { console.log('EVENT:', board.move) }

      if (state.board.pieces[key]) {
        const column = parseInt(key[1], 10);
        const player = `p${2 - Math.floor(column / 5)}`;

        const playerPieces = state.score[player].concat(state.board.pieces[key]);
        const scoreObject = Object.assign({}, state.score, { [player]: playerPieces });
        console.log(scoreObject);
        emitter.emit(UPDATE_TAPE, { state, newScore: scoreObject });
      }
    });
  }
}
