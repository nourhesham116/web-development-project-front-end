const express=require('express');
const router= express.Router();
var bodyParser= require('body-parser');
const users = require('../models/users');
const userController = require('../controllers/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const urlencodedParser =bodyParser.urlencoded({extended: false});
const User =require("../controllers/User");
const bcrypt = require('bcrypt');

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
  console.log("logged");
  const email = req.body.email;
  const password = req.body.password;

  users.findOne({ Email: email })
    .then(async (user) => {
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.Password);
        if (isPasswordMatch) {
          console.log(user);
          req.session.user = user;
          res.render('myprofile', { userP: user, user: (req.session.user === undefined ? "" : req.session.user), cart: (req.session.cart === undefined ? "" : req.session.cart) });
        } else {
          // Error message: Invalid email or password
          res.render('Account', { error: 'Invalid email or password', email: '', password: '' });
        }
      } else {
        // Error message: Invalid email or password
        res.render('Account', { error: 'Invalid email or password', email: '', password: '' });
      }
    })
    .catch(err => {
      console.log(err);
      // Error message: An error occurred
      res.render('Account', { error: 'An error occurred', email: '', password: '' });
    });
});




/*router.post('/RegisterationForm',
  urlencodedParser,
  [
    check('Firstname', 'Firstname should contain min 3 characters').exists().isLength({ min: 3 }),
    check('Lastname', 'Lastname should contain min 3 characters').exists().isLength({ min: 3 }),
    check('email').exists().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    check('password')
      .exists().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password should contain at least 6 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
      .withMessage('Password should contain at least one letter, one number, and one special character'),
  ],
  userController.registerUser
);*/




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