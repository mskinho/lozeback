/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check talk title length
let titleLengthChecker = (title) => {
  // Check if talk title exists
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of title
    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid title
    }
  }
};



// Array of Title Validators
const titleValidators = [
  // First Title Validator
  {
    validator: titleLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  }
];




// Talk Model Definition
const talkSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  body:{type: String},
  condominio:{type: String},
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() }
  
});



// Export Module/Schema
module.exports = mongoose.model('Talk', talkSchema);
