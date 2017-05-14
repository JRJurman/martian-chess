const choo = require('choo')

const mainPage = require('./pages/main');
const logger = require('./emit/logger');
const historyTape = require('./emit/historyTape');
const board = require('./emit/board');
const score = require('./emit/score');
const mutable = require('./emit/mutable');

const app = choo()
app.use(logger)
app.use(mutable.listen)
app.use(historyTape.listen)
app.use(score.listen)
app.use(board.listen)
app.route('/', mainPage)
app.mount('body')
