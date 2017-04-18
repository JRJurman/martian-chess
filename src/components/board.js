const html = require('choo/html')

const space = require('../elements/space');
const ratio = require('../elements/ratio');

module.exports = () => {
  gridStyle = `
    display: grid;
    height: 100%;
    grid: repeat(4, 1fr) 0.5fr repeat(4, 1fr) / repeat(4, 1fr);
  `

  mockBoard = {
    a8: 'Q', b8: 'Q', c8: 'D',
    a7: 'Q', b7: 'D', c7: 'P',
    a6: 'D', b6: 'P', c6: 'P',

    b3: 'P', c3: 'P', d3: 'D',
    b2: 'P', c2: 'D', d2: 'Q',
    b1: 'D', c1: 'Q', d1: 'Q',
  }



  const board1 = '.'.repeat(3).split('.').map( (_, invNum) => {
    return 'abcd'.split('').map( letterNotation => {
      const numberNotation = 8-invNum;
      const key = `${letterNotation}${numberNotation}`;
      return space(key, mockBoard[key])
    });
  });

  const padding = '.'.repeat(3).split('.').map( () => html`<div>` );

  const board2 = '.'.repeat(3).split('.').map( (_, invNum) => {
    return 'abcd'.split('').map( letterNotation => {
      const numberNotation = 4-invNum;
      const key = `${letterNotation}${numberNotation}`;
      return space(key, mockBoard[key])
    });
  });

  return ratio('47.06%', html`
    <div style=${gridStyle}>
      ${board1}
      ${padding}
      ${board2}
    </div>
  `);
}
