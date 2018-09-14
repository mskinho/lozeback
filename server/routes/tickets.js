
const TicketController = require('../controllers/ticket'); // Import authentication

const AuthenticationController = require('../controllers/authentication'), // Import authentication
express = require('express');


var api = express.Router();
// api.post('/postFile', AuthenticationController.use, TicketController.postFile);
 api.post('/addTicket', TicketController.addTicket);
api.get('/getTickets',  TicketController.getTickets);
//api.get('/allTickets',  AuthenticationController.use, AuthenticationController.roleAuthorization(['admin']), TicketController.allTickets);
api.get('/oneTicket/:id', AuthenticationController.use, TicketController.oneTicket);
api.get('/SingleTicket/:id',  AuthenticationController.use, TicketController.SingleTicket);
api.put('updateTicket', TicketController.updateTicket);
api.delete('/deleteTicket/:id', TicketController.deleteTicket);
api.put('likeTicket', TicketController.likeTicket);
api.put('dislikeTicket', TicketController.dislikeTicket);

module.exports = api;
