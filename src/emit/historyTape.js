const NEW_GAME = 'STORE:NEW_GAME';
const UPDATE = 'STORE:UPDATE';
const UNDO = 'STORE:UNDO';
const REDO = 'STORE:REDO';

const mutable = require('./mutable');

module.exports = {
  newGame: NEW_GAME,
  update: UPDATE,
  undo: UNDO,
  redo: REDO,

  listen: (_, emitter) => {
    emitter.on(NEW_GAME, ({ state }) => {
      // eslint-disable-next-line no-console
      if (state.logger) { console.log('EVENT:', NEW_GAME) }

      const oldBoard = state.boardTape[1];
      const oldScore = state.scoreTape[1];
      emitter.emit(mutable.mutate, {
        board: oldBoard,
        boardTape: [oldBoard],
        score: [oldScore],
        cursor: 2
      })
    });

    /* should never be called directly, used by other emitters */
    emitter.on(UPDATE, ({ state, newBoard, newScore }) => {
      // eslint-disable-next-line no-console
      if (state.logger) { console.log('EVENT:', UPDATE) }

      const updateBoard = newBoard || state.board || {};
      const updateScore = newScore || state.score || {};

      emitter.emit(mutable.mutate, {
        board: updateBoard,
        score: updateScore,
        boardTape: (state.boardTape ? state.boardTape.slice(0, state.cursor) : []).concat(updateBoard),
        scoreTape: (state.scoreTape ? state.scoreTape.slice(0, state.cursor) : []).concat(updateScore),
        cursor: state.cursor ? state.cursor + 1 : 1
      });
    });

    emitter.on(UNDO, ({ state }) => {
      // eslint-disable-next-line no-console
      if (state.logger) { console.log('EVENT:', UNDO) }

      if (state.cursor <= 1) { return; }
      // we can replay history from the begining of the tape, to the cursor
      // we concat an empty object so we don't change the first element
      const replayBoardHistory = [{}].concat(state.boardTape.slice(0, state.cursor - 1) );
      const oldBoard = Object.assign.apply(this, replayBoardHistory);
      const replayScoreHistory = [{}].concat(state.scoreTape.slice(0, state.cursor - 1) );
      const oldScore = Object.assign.apply(this, replayScoreHistory);

      const newState = { board: oldBoard, score: oldScore, cursor: state.cursor - 1 };
      emitter.emit(mutable.mutate, newState);
    });

    emitter.on(REDO, ({ state }) => {
      // eslint-disable-next-line no-console
      if (state.logger) { console.log('EVENT:', REDO) }

      if (!state.boardTape || (state.cursor > state.boardTape.length - 1) ) { return; }
      // we can replay history from the begining of the tape, to the cursor
      // we concat an empty object so we don't change the first element
      const replayBoardHistory = [{}].concat(state.boardTape.slice(0, state.cursor + 1) );
      const oldBoard = Object.assign.apply(this, replayBoardHistory);
      const replayScoreHistory = [{}].concat(state.scoreTape.slice(0, state.cursor + 1) );
      const oldScore = Object.assign.apply(this, replayScoreHistory);

      emitter.emit(mutable.mutate, { board: oldBoard, score: oldScore, cursor: state.cursor + 1 });
    });
  }
}
