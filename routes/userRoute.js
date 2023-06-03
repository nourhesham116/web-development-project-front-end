const express=require('express');
const router= express.Router();
var bodyParser= require('body-parser');
const users = require('../models/users');
const userController = require('../controllers/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const urlencodedParser =bodyParser.urlencoded({extended: false});
const User =require("../controllers/User");

const { check, validationResult } = require('express-validator');

router.use(bodyParser.json())

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/Account/myprofile');
  } else {
    res.render('Account', { user: req.session.user ,cart: (req.session.cart === undefined ? "" : req.session.cart)});
  }
});

router.get('/myprofile', (req, res) => {
  const userP = req.session.user;
  if (req.session.user) {
    res.render('myprofile', { userP: req.session.user ,cart: (req.session.cart === undefined ? "" : req.session.cart)});
  } else {
    res.redirect('/Account');
  }
});

router.get('/RegisterationForm',(req,res)=>{
    
    res.render('RegisterationForm',{ user: (req.session.user === undefined ? "" : req.session.user) ,cart: (req.session.cart === undefined ? "" : req.session.cart)})
    
});
router.post('/login-action', (req, res) => {
  console.log("logged")
  var query = { Email: req.body.email, Password: req.body.password };
  users.find(query)
    .then(result => {
      if (result.length > 0) {
        console.log(result[0]);
        req.session.user = result[0];
        res.render('myprofile', { userP: result[0], user: (req.session.user === undefined ? "" : req.session.user),cart: (req.session.cart === undefined ? "" : req.session.cart) });
      }
      else {
        // Error message: Invalid email or password
        res.render('Account', { error: 'Invalid email or password', email: req.body.email || '', password: req.body.password || '' });
      }
    })
    .catch(err => {
      console.log(err);
      // Error message: An error occurred
      res.render('Account', { error: 'An error occurred', email: req.body.email || '', password: req.body.password || '' });
    });
});




router.post('/RegisterationForm',userController.registerUser);


//router.post('/myprofile', User.GetUser)
//router.post('/checkemail', User.checkemail)
//router.post('/RegistrationForm', User.validateRegistrationForm, User.checkEmailAvailability, User.processRegistrationForm);


//checking if the user  logged in or not


//////////////////////////////////////////////////////////
router.get('/logout',(req,res)=>{
    
    res.render('logout',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/forgot-password', (req, res) => {
  res.render('forgot-password');
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/Account/forgot-password');
    }

    const token = buffer.toString('hex');

    users.findOne({ Email: email })
      .then(user => {
        if (!user) {
          return res.redirect('/Account/forgot-password');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

        return user.save();
      })
      .then(() => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "sophistiquebeauty54@gmail.com",
            pass: "wceljuptweycrrpq",
          },
        });

        const mailOptions = {
          from: "sophistiquebeauty54@gmail.com",
          to: email,
          subject: 'Password Reset',
          html: `
            <p>You requested a password reset.</p>
            <p>Click this <a href="http://localhost:${3000}/Account/reset-password/${token}">link</a> to set a new password.</p>
          `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
            return res.redirect('/Account/forgot-password');
          }

          console.log('Email sent:', info.response);
          res.redirect('/');
        });
      })
      .catch(err => console.log(err));
  });
});

router.get('/reset-password/:token', (req, res) => {
  const token = req.params.token;

  users.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }

      res.render('reset-password', { token });
    })
    .catch(err => console.log(err));
});

router.post('/reset-password', (req, res) => {
  const { token, password } = req.body;

  users.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.redirect('/');
      }

      user.Password = password;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      return user.save();
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

module.exports=router;