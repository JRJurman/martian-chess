const MUTATE = 'MUTABLE:MUTATE';

module.exports = {
  mutate: MUTATE,

  listen: (mutableState, emitter) => {
    emitter.on(MUTATE, (newState) => {
      // eslint-disable-next-line no-console
      if (newState.logger) { console.log('EVENT:', MUTATE) }
      Object.assign(mutableState, newState);
      emitter.emit('render');
    });

    emitter.on('render', () => {
      // eslint-disable-next-line no-console
      if (mutableState.logger) { console.log('EVENT:', 'render') }
    })
  }
}
