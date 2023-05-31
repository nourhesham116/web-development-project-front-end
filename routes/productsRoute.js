const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const productController = require('../controllers/product.controller');
//const Product = new  mongoose.model('Product', productSchema);

router.get('/', function (req, res, next) {
  Product.find({ category: 'SKIN' }).then(function (product) {
    res.render('Skinproducts', {
      productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
    })
  })

});


router.get('/bodymoisturizer', function (req, res, next) {
  Product.find({ type: 'Face moisturizer' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});

router.get('/bodycleanser', function (req, res, next) {
  Product.find({ type: 'cleanser' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});


router.get('/skincarePage1', function (req, res, next) {
  Product.find({ type: 'cleanser' }).then(function (product) {
    res.render('Skinproducts', {
      productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
    })
  })

});


module.exports = router;