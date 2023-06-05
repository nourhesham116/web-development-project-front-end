const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const productController = require('../controllers/product.controller');

const ITEMS_PER_PAGE = 5;
//const Product = new  mongoose.model('Product', productSchema);
router.get('/', function (req, res, next) {
  const page = req.query.page || 1; // Get the current page from the query parameters
   // Define the number of items per page

  // Calculate the skip value based on the current page and items per page
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Retrieve the products with pagination
  Product.find({ category: 'SKIN' })
    .skip(skip)
    .limit(ITEMS_PER_PAGE)
    .then(function (products) {
      // Count the total number of products for pagination
      Product.countDocuments({ category: 'SKIN' }).then(function (count) {
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user || null,
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        });
      });
    })
    .catch(function (error) {
      next(error);
    });
});


router.get('/bodymoisturizer', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ type: 'body moisturizer' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ type: 'body moisturizer' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
          
          
          
        });
      });
  });
});


router.get('/bodycleanser', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ type: 'body cleanser' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ type: 'body cleanser' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        });
      });
  });
});



router.get('/bodycleanser', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ type: 'body cleanser' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ type: 'body cleanser' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
         
        });
      });
  });
});

router.get('/allskin', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ category: 'SKIN' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ category: 'SKIN' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
          
        });
      });
  });
});

router.get('/facemoisturizer', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ type: 'Face moisturizer' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ type: 'Face moisturizer' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
          
        });
      });
  });
});

router.get('/newmeltawf', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ name: 'Melt AWF' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ name: 'Melt AWF' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
         
        });
      });
  });
});


router.get('/new', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ type: 'new' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ type: 'new' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        
        });
      });
  });
});
router.get('/face', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({
    $or: [
      { type: 'Face moisturizer' },
      { type: 'face cleanser' },
      { type: 'toner' },
      { type: 'mask and treatment' },
      { type: 'lip care' },
      { type: 'eye cream' },
      { type: 'suncream' }
    ]
  }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({
      $or: [
        { type: 'Face moisturizer' },
        { type: 'face cleanser' },
        { type: 'toner' },
        { type: 'mask and treatment' },
        { type: 'lip care' },
        { type: 'eye cream' },
        { type: 'suncream' }
      ]
    })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        });
      });
  });
});
router.get('/body', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({
    $or: [
      { type: 'body mists' },
      { type: 'body cleanser' },
      { type: 'body moisturizer' }
    ]
  }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({
      $or: [
        { type: 'body mists' },
        { type: 'body cleanser' },
        { type: 'body moisturizer' }
      ]
    })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        });
      });
  });
});
router.get('/bodymists', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ type: 'body mists' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ type: 'body mists' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        });
      });
  });
});

router.get('/newplushpuddin', function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Get the current page from the query parameters
  const skipItems = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of items to skip

  // Use the `countDocuments` method to get the total count of products matching the filter
  Product.countDocuments({ name: 'Fenty Plush Puddin lip mask' }).then(function (totalProducts) {
    // Use the `find` method with pagination parameters to fetch the products
    Product.find({ name: 'Fenty Plush Puddin lip mask' })
      .skip(skipItems)
      .limit(ITEMS_PER_PAGE)
      .then(function (products) {
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate the total number of pages

        res.render('Skinproducts', {
          productsList: products,
          userP: req.session.user,
          user: req.session.user ? req.session.user : "",
          currentPage: page,
          totalPages: totalPages,
          cart:(req.session.cart===undefined?"":req.session.cart)
        });
      });
  });
});

router.get('/allskin', function (req, res, next) {
  Product.find({ category:"SKIN" }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});
router.get('/facecleanser', function (req, res, next) {
  Product.find({ type: 'face cleanser' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product,
             userP: req.session.user,
              user: (req.session.user === undefined ? "" : req.session.user),
              cart:(req.session.cart===undefined?"":req.session.cart)
          })
  });
});

router.get('/toner', function (req, res, next) {
  Product.find({ type: 'toner' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product,
             userP: req.session.user,
              user: (req.session.user === undefined ? "" : req.session.user),
              cart:(req.session.cart===undefined?"":req.session.cart)
          })
  });
});

router.get('/lipcare', function (req, res, next) {
  Product.find({ type: 'lip care' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product,
             userP: req.session.user,
              user: (req.session.user === undefined ? "" : req.session.user),
              cart:(req.session.cart===undefined?"":req.session.cart)
          })
  });
});

router.get('/masks', function (req, res, next) {
  Product.find({ type: 'mask and treatment' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product,
             userP: req.session.user, 
             user: (req.session.user === undefined ? "" : req.session.user),
             cart:(req.session.cart===undefined?"":req.session.cart)
          })
  });
});


router.get('/eyecream', function (req, res, next) {
  Product.find({ type: 'eye cream' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product,
             userP: req.session.user,
              user: (req.session.user === undefined ? "" : req.session.user),
              cart:(req.session.cart===undefined?"":req.session.cart)
          })
  });
});
router.get('/productdetail/:id', productController.getProductDetail);

module.exports = router;