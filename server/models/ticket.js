/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose



// Ticket Model Definition
const ticketSchema = new Schema({
  title: String,
  body: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  imgticket: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  fieldname: String,
  originalname: String,
  encoding: String,
  mimeptype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
});

// Export Module/Schema
module.exports = mongoose.model('Ticket', ticketSchema);
