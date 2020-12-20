const { io } = require('../server');
const TicketControl = require('../classes/TickeControl');

const ticketControl = new TicketControl();

io.on('connection', client => {
  console.log('User connected');

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('message', message => {
    console.log(message);
    // Send message in broadcast to all clients connected
    client.broadcast.emit('message', message);
  });

  client.on('nextTicket', (payload, callback) => {
    let next = ticketControl.next();
    callback(next);
  });

  client.on('attendTicket', (payload, callback) => {
    let attendTicket = ticketControl.attendTicket(payload.desk);

    callback({
      desk: payload.desk,
      ticket: attendTicket,
    });

    client.broadcast.emit('updateState', {
      actual: ticketControl.getLastTicket(),
      lastFour: ticketControl.getLastFour(),
    });

  });

  client.emit('updateState', {
    actual: ticketControl.getLastTicket(),
    lastFour: ticketControl.getLastFour(),
  });
});
