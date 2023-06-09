const Cart = require('../models/cart');
const addItemToCart = (req, res) => {
    try {
      
      const cartItem = {
        product: req.body.product,
        quantity: parseInt(req.body.quantity),
        price: req.body.price,
        image: req.body.image,
        name: req.body.name,
        totalCart:0
      };
  
      console.log(cartItem);
  
      req.session.cart = req.session.cart || [];
      const cartIndex = req.session.cart.findIndex(
        item => item.product === cartItem.product
      );
  
      if (cartIndex > -1) {
        req.session.cart[cartIndex].quantity += cartItem.quantity;
      } else {
        req.session.cart.push(cartItem);
      }
      const currentUrl = req.headers.referer;
const redirectUrl = `${currentUrl}?message=Item added to cart`;
res.redirect(redirectUrl);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).send('Error adding to cart');
    }
  };
  
  const updateCartItem = (req, res) => {
    try {
      const cartItem = {
        product: req.body.product,
        quantity: parseInt(req.body.quantity)
      };
  
      const cartIndex = req.session.cart.findIndex(
        item => item.product === cartItem.product
      );
  
      if (cartIndex > -1) {
        req.session.cart[cartIndex].quantity = cartItem.quantity;
      }
  
      const currentUrl = req.headers.referer;
      const redirectUrl = `${currentUrl}?message=Item added to cart`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).send('Error updating cart item');
    }
  };
  
  const removeCartItem = (req, res) => {
    try {
      const cartItem = {
        product: req.body.product,
        quantity: 0,
        price: 0,
        name: req.body.name
      };
  
      const cartIndex = req.session.cart.findIndex(
        item => item.product === cartItem.product
      );
  
      if (cartIndex > -1) {
        req.session.cart.splice(cartIndex, 1);
      }
  
      const currentUrl = req.headers.referer;
      const redirectUrl = `${currentUrl}?message=Item added to cart`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Error removing cart item:', error);
      res.status(500).send('Error removing cart item');
    }
  };
  



module.exports = {
  
  addItemToCart,
  updateCartItem,
  removeCartItem
};