const NEW_GAME = 'STORE:NEW_GAME';
const UPDATE = 'STORE:UPDATE';
const UNDO = 'STORE:UNDO';
const REDO = 'STORE:REDO';

module.exports = {
  newGame: NEW_GAME,
  update: UPDATE,
  undo: UNDO,
  redo: REDO,

  listen: (state, emitter) => {
    Object.assign(state, { tape: [], cursor: 0 });

    emitter.on(NEW_GAME, () => {
      const oldBoard = state.tape[0];
      Object.assign(state, { board: oldBoard, tape: [oldBoard], cursor: 0 });
      emitter.emit('render');
    });

    emitter.on(UPDATE, (newBoard) => {
      Object.assign(
        state,
        { board: newBoard },
        {
          // the tape is our current tape up to the cursor
          // and the new board
          tape: state.tape.slice(0, state.cursor).concat(newBoard),
          cursor: state.cursor + 1
        }
      );
      emitter.emit('render');
    });

    emitter.on(UNDO, () => {
      if (state.cursor <= 1) { return; }
      // we can replay history from the begining of the tape, to the cursor
      // we concat an empty object so we don't change the first element
      const replayHistory = [{}].concat(state.tape.slice(0, state.cursor - 1) );
      const oldBoard = Object.assign.apply(this, replayHistory);

      Object.assign(state, { board: oldBoard, cursor: state.cursor - 1 });
      emitter.emit('render');
    });

    emitter.on(REDO, () => {
      if (state.cursor > state.tape.length - 1) { return; }
      // we can replay history from the begining of the tape, to the cursor
      // we concat an empty object so we don't change the first element
      const replayHistory = [{}].concat(state.tape.slice(0, state.cursor + 1) );
      const oldBoard = Object.assign.apply(this, replayHistory);

      Object.assign(state, { board: oldBoard, cursor: state.cursor + 1 });
      emitter.emit('render');
    });
  }
}
