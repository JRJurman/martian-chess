const choo = require('choo')

const mainPage = require('./pages/main');
const logger = require('./emit/logger');
const boardTape = require('./emit/boardTape');
const board = require('./emit/board');
const players = require('./emit/players');
const mutable = require('./emit/mutable');

const app = choo()
app.use(logger)
app.use(mutable.listen)
app.use(boardTape.listen)
app.use(players.listen)
app.use(board.listen)
app.route('/', mainPage)
app.mount('body')
