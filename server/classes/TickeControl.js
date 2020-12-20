const fs = require('fs');

class Ticket {
  constructor(num, desk) {
    this.num = num;
    this.desk = desk;
  }

  setDesk(desk) {
    this.desk = desk;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFourTickets = [];

    const data = require('../data/data.json');

    if(data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets || [];
      this.lastFourTickets = data.lastFourTickets || [];
    } else {
      this.restartCount();
    }
  }

  next() {
    this.last += 1;
    this.tickets.push(new Ticket(this.last, null));
    this.persistData();
    return this.last;
  }

  restartCount() {
    this.last = 0;
    this.tickets = [];
    this.lastFourTickets = [];
    this.persistData();
  }

  persistData() {
    const data = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFourTickets: this.lastFourTickets,
    };

    fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
  }

  attendTicket(desk) {
    if(this.tickets.length === 0) {
      return -1;
    }
    let ticketNumber = this.tickets.shift().num;
    const attendTicket = new Ticket(ticketNumber, desk);

    this.lastFourTickets.unshift(attendTicket);

    if(this.lastFourTickets.length > 4) {
      this.lastFourTickets.pop();
    }

    return attendTicket.num;
  }

  getLastTicket() {
    return this.last;
  }

  getLastFour() {
    return this.lastFourTickets;
  }

}

module.exports = TicketControl;
