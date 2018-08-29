const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check publicidade nome length
let nomeLengthChecker = (nome) => {
  // Check if publicidade nome exists
  if (!nome) {
    return false; // Return error
  } else {
    // Check the length of nome
    if (nome.length < 1 || nome.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid nome
    }
  }
};

// Validate Function to check if valid nome format
let alphaNumericTitleChecker = (nome) => {
  // Check if nome exists
  if (!nome) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid nome
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(nome); // Return regular expression test results (true or false)
  }
};

// Array of Title Validators
const nomeValidators = [
  // First Title Validator
  {
    validator: nomeLengthChecker,
    message: 'Title must be more than 5 characters but no more than 50'
  },
  // Second Title Validator
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];




// Publicidade Model Definition
const publicidadeSchema = new Schema({
  nome: { type: String, required: true, validate: nomeValidators },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  address: { type: String, ref: 'Address' },

   numero: { type: Number },
   tipo:{
    type: [{
      type: String,
      enum: ['produto', 'servico']
    }],
    default: ['produto'],
    required: 'Please provide at least one role'
  },
  urlimg: { type: String },
  createdBy: { type: String},
  createdAt: { type: Date, default: Date.now() }
  
});

// Export Module/Schema
module.exports = mongoose.model('Publicidade', publicidadeSchema);