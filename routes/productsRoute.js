const express=require('express');
const router= express.Router();
const Product=require("../models/product");

//const Product = new  mongoose.model('Product', productSchema);
router.get('/', function(req, res, next) {
  Product.find().then(function(product){
    res.render('body',{
      productsList:product
    })
  })
  
  });



module.exports=router;