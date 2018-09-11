const Ticket = require('../models/ticket'); // Import Ticket Model Schema
const User = require('../models/user'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage({
  // set uploads folder
  destination: (req, file, cb) => {
      cb(null, 'client/src/assets/uploads');
  },
  // set default filename
  filename: (req, file, cb) => {
      cb(null, file.originalname); // overwrites current file with same name!!!
  }
});
const upload = multer({ storage: storage });


  /* ===============================================================
     CREATE NEW BLOG
  =============================================================== */
  exports.postFile = (req, res, next) => {


      const ticket = new Ticket({

        fieldname: req.files[0].fieldname,
        originalname: req.files[0].originalname,
        encoding: req.files[0].encoding,
        mimetype: req.files[0].mimetype,
        destination:req.files[0].destination,
        filename: req.files[0].filename,
        path: req.files[0].path,
        size: req.files[0].size,
        title: req.body.title, // Title field

        // imageDimension: fileDimension,
        fileUploadDate: Date.now()
      });

      // Save ticket into database
      ticket.save((err, ticket) => {
        // Check if error
        if (err) {

          res.json({ success: false, message: 'problema no envio.' });

        } else {
          res.json({ success: true, message: 'Ticket saved!' }); // Return success message
        }


      });
    };



    export const addTicket = (io,T) => {

         let result;
        const newTicket = new Ticket((T), {
          title: req.body.title, // Title field
          body: req.body.body, // Body field
          createdBy: req.body.createdBy,
          imgticket: req.body.imgticket
        });
        ticket.save((err,Ticket) => {
          if(err){
            result = {'success':false,'message':'Some Error','error':err};
            console.log(result);
          }
          else{
            const result = {'success':true,'message':'Ticket Added Successfully',Ticket}
             io.emit('TicketAdded', result);
             console.log(result);
          }
        })
        };

    export const  updateTicket = (io,T) => {
    let result;
    Ticket.findOne({ _id:T.id }, T, { new:true }, (err,ticket) => {
      if(err){
      result = {'success':false,'message':'Some Error','error':err};
      console.log(result);
      }
      else{
       result = {'success':true,'message':'Ticket Updated Successfully',ticket};
       io.emit('TicketUpdated', result);
      }
    })
    }
