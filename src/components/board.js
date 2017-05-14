const html = require('choo/html')

const boardControls = require('./boardControls');
const space = require('../elements/space');
const ratio = require('../elements/ratio');

const score = require('../emit/score');
const board = require('../emit/board');

const onClickSpace = (state, emit, key) => {
  if (state.board.highlights[key]) {
    return () => emit(board.move, { state, key });
  }
  else if (state.board.pieces[key]) {
    return () => emit(board.select, { state, key });
  }
  else {
    return () => emit(board.de_select, { state });
  }
}

module.exports = (state, emit) => {
  if (!state.board) {
    emit(board.init_board, state);
  }

  if (!state.score || !state.score.p1) {
    emit(score.init_score, state);
  }

  const gridStyle = `
    display: grid;
    height: 100%;
    grid: repeat(4, 1fr) 0.5fr repeat(4, 1fr) / repeat(4, 1fr);
  `

  const board1 = '.'.repeat(3).split('.').map( (_, invNum) => {
    return 'abcd'.split('').map( (letterNotation) => {
      const numberNotation = 8 - invNum;
      const key = `${letterNotation}${numberNotation}`;
      return space(
        key,
        state.board.pieces[key],
        state.board.highlights[key],
        state.board.selected === key,
        onClickSpace(state, emit, key)
      );
    });
  });

  const padding = '.'.repeat(3).split('.').map( () => html`<div>`);

  const board2 = '.'.repeat(3).split('.').map( (_, invNum) => {
    return 'abcd'.split('').map( (letterNotation) => {
      const numberNotation = 4 - invNum;
      const key = `${letterNotation}${numberNotation}`;
      return space(
        key,
        state.board.pieces[key],
        state.board.highlights[key],
        state.board.selected === key,
        onClickSpace(state, emit, key)
      );
    });
  });

  return ratio('47.06%', html`
    <div>
      ${boardControls(state, emit)}
      <div style=${gridStyle}>
        ${board1}
        ${padding}
        ${board2}
      </div>
    </div>
  `);
}
