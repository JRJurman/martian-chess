/* eslint-disable no-console, no-unneeded-ternary */

module.exports = (state, emitter) => {
  emitter.on('*', (messageName, data) => {
    if (messageName !== 'render') {
      console.log('event', messageName, data ? data : '');
    }
  })
}
