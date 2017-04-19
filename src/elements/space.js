var html = require('choo/html')

const ratio = require('./ratio');

module.exports = (key, piece, highlight, selected, onClick) => {

  // determine the background color based on the chess notation
  const keyValue = key.charCodeAt(0)+parseInt(key[1]);
  const bgColor = keyValue % 2 ? 'bg-red' : 'bg-orange';

  // if we are selecting or highlighting the space
  const auxColor = (() => {
    if (highlight) { return 'bg-gold'; }
    else if (selected) { return 'bg-light-red'; }
    else { return '' }
  })();

  const spaceStyle = `
    display: flex;
    align-items: stretch;
  `

  const auxStyle = `
    width: 100%;
    margin: 7%;
    opacity: 0.75;
  `

  return html`
    <div style=${spaceStyle} onclick=${onClick} class=${bgColor}>
      <div style=${auxStyle} class=${auxColor}>
        ${piece}
      </div>
    </div>
  `
}
