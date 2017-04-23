var html = require('choo/html')

const store = require('../emit/store');

module.exports = (state, emit) => {
  const gridStyle = `
    display: grid;
    width: 100%;
    grid: 1fr / 2fr 1fr 1fr;
  `

  const buttonStyle = `
    margin: 0px;
  `

  const onNewGame = () => emit(store.newGame);
  const onUndo = () => emit(store.undo);
  const onRedo = () => emit(store.redo);

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
