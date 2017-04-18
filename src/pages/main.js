const html = require('choo/html');

const css = require('../index.css');
const title = require('../elements/title');
const board = require('../components/board');

module.exports = function mainView (state, emit) {
  const boardStyle = `height: 87%;`
  return html`
    <body class="bg-light-red black-60 pa4">
      ${title()}
      <div style=${boardStyle}>
        ${board()}
      </div>
    </body>
  `

  function onclick () {
    emit('increment', 1)
  }
}
