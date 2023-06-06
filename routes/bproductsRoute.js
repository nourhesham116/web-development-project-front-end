const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const productController = require('../controllers/product.controller');

router.get('/', function (req, res, next) {
    Product.find({  category: 'BEAUTY'}).then(function (product) {
      res.render('Beautyproducts',
        {
          productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user),cart:(req.session.cart===undefined? "" :req.session.cart)
        })
    })
  
  });
  
  router.get('/Liptreatment', function (req, res, next) {
    Product.find({ type: 'lipbalm' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user),cart:(req.session.cart===undefined? "" :req.session.cart)
      })
    })
  
  });

  router.get('/Lipsticks', function (req, res, next) {
    Product.find({ type: 'lipstick' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined? "" :req.session.cart)
      })
    })
  
  });

  router.get('/Lipgloss', function (req, res, next) {
    Product.find({ type: 'lipgloss' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  
  });
  
  router.get('/Highlighters', function (req, res, next) {
    Product.find({ type: 'highlighter' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  
  });

  router.get('/Blush', function (req, res, next) {
    Product.find({ type: 'blush' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  
  });

  router.get('/Brushtools', function (req, res, next) {
    Product.find({ type: 'brushes' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  
  });

  router.get('/Eyeshadows', function (req, res, next) {
    Product.find({ type: 'eyeshadow' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/eyeliner', function (req, res, next) {
    Product.find({ type:'eyeliner'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/mascaras', function (req, res, next) {
    Product.find({ type:'mascara'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/concealer', function (req, res, next) {
    Product.find({ type:'concelar'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/foundation', function (req, res, next) {
    Product.find({ type:'foundation'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/powder', function (req, res, next) {
    Product.find({ type:'powder'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });
  router.get('/prime', function (req, res, next) {
    Product.find({ type:'prime+set'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });
  router.get('/allface', function (req, res, next) {
    Product.find({ category:'BEAUTY'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/new', function (req, res, next) {
    Product.find({ type:'bnew'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/combos', function (req, res, next) {
    Product.find({ type:'combos'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user), cart:(req.session.cart===undefined?"":req.session.cart)
      })
    })
  });

  router.get('/newrare', function (req, res, next) {
    Product.find({ name: { $regex: /^Rare/i } }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product,
        userP: req.session.user,
        user: (req.session.user === undefined ? "" : req.session.user),
        cart: (req.session.cart === undefined ? "" : req.session.cart)
      });
    });
  });
  
  router.get('/newfenty', function (req, res, next) {
    Product.find({ name: { $regex: /^Fenty/i }, category: 'BEAUTY' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product,
        userP: req.session.user,
        user: (req.session.user === undefined ? "" : req.session.user),
        cart: (req.session.cart === undefined ? "" : req.session.cart)
      });
    });
  });
  
  
    
  module.exports = router;