const products = require('../models/product');
const  ObjectID = require('mongodb').ObjectId;
const users=require('../models/users')
const path = require('path');
const fs = require('fs');
const createProduct = (req, res) => {
  let imgFile1, imgFile2, imgFile3, imgFile4;
  let uploadPath1, uploadPath2, uploadPath3, uploadPath4;

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  imgFile1 = req.files.image1;
  imgFile2 = req.files.image2;
  imgFile3 = req.files.image3;
  imgFile4 = req.files.image4;

  uploadPath1 = path.resolve(__dirname, '..') + '/public/imgs/uploads/' + req.body.name + '_1' + path.extname(imgFile1.name);
  uploadPath2 = path.resolve(__dirname, '..') + '/public/imgs/uploads/' + req.body.name + '_2' + path.extname(imgFile2.name);
  uploadPath3 = path.resolve(__dirname, '..') + '/public/imgs/uploads/' + req.body.name + '_3' + path.extname(imgFile3.name);
  uploadPath4 = path.resolve(__dirname, '..') + '/public/imgs/uploads/' + req.body.name + '_4' + path.extname(imgFile4.name);

  imgFile1.mv(uploadPath1, function (err) {
    if (err)
      return res.status(500).send(err);
  });

  imgFile2.mv(uploadPath2, function (err) {
    if (err)
      return res.status(500).send(err);
  });

  imgFile3.mv(uploadPath3, function (err) {
    if (err)
      return res.status(500).send(err);
  });

  imgFile4.mv(uploadPath4, function (err) {
    if (err)
      return res.status(500).send(err);
  });
  const price = parseFloat(req.body.price);

  
  const prod = new products({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    type: req.body.type,
    image1: req.body.name + '_1' + path.extname(imgFile1.name),
    image2: req.body.name + '_2' + path.extname(imgFile2.name),
    image3: req.body.name + '_3' + path.extname(imgFile3.name),
    image4: req.body.name + '_4' + path.extname(imgFile4.name)
  });

  prod.save()
  .then(result => {
    res.render('adminproducts', { successMessage: 'Product added successfully.' });
  })
  .catch(err => {
    console.log(err);
   
  });
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.prodId;
    const product = await products.findOne({ _id: new ObjectID(productId) });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    const photoPath1 = path.join(__dirname, '../public/imgs/uploads', product.image1);
    const photoPath2 = path.join(__dirname, '../public/imgs/uploads', product.image2);
    const photoPath3 = path.join(__dirname, '../public/imgs/uploads', product.image3);
    const photoPath4 = path.join(__dirname, '../public/imgs/uploads', product.image4);
    fs.unlink(photoPath1, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error deleting photo');
      }
fs.unlink(photoPath2,(err)=>{
  if (err) {
    console.log(err);
    return res.status(500).send('Error deleting photo');
  }
});
fs.unlink(photoPath3,(err)=>{
  if (err) {
    console.log(err);
    return res.status(500).send('Error deleting photo');
  }
});
fs.unlink(photoPath4,(err)=>{
  if (err) {
    console.log(err);
    return res.status(500).send('Error deleting photo');
  }
});
      products.deleteOne({ _id: new ObjectID(productId) })
        .then(() => {
          res.redirect('/');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Error deleting product from the database');
        });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};


const updateProduct = (req, res) => {
  const prodId = req.params.prodId;

  // Retrieve the updated product data from the request body
  const updatedProduct = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    type: req.body.type
  };

  // Update the product in the database
  products.findByIdAndUpdate(prodId, updatedProduct, { new: true })
    .then((updatedProd) => {
      res.render('editproduct', { product: updatedProd, successMessage: 'Product updated successfully.' });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
};

const getProductDetail = (req, res, next) => {
    const productId = req.params.id;
  
    products.findById(productId)
      .then(product => {
        if (!product) {
          const error = new Error('Product not found');
          error.statusCode = 404;
          throw error;
        }
  
        res.render('productdetail', { product });
      })
      .catch(err => {
        next(err);
      });
  };
  
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail
};

