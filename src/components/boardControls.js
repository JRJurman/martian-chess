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

  const buttonClass = `
    dim pointer
  `

  const onNewGame = () => emit(boardTape.newGame, { state });
  const onUndo = () => emit(boardTape.undo, { state });
  const onRedo = () => emit(boardTape.redo, { state });

  return html`
    <div style=${gridStyle}>
      <h4 style=${buttonStyle} onclick=${onNewGame} class=${buttonClass}>
        New Game
      </h4>
      <h4 style=${buttonStyle} onclick=${onUndo} class=${buttonClass}>
        Undo
      </h4>
      <h4 style=${buttonStyle} onclick=${onRedo} class=${buttonClass}>
        Redo
      </h4>
    </div>
  `
}
