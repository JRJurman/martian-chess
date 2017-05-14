/* eslint-disable no-console, no-unneeded-ternary, no-unused-vars */

module.exports = (state, emitter) => {
  emitter.on('*', (messageName, data) => {
    if (messageName !== 'render') {
      // console.log('Finished event', messageName, data ? data : '');
      // console.log('Current state', Object.assign({}, state) );
    }
  })
}
