const INIT = 'MUTABLE:INIT';
const MUTATE = 'MUTABLE:MUTATE';

module.exports = {
  init: INIT,
  mutate: MUTATE,

  listen: (mutableState, emitter) => {
    emitter.on(MUTATE, (newState) => {
      Object.assign(mutableState, newState);
      emitter.emit('render');
    });
  }
}
