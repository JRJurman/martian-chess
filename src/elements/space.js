var html = require('choo/html')

const ratio = require('./ratio');

module.exports = (key, piece) => {
  const keyValue = key.charCodeAt(0)+parseInt(key[1]);
  const bgColor = keyValue % 2 ? 'bg-red' : 'bg-orange';

  return html`
    <div class=${bgColor}>${piece}</div>
  `
}
