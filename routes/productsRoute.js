const express = require('express');
const router = express.Router();
const Product = require("../models/product")
const productController = require('../controllers/product.controller');
const itemsPerPage = 10; // Number of items to display per page

//const Product = new  mongoose.model('Product', productSchema);

router.get('/', function (req, res, next) {
  Product.find({ category: 'SKIN' }).then(function (product) {
    res.render('Skinproducts', {
      productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
    })
  })

});


router.get('/bodymoisturizer', function (req, res, next) {
  Product.find({ type: 'body moisturizer' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});

router.get('/bodycleanser', function (req, res, next) {
  Product.find({ type:'body cleanser' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});


router.get('/allskin', function (req, res, next) {
  Product.find({ category:"SKIN"}).then(function (product) {
    res.render('Skinproducts', {
      productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
    })
  })

});

router.get('/facemoisturizer', function (req, res, next) {
  Product.find({ type:"Face moisturizer"}).then(function (product) {
    res.render('Skinproducts', {
      productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
    })
  })

});


router.get('/newmeltawf', function (req, res, next) {
  Product.find({ name: 'Melt AWF' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});

router.get('/new', function (req, res, next) {
  Product.find({ type: 'new' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});
router.get('/face', function (req, res, next) {
  Product.find({  $or: [{ type: 'Face moisturizer' }, { type: 'face cleanser' },{ type: 'toner' },{type:"mask and treatment"},{type:"lip care"},{type:"eye cream"},{type:"suncream"}]}).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});
router.get('/body', function (req, res, next) {
  Product.find({  $or: [{ type: 'body mists' }, { type: 'body cleanser' },{ type: 'body moisturizer' }]}).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});
router.get('/bodymists', function (req, res, next) {
  Product.find({ type: 'body mists' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});


router.get('/newplushpuddin', function (req, res, next) {
  Product.find({ name: 'Fenty Plush Puddin lip mask' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
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
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});

router.get('/toner', function (req, res, next) {
  Product.find({ type: 'toner' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});

router.get('/lipcare', function (req, res, next) {
  Product.find({ type: 'lip care' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});

router.get('/masks', function (req, res, next) {
  Product.find({ type: 'mask and treatment' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});


router.get('/eyecream', function (req, res, next) {
  Product.find({ type: 'eye cream' }).then(function (product) {
    res.render('Skinproducts', {
            productsList: product, userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user)
          })
  });
});
router.get('/productdetail/:id', productController.getProductDetail);

module.exports = router;