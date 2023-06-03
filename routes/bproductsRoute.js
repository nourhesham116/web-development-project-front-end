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

  router.get('/Lipgloss', function (req, res, next) {
    Product.find({ type: 'lipgloss' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  
  });
  
  router.get('/Highlighters', function (req, res, next) {
    Product.find({ type: 'highlighter' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  
  });

  router.get('/Blush', function (req, res, next) {
    Product.find({ type: 'blush' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  
  });

  router.get('/Brushtools', function (req, res, next) {
    Product.find({ type: 'brushes' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  
  });

  router.get('/Eyeshadows', function (req, res, next) {
    Product.find({ type: 'eyeshadow' }).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });

  router.get('/eyeliner', function (req, res, next) {
    Product.find({ type:'eyeliner'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });

  router.get('/concealer', function (req, res, next) {
    Product.find({ type:'concelar'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });

  router.get('/foundation', function (req, res, next) {
    Product.find({ type:'foundation'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });

  router.get('/powder', function (req, res, next) {
    Product.find({ type:'powder'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });
  router.get('/prime', function (req, res, next) {
    Product.find({ type:'prime+set'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });
  router.get('/allface', function (req, res, next) {
    Product.find({ category:'BEAUTY'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });

  router.get('/new', function (req, res, next) {
    Product.find({ type:'bnew'}).then(function (product) {
      res.render('Beautyproducts', {
        productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
      })
    })
  });
  
  module.exports = router;