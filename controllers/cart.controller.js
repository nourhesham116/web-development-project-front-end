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
  
      res.redirect('/');
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
  
      res.redirect('/');
    } catch (error) {
      console.error('Error removing cart item:', error);
      res.status(500).send('Error removing cart item');
    }
  };
  
// Function to save a cart item to the database
async function saveCartItem(cartItem) {
  try {
    await client.connect();
    const database = client.db('your-database-name'); // Replace with your database name
    const cartCollection = database.collection('carts'); // Replace with your collection name
    
    const newCartItem = new Cart(cartItem);
    await cartCollection.insertOne(newCartItem);
  } catch (error) {
    console.error('Error saving cart item:', error);
  } finally {
    await client.close();
  }
}

// Function to retrieve saved cart items from the database for a specific user
async function getSavedCartItems(userId) {
  try {
    await client.connect();
    const database = client.db('your-database-name'); // Replace with your database name
    const cartCollection = database.collection('carts'); // Replace with your collection name
    
    return await cartCollection.find({ user: userId }).toArray();
  } catch (error) {
    console.error('Error retrieving cart items:', error);
  } finally {
    await client.close();
  }
}

module.exports = {
  saveCartItem,
  getSavedCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem
};