const path = require('path');
const addusers = require('./models/adduser');

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

}
module.exports ={
    checkemail
};
