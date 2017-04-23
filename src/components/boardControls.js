const html = require('choo/html')

const boardTape = require('../emit/boardTape');

module.exports = (state, emit) => {
  const gridStyle = `
    display: grid;
    width: 100%;
    grid: 1fr / 2fr 1fr 1fr;
  `

  const buttonStyle = `
    margin: 0px;
  `

  const onNewGame = () => emit(boardTape.newGame);
  const onUndo = () => emit(boardTape.undo);
  const onRedo = () => emit(boardTape.redo);

  return html`
    <div style=${gridStyle}>
      <h4 style=${buttonStyle} onclick=${onNewGame}>
        New Game
      </h4>
      <h4 style=${buttonStyle} onclick=${onUndo}=>
        Undo
      </h4>
      <h4 style=${buttonStyle} onclick=${onRedo}>
        Redo
      </h4>
    </div>
  `
}
