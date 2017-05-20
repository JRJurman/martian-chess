const choo = require('choo')

const mainPage = require('./pages/main');
const historyTape = require('./emit/historyTape');
const board = require('./emit/board');
const score = require('./emit/score');
const mutable = require('./emit/mutable');
const socket = require('./emit/socket');

const app = choo();
app.use(mutable.listen);
app.use(historyTape.listen);
app.use(score.listen);
app.use(board.listen);
app.use(socket.listen);
app.route('/', mainPage);
app.mount('body');
