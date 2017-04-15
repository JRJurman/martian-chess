var html = require('choo/html')

module.exports = (key, piece) => {
  const keyValue = key.charCodeAt(0)+parseInt(key[1]);
  const bgColor = keyValue % 2 ? 'bg-red' : 'bg-orange';
  const spaceStyle = `
  `

  return html`
    <div style=${spaceStyle} class=${bgColor}>
      ${piece}
    </div>
  `
}
