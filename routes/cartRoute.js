const cartController = require('../controllers/cart.controller');
const cart = require('../models/cart');
const express=require('express');
const router= express.Router();
router.post('/add', cartController.addItemToCart);
router.post('/update', cartController.updateCartItem);
router.post('/remove', cartController.removeCartItem);

module.exports=router;