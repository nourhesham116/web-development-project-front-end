const express=require('express');
const router= express.Router();
const Product=require("../models/product")

//const Product = new  mongoose.model('Product', productSchema);
router.get('/body', function(req, res, next) {
  Product.find({type:'body cleanser'}).then(function(product){
    res.render('body',{
      productsList:product
    })
  })
  
  });

  router.get('/allface', function(req, res, next) {
    Product.find({type:'Face moisturizer'}).then(function(product){
      res.render('allface',{
        productsList:product 
      })
    })

    });
    router.get('/Liptreatment', function(req, res, next) {
      Product.find({type:'lipbalm'}).then(function(product){
        res.render('Liptreatment',{
          productsList:product 
        })
      })
  
      });

      router.get('/skincarePage1', function(req, res, next) {
        Product.find({type:'cleanser'}).then(function(product){
          res.render('skincarePage1',{
            productsList:product 
          })
        })
    
        });


module.exports=router;