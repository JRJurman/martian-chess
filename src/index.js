const html = require('choo/html')
const choo = require('choo')

const mainPage = require('./pages/main');
const logger = require('./emit/logger');
const board = require('./emit/board');

const app = choo()
app.use(logger)
app.use(board.store)
app.route('/', mainPage)
app.mount('body')
