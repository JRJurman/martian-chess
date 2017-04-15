const html = require('choo/html');

const css = require('../index.css');
const title = require('../elements/title');
const board = require('../components/board');

module.exports = function mainView (state, emit) {
  return html`
    <body class="bg-light-red black-60 pa4">
      ${title()}
      ${board()}
    </body>
  `

  function onclick () {
    emit('increment', 1)
  }
}
