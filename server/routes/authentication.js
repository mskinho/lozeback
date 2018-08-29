
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const AuthenticationController = require('../controllers/authentication'), // Import authentication
express = require('express');



var api = express.Router();
api.post('/register',  AuthenticationController.register);
api.post('/login', AuthenticationController.login);
api.get('/checkEmail/:email',  AuthenticationController.checkEmail);
api.get('/checkUsername/:username', AuthenticationController.checkUsername);
api.get('/profile', AuthenticationController.use, AuthenticationController.profile);
//api.get('/getuser/:id', AuthenticationController.getuser);



module.exports = api;
