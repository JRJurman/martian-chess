const html = require('choo/html')
const board = require('../emit/board');

module.exports = (key, piece, highlight, selected, onClick) => {
  // determine the background color based on the chess notation
  const keyValue = key.charCodeAt(0) + parseInt(key[1], 10);
  const bgColor = keyValue % 2 ? 'bg-red' : 'bg-orange';

  // if we are selecting or highlighting the space
  const auxColor = ( () => {
    if (highlight) { return 'bg-gold'; }
    else if (selected) { return 'bg-light-red'; }
    else { return ''; }
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

  const pyramid = ( ()=> {
    switch(piece) {
      case board.pawn:
        return html`
          <g>
            <polygon
              points="37.5,87.5 50,62.5, 62.5,87.5"
              style="fill:#FFE700;stroke:black;stroke-width:1"
            />
            <circle cx="52.5" cy="82" r="3"/>
          </g>
        `
      case board.drone:
        return html`
          <g>
            <polygon
              points="25,87.5 50,37.5, 75,87.5"
              style="fill:#FFD700;stroke:black;stroke-width:1"
            />
            <circle cx="60" cy="82" r="3"/>
            <circle cx="52.5" cy="82" r="3"/>
          </g>
        `
      case board.queen:
        return html`
          <g>
            <polygon
              points="12.5,87.5 50,12.5, 87.5,87.5"
              style="fill:#FFB700;stroke:black;stroke-width:1"
            />
            <circle cx="75" cy="82" r="3"/>
            <circle cx="67.5" cy="82" r="3"/>
            <circle cx="60" cy="82" r="3"/>
          </g>
        `
      default:
        return '';
    }
  })();

  const spaceHover = (piece || highlight || selected) ? 'pointer' : '';

  return html`
    <div  style=${spaceStyle} class='${bgColor} ${spaceHover}'
          onclick=${onClick} >
      <div style=${auxStyle} class=${auxColor}>
        <svg height="100%" width="100%" viewBox="0 0 100 100">
          ${pyramid}
        </svg>
      </div>
    </div>
  `
}
