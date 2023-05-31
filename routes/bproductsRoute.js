const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const productController = require('../controllers/product.controller');

router.get('/', function (req, res, next) {
    Product.find({  category: 'BEAUTY'}).then(function (product) {
      res.render('Beautyproducts',
        {
          productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
        })
    })
  
  });
  
  router.get('/Liptreatment', function (req, res, next) {
    Product.find({ type: 'lipbalm' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  
  });

  router.get('/Lipsticks', function (req, res, next) {
    Product.find({ type: 'lipstick' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  
  });

  module.exports = router;