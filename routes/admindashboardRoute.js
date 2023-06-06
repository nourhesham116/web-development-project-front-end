const express=require('express');
const router= express.Router();
const users = require('../models/users');
const flash = require('express-flash')
const products = require('../models/product');
const productController = require('../controllers/product.controller');
const isAdmin = (user) => {
  return user !== undefined && user.Type === 'admin';
};
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
      res.render('Error404');
    }
  });
  router.get('/adminproducts', (req, res) => {
    if(isAdmin(req.session.user)){
    res.render('adminproducts');
    }
    else{
      res.render('Error404');
    }
  })

  
  router.post('/search', async (req, res) => {
    let payload = req.body.payload.trim();
  
    try {
      let searchResults = await users.find({
        Firstname: { $regex: new RegExp('^' + payload + '.*', 'i') },
      }).exec();
  
      if (searchResults) {
        // Limit search results to 10
        searchResults = searchResults.slice(0,3);
        res.send({ payload: searchResults });
      } else {
        // Handle the case when searchResults is undefined
        res.send({ payload: [] });
      }
    } catch (error) {
      console.log('Error in search:', error);
      res.send({ payload: [] });
    }
  });
  router.post('/', productController.createProduct);
  router.post('/:prodId',productController.deleteProduct)
  router.post('/editproduct/:prodId',productController.updateProduct)

  module.exports=router;