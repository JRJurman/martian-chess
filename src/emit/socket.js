module.exports = {

  listen: (mutableState, emitter) => {
    /* start websocket connection */
    const socketConnection = new WebSocket('ws://localhost:3000/');

    socketConnection.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      emitter.emit(message.messageName, Object.assign({}, message.data, { socket: false }));
    }

    emitter.on('*', (messageName, data) => {
      if ( data && data.socket ) {
        socketConnection.send( JSON.stringify({ messageName, data }) );
      }
    })
  }
}
