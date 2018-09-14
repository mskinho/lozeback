
const CommentController = require('../controllers/comment'); // Import authentication

const AuthenticationController = require('../controllers/authentication'), // Import authentication
express = require('express');


var api = express.Router();
api.post('/newComment', AuthenticationController.use, CommentController.newComment);
api.get('/allComments', AuthenticationController.use, CommentController.allComments);


module.exports = api;
