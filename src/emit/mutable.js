const MUTATE = 'MUTABLE:MUTATE';

module.exports = {
  mutate: MUTATE,

  listen: (mutableState, emitter) => {
    emitter.on(MUTATE, (newState) => {
      Object.assign(mutableState, newState);
    });

    emitter.on('*', (messageName) => {
      if (messageName !== 'render') {
        emitter.emit('render');
      }
    })
  }
}
