/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose



// Ticket Model Definition
const commentSchema = new Schema({
    content:  String ,
    ticketId: String,
    createdBy:  String,
    createdAt: { type: Date, default: Date.now() }
});

// Export Module/Schema
module.exports = mongoose.model('Comment', commentSchema);
