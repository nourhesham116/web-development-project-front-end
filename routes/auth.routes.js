
const express=require('express');
const router= express.Router();
const express=require('express');
const Register=require('../partials/RegisterationForm')

router.get('/RegisterationForm', (req, res) => {
    const errorMessages = req.flash('errorMessages');
   // res.render('RegisterationForm', { errorMessages });
    res.render('RegisterationForm', { errorMessages: errorMessages });

  });
  
  router.post('/RegisterationForm', validatePassword, (req, res) => {
    // Handling the registration form 
    
  });
  