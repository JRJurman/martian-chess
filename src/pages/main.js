const html = require('choo/html');

const css = require('../index.css'); // eslint-disable-line no-unused-vars

const title = require('../elements/title');
const board = require('../components/board');

module.exports = (realState, emit) => {
  const boardStyle = 'height: 87%;';
  const state = Object.assign({}, realState, { logger: true });

  return html`
    <body class="bg-light-red black-60 pa3">
      ${title()}
      <div style=${boardStyle}>
        ${board(state, emit)}
      </div>
    </body>
  `
}
