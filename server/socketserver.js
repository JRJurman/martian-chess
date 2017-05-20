const express = require('express');
const expressWs = require('express-ws');

const wsOptions = { clientTracking: true };
const WS = expressWs( express(), null, { wsOptions } );
const server = WS.getWss();
const app = WS.app;

// const games = {};

app.ws('/', (ws) => {
  ws.on('message', (msg) => {
    // we use server.clients so that we don't recieve our own message
    server.clients.forEach((client) => {
      if (ws !== client) { client.send(msg); }
    });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Socket Server running on port ${port}`)
});
