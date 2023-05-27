
//import{body, validationResult} from "express-validator";
const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const app = express();
///////////////////////////////////////


//validating signup form

app.post('/create', [
    body("Firstname").notEmpty({}).withMessage("firstname is required"),
  
    body("Lastname").notEmpty().withMessage("lastname is required"),
    
    body("email").isEmail().withMessage("invalid email"),
    
    body("Password").isLength({ min:8 }).withMessage("password must be atleast 8 caharcters "),
    body("Password")
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
  
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
  
    .withMessage('Password must contain at least one digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
  
    .withMessage('Password must contain at least one special character'),
  
    body("passwordConfirm").custom((value,{req}) => value === req.body.Password)
    .withMessage("Passwords do not match"),
  
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Customizing the error messages 
  
      const errorMessages = errors.array().map(error => error.msg);
      req.flash('errorMessages', errorMessages);
      req.flash('errorColor', 'red');
      
      // Redirect  the form with the error messages 
      return res.redirect('/RegisterationForm'); 
      
    }
    next();
  }
  
  ]);