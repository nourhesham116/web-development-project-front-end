const path = require('path');
const bodyParser =require('body-parser')
const users = require('../models/users');
const flash = require('express-flash')
const products = require('../models/product');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const { check, validationResult } = require('express-validator');
const GetUser=(req,res) =>{
    var query ={ Email:req.body.email, Password: req.body.password};
    users.findOne(query)
     .then(result =>{
        req.session.user =result;
        res.redirect('/myprofile');
     })
     .catch(err =>
        {
         console.log(err);
        });
    };


const checkemail=(req,res) =>{
    var query={ Email:req.body.email};
    users.find(query)
  .then(result =>{
    if(result.length>0){
        res.send('unavailable');
    }else{
        res.send('available');
    }
  })
    .catch(err =>
        {
         console.log(err);
        });

};

const editUser=(req,res)=>{
    users.findByIdAndUpdate(req.session.user._id, {Password: req.body.password})
    .then(result =>{
        req.session.user.Password =req.body.password;
        res.redirect('/myprofile')
    })
    .catch(err =>
        {
         console.log(err);
        });
};
const validateRegistrationForm = (req, res, next) => {
    check('Firstname', 'Firstname should contain min 3 characters')
        .exists()
        .isLength({ min: 3 }),
        check('Lastname', 'Lastname should contain min 3 characters')
            .exists()
            .isLength({ min: 3 }),
        check('email')
            .exists().withMessage('Email is required')
            .isEmail().withMessage('Invalid email'),
        check('password')
            .exists().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password should contain at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
            .withMessage('Password should contain at least one letter, one number, and one special character');

};

  
const checkEmailAvailability = (req, res, next) => {
    
    const email = req.body.email;
    users.isThisEmailInUse(email)
      .then(inUse => {
        if (inUse) {
          // Email is already in use
          res.render('RegisterationForm', { emailError: 'Email already taken', alert: [] });
        } else {
          next();
        }
      })
      .catch(error => {
        console.log('Error checking email:', error);
        res.render('RegisterationForm', { emailError: 'An error occurred', alert: [] });
      });
    }

  
    const processRegistrationForm = (req, res) => {
   
    const add = new users({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Password: req.body.Password,
      Type: req.body.Type
    });
  
    add.save()
      .then((result) => {
        console.log('Registration successful!');
        res.redirect('/myprofile');
      })
      .catch(err => {
        console.log(err);
      });
    }

module.exports ={
    checkemail,
    editUser,
    GetUser,
    validateRegistrationForm,
    checkEmailAvailability,
    processRegistrationForm
};
