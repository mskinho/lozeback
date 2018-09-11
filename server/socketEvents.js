exports = module.exports = function (io) {
    // Set socket.io listeners.
    io.on('connection', (socket) => {


      socket.on('save-ticket', (data) => {
        io.emit('new-ticket', { ticket: data });
        console.log(data);
      });

      socket.on('disconnect', () => {
        // console.log('user disconnected');
      });
    });
  };
