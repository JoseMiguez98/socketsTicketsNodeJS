let socket = io();
let urlParams = new URLSearchParams(window.location.search);
let labelDesk = $('h1');
let labelAttend = $('small');
let desk;

if (!urlParams.has('desk')) {
  window.location = 'index.html';
  throw new Error('Desk param is required');
}

desk = urlParams.get('desk');
labelDesk.html(`Escritorio ${desk}`);

$('button').on('click', function() {
  socket.emit('attendTicket', { desk }, (res) => {

    if(res.ticket !== -1) {
      labelAttend.html(res.ticket);
    } else {
      console.log('No quedan tickets pendientes');
      labelAttend.html('No quedan tickets pendientes');
    }

  });
});
