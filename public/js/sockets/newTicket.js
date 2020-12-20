// Establish connection with server
let socket = io();
let label =  $('#lblNuevoTicket');

socket.on('connect', function() {
  console.log('Connected to the server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateState', ({ actual }) => {
  label.html(`Ticket ${actual}`);
});

$('button').on('click', function() {
  socket.emit('nextTicket', null, ticket => {
   label.html(`Ticket ${ticket}`);
  });
});
