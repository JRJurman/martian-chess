// this element will keep a component at a specific ratio
// http://stackoverflow.com/questions/6148012/setting-element-width-based-on-height-via-css

var html = require('choo/html')

const gif = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

module.exports = (ratio, element) => {

  const containerStyle = `
    position: relative;
    display: inline-block;
    height: 100%;
  `

  const imgStyle = `
    height: ${ratio};
    max-width: inherit;
  `

  const elementStyle = `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `

  return html`
    <div style=${containerStyle}>
      <img style=${imgStyle} src=${gif} />
      <div style=${elementStyle}>
        ${element}
      </div>
    </div>
  `
}
