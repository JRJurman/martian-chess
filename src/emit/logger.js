module.exports = (state, emitter) => {
  emitter.on('*', function (messageName, data) {
    if (messageName != 'render') {
      console.log('event', messageName, data ? data : '');
    }
  })
}
