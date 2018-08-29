const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check address street length
let streetLengthChecker = (street) => {
  // Check if address street exists
  if (!street) {
    return false; // Return error
  } else {
    // Check the length of street
    if (street.length < 1 || street.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid street
    }
  }
};

// Validate Function to check if valid street format
let alphaNumericTitleChecker = (street) => {
  // Check if street exists
  if (!street) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid street
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(street); // Return regular expression test results (true or false)
  }
};

// Array of Title Validators
const streetValidators = [
  // First Title Validator
  {
    validator: streetLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  // Second Title Validator
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];




// Address Model Definition
const addressSchema = new Schema({
  street: { type: String, required: true, validate: streetValidators },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: String },
   cep: { type: Number },
   numero: { type: Number },
   complemento: { type: String },
   bairro: { type: String },
   cidade: { type: String },
   estado: { type: String },
  createdAt: { type: Date, default: Date.now() }
  
});

// Export Module/Schema
module.exports = mongoose.model('Address', addressSchema);