
const User = require('../models/user'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

exports.register = (req, res, next)=>{
     // Check if email was provided
     if (!req.body.email) {
        res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
      } else {
        // Check if username was provided
        if (!req.body.username) {
          res.json({ success: false, message: 'You must provide a username' }); // Return error
        } else {
          // Check if password was provided
          if (!req.body.password) {
            res.json({ success: false, message: 'You must provide a password' }); // Return error
          } else {
            // Create new user object and apply user input
            let user = new User({
              email: req.body.email.toLowerCase(),
              username: req.body.username.toLowerCase(),
              password: req.body.password,
              condominio: req.body.condominio,
              name: req.body.name,
              role: req.body.role
            });
            // Save user to database
            user.save((err) => {
              // Check if error occured
              if (err) {
                // Check if error is an error indicating duplicate account
                if (err.code === 11000) {
                  res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
                } else {
                  // Check if error is a validation rror
                  if (err.errors) {
                    // Check if validation error is in the email field
                    if (err.errors.email) {
                      res.json({ success: false, message: err.errors.email.message }); // Return error
                    } else {
                      // Check if validation error is in the username field
                      if (err.errors.username) {
                        res.json({ success: false, message: err.errors.username.message }); // Return error
                      } else {
                        // Check if validation error is in the password field
                        if (err.errors.password) {
                          res.json({ success: false, message: err.errors.password.message }); // Return error
                        } else {
                          res.json({ success: false, message: err }); // Return any other error not already covered
                        }
                      }
                    }
                  } else {
                    res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                  }
                }
              } else {
                res.json({ success: true, message: 'Acount registered!' }); // Return success
              }
            });
          }
        }
      }
}

exports.login = (req, res, next)=>{
     // Check if username was provided
     if (!req.body.username) {
        res.json({ success: false, message: 'No username was provided' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: 'No password was provided.' }); // Return error
        } else {
          // Check if username exists in database
          User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: err }); // Return error
            } else {
              // Check if username was found
              if (!user) {
                res.json({ success: false, message: 'Username not found.' }); // Return error
              } else {
                const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                // Check if password is a match
                if (!validPassword) {
                  res.json({ success: false, message: 'Password invalid' }); // Return error
                } else {
                  const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client

                  res.json({
                    success: true,
                    message: 'Success!',
                    token: token,
                    user: {

                      username: user.username,
                      userCondominio: user.condominio
                    }
                  }); // Return success and token to frontend
                }
              }
            }
          });
        }
      }
}

exports.roleAuthorization = (roles) => {

  return function(req, res, next){

      var user = req.user;

      User.findById({ _id: req.decoded.userId }, function(err, foundUser){

          if(err){
              res.status(422).json({error: 'Usuario não encontrado.'});
              return next(err);
          }

          if(roles.indexOf(foundUser.role) > -1){
              return next();
          }

          res.status(401).json({error: 'Não está autorizado para acessar o conteúdo.'});
          return next('Unauthorized');

      });

  }

}
exports.token = (req, res, next)=>{
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
}
exports.use = (req, res, next)=>{
  // check header or url parameters or post parameters for token
var token = req.body.token || req.query.token || req.headers['authorization'];
  //console.log(token);
if (token) {
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });
    } else {
      req.decoded = decoded;
      console.log()
      next();
    }
  });
} else {
  return res.status(201).json({
    success: false,
    message: 'Fatal error, Authenticate token not available.',
              errcode: 'no-token'
  });
}
}

    exports.checkEmail = (req, res, next)=>{
         // Check if email was provided in paramaters
    if (!req.params.email) {
        res.json({ success: false, message: 'E-mail was not provided' }); // Return error
      } else {
        // Search for user's e-mail in database;
        User.findOne({ email: req.params.email }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err }); // Return connection error
          } else {
            // Check if user's e-mail is taken
            if (user) {
              res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
            } else {
              res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
            }
          }
        });
      }
    }

    exports.checkUsername =  (req, res, next)=>{
         // Check if username was provided in paramaters
    if (!req.params.username) {
        res.json({ success: false, message: 'Username was not provided' }); // Return error
      } else {
        // Look for username in database
        User.findOne({ username: req.params.username }, (err, user) => { // Check if connection error was found
          if (err) {
            res.json({ success: false, message: err }); // Return connection error
          } else {
            // Check if user's username was found
            if (user) {
              res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
            } else {
              res.json({ success: true, message: 'Username is available' }); // Return as vailable username
            }
          }
        });
      }
    }

    exports.profile = (req, res) => {
      // Search for user in database
      User.findOne({ _id: req.decoded.userId }).select('username email condominio name')
      .populate().exec((err, user) => {
        // Check if error connecting
        if (err) {
          res.json({ success: false, message: err }); // Return error
        } else {
          // Check if user was found in database
          if (!user) {
            res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
          } else {
            res.json({ success: true, user: user }); // Return success, send user object to frontend for profile

          }
        }
      });
    };



    // exports.getuser = (req, res, next)=>{
    //   res.json({user: req.user});
    // User.findById({ _id:req.params.id }).populate('condominio').exec((err, user) => {
    //   // Check if error connecting
    //   if (err) {
    //     res.status({ success: false, message: err }); // Return error
    //   }
    //   res.status({success: user});// Return success, send user object to frontend for profile
    //       console.log('dados do usuário', user);
    //     })



    // }
