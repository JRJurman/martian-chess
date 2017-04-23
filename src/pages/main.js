const html = require('choo/html');

const css = require('../index.css'); // eslint-disable-line no-unused-vars

const title = require('../elements/title');
const board = require('../components/board');

module.exports = (state, emit) => {
  const boardStyle = 'height: 87%;';

  return html`
    <body class="bg-light-red black-60 pa4">
      ${title()}
      <div style=${boardStyle}>
        ${board(state, emit)}
      </div>
    </body>
  `
}
