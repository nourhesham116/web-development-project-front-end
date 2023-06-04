const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const users = require('../models/users');
const flash = require('express-flash');
const products = require('../models/product');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const { check, validationResult } = require('express-validator');


const GetUser = (req, res) => {
  var query = { Email: req.body.email, Password: req.body.password };
  users
    .findOne(query)
    .then((result) => {
      req.session.user = result;
      res.redirect('/myprofile');
    })
    .catch((err) => {
      console.log(err);
    });
};

const checkemail = (req, res) => {
  var query = { Email: req.body.email };
  users
    .find(query)
    .then((result) => {
      if (result.length > 0) {
        res.send('unavailable');
      } else {
        res.send('available');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const editUser = (req, res) => {
  users
    .findByIdAndUpdate(req.session.user._id, { Password: req.body.password })
    .then((result) => {
      req.session.user.Password = req.body.password;
      res.redirect('/myprofile');
    })
    .catch((err) => {
      console.log(err);
    });
};

const registerUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render('RegisterationForm', {
      alert,
      emailError: errors.array().find(error => error.param === 'email') || null,
    });
  } else {
    const email = req.body.email;
    users.isThisEmailInUse(email)
      .then(inUse => {
        if (inUse) {
          // Email is not in use, proceed with registration
          bcrypt.hash(req.body.password, 10) 
            .then((hashedPassword) => {
              const user = new users({
                Firstname: req.body.Firstname,
                Lastname: req.body.Lastname,
                Email: req.body.email,
                Password: hashedPassword,
                Type: req.body.type,
              });

              return user.save();
            })
            .then(result => {
              res.redirect('/Account');
            })
            .catch(err => {
              console.log('Error hashing password:', err);
              res.render('RegisterationForm', { emailError: 'An error occurred', alert: [] });
            });
        } else {
          // Email is already in use
          res.render('RegisterationForm', { emailError: 'Email already taken', alert: [] });
        }
      })
      .catch(err => {
        console.log('Error checking email:', err);
        res.render('RegisterationForm', { emailError: 'An error occurred', alert: [] });
      });
  }
};




module.exports = {
  checkemail,
  editUser,
  GetUser,
  registerUser
};
