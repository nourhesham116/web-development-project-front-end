
const express=require('express');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const { registerUser } = require('../controllers/auth.controllers');

router.get('/RegisterationForm', (req, res) => {
    const errorMessages = req.flash('errorMessages');
   // res.render('RegisterationForm', { errorMessages });
    res.render('RegisterationForm', { errorMessages: errorMessages });
  });
  
  router.post(
    '/RegisterationForm',
    [
    body('Firstname').notEmpty().withMessage('Firstname is required'),
    body('Lastname').notEmpty().withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('Password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('Password')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[0-9]/)
      .withMessage('Password must contain at least one digit')
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage('Password must contain at least one special character'),
    body('passwordConfirm')
      .custom((value, { req }) => value === req.body.Password)
      .withMessage('Passwords do not match'),
  ],
  //auth.controllers.registerUser
);
router.post('/RegisterationForm', registerUser);
module.exports = router;
