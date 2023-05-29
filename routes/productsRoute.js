const express=require('express');
const session = require('express-session');
const router= express.Router();
router.use(session({ secret: 'Your_Secret_Key' }))
const Product=require("../models/product");
let type;
//const Product = new  mongoose.model('Product', productSchema);
router.get('/', (req, res) => {
  
  Product.find().then(function(product){
   
    res.render('body',({  productsList:product,userP: req.session.user,user: (req.session.user === undefined ? "" : req.session.user) }))
    
    
  })
  });
  
 


module.exports=router;