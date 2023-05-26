const express=require('express');
const router= express.Router();
var bodyParser= require('body-parser');


router.use(bodyParser.json())

const User =require("../controllers/User");
router.get('/Account',(req,res)=>{
    
    res.render('Account',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});

router.get('/RegisterationForm',(req,res)=>{
    
    res.render('RegisterationForm',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});

router.post('/myprofile', User.GetUser)
router.post('/checkemail', User.checkemail)

//checking if the user  logged in or not

router.use((req,res,next =>{
    if (req.session.user !== undefined){
        next();
    }else{
        res.render('err',{ err:'Please log in ',user: (req.session.user === undefined ? "" : req.session.user)})
    }
}))
//////////////////////////////////////////////////////////

router.get('/myprofile',(req,res)=>{
    
    res.render('myprofile',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});


router.get('/logout',(req,res)=>{
    
    res.render('logout',{ user: (req.session.user === undefined ? "" : req.session.user) })
    
});
module.exports=router;