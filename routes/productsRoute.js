const express=require('express');
const router= express.Router();
const productsData=require("../data/products");
router.get('/', function(req, res, next) {
   const viewData={
    products:productsData.products,
    pageTitle:'SOPHISTIQUÉ BODY'
   };
   res.render('body',viewData);
  });



module.exports=router;