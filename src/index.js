const html = require('choo/html')
const choo = require('choo')

const mainPage = require('./pages/main');

const app = choo()
app.use(logger)
app.use(countStore)
app.route('/', mainPage)
app.mount('body')

function logger (state, emitter) {
  emitter.on('*', function (messageName, data) {
    console.log('event', messageName, data)
  })
}

function countStore (state, emitter) {
  state.count = 0
  emitter.on('increment', function (count) {
    state.count += count
    emitter.emit('render')
  })
}
