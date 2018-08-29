/* ===================
   Import Node Modules
=================== */
const env = require('./env');
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application

const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require('./config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const authentication = require('./routes/authentication'); // Import Authentication Routes
const tickets = require('./routes/tickets'); // Import Ticket Routes
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = process.env.PORT || '8080';
// socket.io connection
io.on('connection', (socket) => {
    console.log("Connected to Socket!!"+ socket.id);
    // Receiving Tickets from client
    socket.on('newTicket', (Ticket) => {
      console.log('socketData: '+JSON.stringify(Ticket));
      TicketController.newTicket(io,Ticket);
    });

    // Receiving Updated Ticket from client
    socket.on('updateTicket', (Ticket) => {
      console.log('socketData: '+JSON.stringify(Ticket));
      TicketController.updateTicket(io,Ticket);
    });

    // Receiving Ticket to Delete
    socket.on('deleteTicket', (Ticket) => {
      console.log('socketData: '+JSON.stringify(Ticket));
      TicketController.deleteTicket(io,Ticket);
    });
  })
 // Allows heroku to set port
// Database Connection
mongoose.connect(config.uri,  (err) => {
  // Check if database was able to connect
  if (err) {
    console.log('Could NOT connect to database: ', err); // Return error message
  } else {
    console.log('Connected to ' + config.db); // Return success message
  }
});

// Middleware
app.use(cors('Access-Control-Allow-Origin', '*'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/client')); // Provide static directory for frontend
app.use('/api', authentication); // Use Authentication routes in application
app.use('/api', tickets); // Use Ticket routes in application



// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
module.exports = app;
