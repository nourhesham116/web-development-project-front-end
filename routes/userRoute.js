const express=require('express');
const router= express.Router();
var bodyParser= require('body-parser');
const userController = require('../controllers/User');
const { check, validationResult } = require('express-validator');

router.use(bodyParser.json())

const User =require("../controllers/User");
router.get('/', (req, res) => {
    if (req.session.user === undefined ? "" : req.session.user) {
      res.redirect('/myprofile')
    }
    else {
      res.render('Account', { user: (req.session.user === undefined ? "" : req.session.user) })
    }
  })

router.get('/RegisterationForm',(req,res)=>{
    
    res.render('RegisterationForm',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});

router.post('/myprofile', User.GetUser)
router.post('/checkemail', User.checkemail)
router.post('/RegistrationForm', User.validateRegistrationForm, User.checkEmailAvailability, User.processRegistrationForm);


//checking if the user  logged in or not


//////////////////////////////////////////////////////////

router.get('/myprofile',(req,res)=>{
    
    res.render('myprofile',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});


router.get('/logout',(req,res)=>{
    
    res.render('logout',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});
module.exports=router;