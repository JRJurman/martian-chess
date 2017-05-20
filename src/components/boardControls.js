const html = require('choo/html')

const historyTape = require('../emit/historyTape');

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

  const onNewGame = () => emit(historyTape.newGame, { state, socket: true });
  const onUndo = () => emit(historyTape.undo, { state, socket: true });
  const onRedo = () => emit(historyTape.redo, { state, socket: true });

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
