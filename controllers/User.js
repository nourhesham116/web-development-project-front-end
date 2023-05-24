const path = require('path');
const addusers = require('../models/adduser');

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
module.exports ={
    checkemail,
    editUser,
    GetUser,
};
