const NEW_GAME = 'STORE:NEW_GAME';
const UPDATE = 'STORE:UPDATE';
const UNDO = 'STORE:UNDO';
const REDO = 'STORE:REDO';

const MUTATE = require('./mutable').mutate;

module.exports = {
  newGame: NEW_GAME,
  update: UPDATE,
  undo: UNDO,
  redo: REDO,

  listen: (_, emitter) => {
    emitter.on(NEW_GAME, ({ state }) => {
      const oldBoard = state.tape[0];
      emitter.emit(MUTATE, { board: oldBoard, tape: [oldBoard], cursor: 1 })
    });

    emitter.on(UPDATE, ({ state, newBoard }) => {
      emitter.emit(MUTATE, { board: newBoard }, {
        // the tape is our current tape up to the cursor
        // and the new board
        tape: state.tape ? state.tape.slice(0, state.cursor).concat(newBoard) : [newBoard],
        cursor: state.cursor ? state.cursor + 1 : 1
      })
    });

    emitter.on(UNDO, ({ state }) => {
      if (state.cursor <= 1) { return; }
      // we can replay history from the begining of the tape, to the cursor
      // we concat an empty object so we don't change the first element
      const replayHistory = [{}].concat(state.tape.slice(0, state.cursor - 1) );
      const oldBoard = Object.assign.apply(this, replayHistory);

      emitter.emit(MUTATE, { board: oldBoard, cursor: state.cursor - 1 });
    });

    emitter.on(REDO, ({ state }) => {
      if (state.cursor > state.tape.length - 1) { return; }
      // we can replay history from the begining of the tape, to the cursor
      // we concat an empty object so we don't change the first element
      const replayHistory = [{}].concat(state.tape.slice(0, state.cursor + 1) );
      const oldBoard = Object.assign.apply(this, replayHistory);

      emitter.emit(MUTATE, { board: oldBoard, cursor: state.cursor + 1 });
    });
  }
}
