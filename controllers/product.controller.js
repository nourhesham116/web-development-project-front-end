const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category:req.body.category,
      status:req.body.category,
      //images
    });

    await product.save();

    res.status(201).send(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
// const getProduct=(req,res)=>{
//     var query={"_id":req.params.id};
//     Product.findone(query).then(result=>{
//         res.render('productdetail',{ Product: result, product: (req.session.user === undefined ? "" : req.session.user) })
//     })
// }
module.exports = router;