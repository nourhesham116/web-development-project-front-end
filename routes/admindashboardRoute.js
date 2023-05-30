const express=require('express');
const router= express.Router();
const users = require('../models/users');
const flash = require('express-flash')
const products = require('../models/product');
const productController = require('../controllers/product.controller');
router.get('/', (req, res) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      users.find()
        .then(result => {
          res.render('admindashboard', { users: result, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      res.send('you are not admin');
    }
  });
  router.get('/adminproducts', (req, res) => {
    res.render('adminproducts');
  })
  router.post('/', productController.createProduct);
  router.post('/:prodId',productController.deleteProduct)
  module.exports=router;