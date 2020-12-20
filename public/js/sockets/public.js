let socket = io();
let ticketLabels = $('.ticket-label');
let ticketDesk = $('.ticket-desk');

socket.on('updateState', ({ lastFour }) => {
  lastFour.map((ticket, index) => {
    ticketLabels[index].innerHTML = `Ticket: ${ticket.num}`;
    ticketDesk[index].innerHTML = `Escritorio ${ticket.desk}`;
  })
});
