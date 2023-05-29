const express = require('express');
const router = express.Router();
const Product = require('../models/product');
// const Product = require("../controllers/product.controller");
// router.get('/products/:productId', async (req, res) => {
//   const productId = req.params.productId;
//   try {
//     // Retrieve product data from MongoDB
//     const product = await Product.findById(productId);

//     // Render product detail page with product data
//     res.render('productdetail', { product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });
// router.get("/product/:id",Product.getProduct);    
module.exports = router;