const express=require('express');
const router= express.Router();
const Product = require("../models/product")
const productController = require('../controllers/product.controller');



  router.get('/allface', function(req, res, next) {
    Product.find({type:'Face moisturizer'}).then(function(products){
        
        res.render('allface',
              {
                productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
              })
          })

    });
    
  

module.exports=router;