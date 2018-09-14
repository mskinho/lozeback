const User = require('../models/user'); // Import User Model Schema
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const bodyParser = require('body-parser');


 exports.newComment = (req, res) => {
    // Check if comment content was provided
    if (!req.body.content) {
      res.json({ success: false, message: 'Comment content is required.' }); // Return error message
    } else {

        // Check if comment's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Comment creator is required.' }); // Return error
        } else {
          // Create the comment object for insertion into database
          const comment = new Comment({
            content: req.body.content, // Title field
            createdBy: req.body.createdBy, // CreatedBy field
            ticketId: req.body.ticketId
          });
          // Save comment into database
          comment.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the content field
                if (err.errors.content) {
                  res.json({ success: false, message: err.errors.content.message }); // Return error message
                }
              }
            } else {
              res.json({ success: true, message: 'Comment saved!' }); // Return success message
            }
          });
        }

    }
  };

  exports.allComments = (req, res) => {
    // Search database for all comment posts
    Comment.find({}, (err, comments) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if comments were found in database
        if (!comments) {
          res.json({ success: false, message: 'No comments found.' }); // Return error of no comments found
        } else {
          res.json({ success: true, comments: comments }); // Return success and comments array
        }
      }
    }).sort({ '_id': -1 }); // Sort comments from newest to oldest
  };

