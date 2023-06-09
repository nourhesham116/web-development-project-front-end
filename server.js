/////////////////////
const express = require('express');
const ejs = require('ejs');
const users = require('./models/users');
const products = require('./models/product');
const orders = require('./models/orders');
//const Joi = require('joi');
const bodyParser =require('body-parser')
const { check, validationResult } = require('express-validator');
////////////////
const cookieParser = require("cookie-parser");
const session = require('express-session');
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const multer = require('multer');
const busboy = require('connect-busboy');//ashan swar
//////////////////
const productsRouter = require("./routes/productsRoute.js");
const bproductsRouter = require("./routes/bproductsRoute.js");
const admindashboardRouter = require("./routes/admindashboardRoute.js");
const userRouter = require("./routes/userRoute.js");
const cartRouter=require("./routes/cartRoute")
const bcrypt = require('bcrypt');
const productdetailRouter = require("./routes/productdetailRoute");
const urlencodedParser =bodyParser.urlencoded({extended: false});
const app = express()
const port = 3000;
const mongoose = require('mongoose')
const  ObjectID = require('mongodb').ObjectId;
const path = require('path');
////////////////
const cors=require('cors');
const Fs = require('fs');
const axios = require('axios');
const Formdata = require('form-data');
app.use(cors());

const imagePath = 'C:/Users/Nour Hesham/Desktop/public/imgs/gril3.jpg'
const formData = new Formdata();
///////////////
/*formData.append('api_key', 'CbZBp_2WMw5EMfSJFF7zno5l1ro8ZtMB');
formData.append('api_secret', '5M-hajpRYpDQGRaqc05RjabqL1F5UTjK');

Fs.readFile(imagePath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  const base64Image = Buffer.from(data).toString('base64');
  formData.append('image_base64', base64Image);

  axios.post('https://api-us.faceplusplus.com/facepp/v1/skinanalyze', formData, {
    headers: formData.getHeaders()
  })
    .then(response => {
      console.log(response.data.result.eye_pouch);
    })
    .catch(error => {
      console.error(error);
    });
});*/
//skinAnalysis();*/
/////////////////////////

const { ppid } = require('process');

const FormData = require('form-data');
const fs = require('fs');
const Product = require('./models/product');

///////////////////////////////////////////////////////
//const flash = require('connect-flash');
//const { validateUser } = require('./middlewares/validation');
//const { saveUser } = require('./controllers/auth.controllers');

app.use(express.static('public'))


app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/javascript'))
app.use('/imgs', express.static(__dirname + 'public/imgs'))
app.use('/uploads', express.static(__dirname + 'public/imgs/uploads'))
const dburi = 'mongodb+srv://nour_hesham:Nour11062003@cluster0.1kyqmes.mongodb.net/cluster0?retryWrites=true&w=majority'

mongoose.connect(dburi,).then(result => 
  app.listen(port, () => 
  console.info(`listening on port ${port}`)))
  .catch(err => console.log(err))
/////////////

/////////////////
// default options
app.use(fileUpload());
app.use(express.static('public'));
app.use(session(
  { secret: 'Your_Secret_Key' })
  )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/////////////////////////
app.set('views', './views')
app.set('view engine', 'ejs')
app.get('/', function(req, res, next) {
  orders.aggregate([
    {
      $unwind: '$items' // byfok item array elf kol order
    },
    {
      $group: {
        _id: '$items.product', // da elproduct id fl schema
        count: { $sum: 1 } // Count the occurrences of each product
      }
    },
    {
      $sort: {
        count: -1 // Sort by count in descending order
      }
    },
    {
      $limit: 10 // akssa haga 10
    },
    {
      $project: { //by3dl eldocument
        _id: 0, // Exclude the _id field from the result
        product: '$_id', // Rename the _id field to `product`
        count: 1 // Include the count field in the result
      }
    }
  ])
    .then(result => {
      const topProductIDs = result.map(item => item.product);
      Product.find({ _id: { $in: topProductIDs } }) // Fetch the products based on the IDs
        .then(products => {
          res.render('index', {
            products: products,
            userP: req.session.user,
            user: req.session.user ? req.session.user : "",
            cart: req.session.cart === undefined ? "" : req.session.cart
          });
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          res.status(500).send('Error fetching products');
        });
    })
    .catch(error => {
      console.error('Error retrieving top product IDs:', error);
      res.status(500).send('Error retrieving top product IDs');
    });
});
app.get('/', function(req, res, next) {
  orders.aggregate([
    {
      $unwind: '$items' // Unwind the `items` array to create a separate document for each item
    },
    {
      $group: {
        _id: '$items.product', // Group by the product field
        count: { $sum: 1 } // Count the occurrences of each product
      }
    },
    {
      $sort: {
        count: -1 // Sort by count in descending order
      }
    },
    {
      $limit: 10 // Limit the result to 10 documents
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result
        product: '$_id', // Rename the _id field to `product`
        count: 1 // Include the count field in the result
      }
    }
  ])
    .then(result => {
      const topProductIDs = result.map(item => item.product);
      Product.find({ _id: { $in: topProductIDs } }) // Fetch the products based on the IDs
        .then(products => {
          res.render('index', {
            products: products,
            userP: req.session.user,
            user: req.session.user ? req.session.user : "",
            cart: req.session.cart === undefined ? "" : req.session.cart
          });
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          res.status(500).send('Error fetching products');
        });
    })
    .catch(error => {
      console.error('Error retrieving top product IDs:', error);
      res.status(500).send('Error retrieving top product IDs');
    });
});
app.get('/index', function(req, res, next) {
  orders.aggregate([
    {
      $unwind: '$items' // Unwind the `items` array to create a separate document for each item
    },
    {
      $group: {
        _id: '$items.product', // Group by the product field
        count: { $sum: 1 } // Count the occurrences of each product
      }
    },
    {
      $sort: {
        count: -1 // Sort by count in descending order
      }
    },
    {
      $limit: 10 // Limit the result to 10 documents
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the result
        product: '$_id', // Rename the _id field to `product`
        count: 1 // Include the count field in the result
      }
    }
  ])
    .then(result => {
      const topProductIDs = result.map(item => item.product);
      Product.find({ _id: { $in: topProductIDs } }) // Fetch the products based on the IDs
        .then(products => {
          res.render('index', {
            products: products,
            userP: req.session.user,
            user: req.session.user ? req.session.user : "",
            cart: req.session.cart === undefined ? "" : req.session.cart
          });
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          res.status(500).send('Error fetching products');
        });
    })
    .catch(error => {
      console.error('Error retrieving top product IDs:', error);
      res.status(500).send('Error retrieving top product IDs');
    });
});

app.use('/Skinproducts',productsRouter);
app.use('/Beautyproducts', bproductsRouter);
app.use('/admindashboard', admindashboardRouter);
app.use('/product', productsRouter);
app.use('/Account',userRouter);
app.use('/addtocart',cartRouter);
app.get('/skinAnalysis',(req,res)=>{
res.render('skinAnalysis');
});
app.post('/addadmin-action', async (req, res, next) => {

  // const hashPass = await bcrypt.hash(req.body.pass, 10)

  const add = new 
  ({
    Firstname: req.body.Firstname,
    Lastname:req.body.Lastname,
    Email:req.body.Email,
    Password: req.body.Password,
    Type:req.body.Type
  })
  add.save()
    .then((result) => {
      console.log('registration successful!')
      res.redirect('/admindashboard' )
      // res.render('admin/admin-dashboard.ejs')
    })
    .catch(err => {
      console.log(err);
    })
});

app.get('/productdetail', (req, res) => {
  res.render('productdetail', { user: (req.session.user === undefined ? "" : req.session.user) })
})


app.get('/bsearch',(req,res)=>{
 res.render('bsearch');
})

app.post('/bsearch', async (req, res) => {
  let payload = req.body.payload.trim();
  try {
    let prodsearch = await products.find({
    
       name: { $regex: new RegExp('^' + payload + '.*', 'i')}
    }).exec();

    if (prodsearch) {
      // Limit search results to 3
      prodsearch = prodsearch.slice(0, 3);
      res.send({ payload: prodsearch });
    } else {
      // Handle the case when prodsearch is undefined
      res.send({ payload: [] });
    }
  } catch (error) {
    console.log('Error in search:', error);
    res.send({ payload: [] });
  }
});

app.get('/osearch', (req, res) => {
  res.render('osearch');
});

app.post('/osearch', async (req, res) => {
  let payload = req.body.payload.trim();
  try {
    let orderSearch = await orders.find({
      firstname: { $regex: new RegExp('^' + payload + '.*', 'i') },
    }).exec();

    if (orderSearch) {
      // Limit search results to 3
      orderSearch = orderSearch.slice(0, 3);
      res.send({ payload: orderSearch });
    } else {
      // Handle the case when orderSearch is undefined
      res.send({ payload: [] });
    }
  } catch (error) {
    console.log('Error in search:', error);
    res.send({ payload: [] });
  }
});



app.get('/sophistiqueBeauty', (req, res) => {
  Product.find({ category: 'BEAUTY' })
    .then(function (productsList) {
      // Render the index template with the product list
      res.render('sophistiqueBeauty', {
        productsList: productsList,
        user: (req.session.user === undefined ? "" : req.session.user),
        cart: (req.session.cart === undefined ? "" : req.session.cart)
      });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('An error occurred');
    });
});

app.get('/checkout', (req, res) => {
  res.render('checkout', { user: (req.session.user === undefined ? "" : req.session.user),
  cart: (req.session.cart === undefined ? "" : req.session.cart)  })
})
app.get('/partials/addtocart', (req, res) => {

  res.render('/partials/addtocart', { user: (req.session.user === undefined ? "" : req.session.user),
  cart: (req.session.cart === undefined ? "" : req.session.cart)  })
})

app.get('/allface', (req, res) => {
  res.render('allface', { user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/Liptreatment', (req, res) => {
  res.render('Liptreatment', { user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/skincarePage1', (req, res) => {
  res.render('skincarePage1', { user: (req.session.user === undefined ? "" : req.session.user) })
})

app.get('/adminstatistics', (req, res) => {
  res.render('adminstatistics', { user: (req.session.user === undefined ? "" : req.session.user) })
})


app.get('/sophistiqueBeauty', (req, res) => {
  Product.find({ category: 'BEAUTY' })
  .then(function (productsList) {
    // Render the index template with the product list
    res.render('sophistiqueBeauty', {
      productsList: productsList,
      user: (req.session.user === undefined ? "" : req.session.user),
      cart: (req.session.cart === undefined ? "" : req.session.cart)
    });
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  });
})


app.post('/Account/RegisterationForm', urlencodedParser, [
  check('Firstname', 'Firstname should contain min 3 characters').exists().isLength({ min: 3 }),
  check('Lastname', 'Lastname should contain min 3 characters').exists().isLength({ min: 3 }),
  check('email').exists().withMessage('Email is required').isEmail().withMessage('Invalid email').custom(async (email) => {
    const emailInUse = await users.isThisEmailInUse(email);
    if (!emailInUse) throw new Error('Email already taken');
  }),
  check('password')
    .exists().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should contain at least 6 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage('Password should contain at least one letter, one number, and one special character'),
], async (req, res) => {
  const errors = validationResult(req);
  const query = { "Email": req.body.email };
  try {
    const result = await users.find(query);
    

    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('RegisterationForm', {
        alert,
        user: req.session.user === undefined ? "" : req.session.user,
        cart: req.session.cart === undefined ? "" : req.session.cart
      });
    } else {
      const emailInUse = await users.isThisEmailInUse(req.body.email);
      if (emailInUse) {
        const user = new users({
          Firstname: req.body.Firstname,
          Lastname: req.body.Lastname,
          Email: req.body.email,
          Password: req.body.password,
          Type: req.body.type
        });
        await user.save();
        res.redirect('/Account');
      } else {
        const alert = [{ msg: 'Email already taken' }];
        res.render('RegisterationForm', {
          alert,
          emailError: errors.mapped().email ? errors.mapped().email.msg : ''
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/adminlogin', (req, res) => {
  res.render('adminlogin')
})

app.get('/users', (req, res) => {
  res.render('users')
})
app.get('/remusers', (req, res) => {
  users.find()
        .then(result => {
          res.render('remusers', { users: result, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch(err => {
          console.log(err);
        });
 
})

app.post('/remusers', async (req, res) => {
  const { userId } = req.body;
  
  try {
    // Find the user by ID and remove it
    const deletedUser = await users.findByIdAndRemove(userId);
    
    if (deletedUser) {
      // User successfully deleted
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      // User not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Error occurred while deleting the user
    res.status(500).json({ error: 'Failed to delete the user' });
  }
});
app.get('/bodymoisturizer', (req, res) => {
  res.render('Skinproducts')
})




app.get('/vieworders', (req, res) => {
  orders.find()
    .sort({ createdAt: -1 }) // Sort orders by descending creation date
    .exec()
    .then((orders) => {
      res.render('vieworders', { orders });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

module.exports = app;


  

app.get('/Error404', (req, res) => {
  res.render('Error404')
})
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
app.post('/PlaceOrder', async (req, res) => {
  console.log("we are here");
  const { firstname, lastname, email, addressline, city } = req.body;
  let total = 0;

  // Calculate the total based on req.session.cart
  for (let i = 0; i < req.session.cart.length; i++) {
    total += req.session.cart[i].totalCart;
  }

  // Create a new instance of the orders schema
  const newOrder = new orders({
    firstname,
    lastname,
    email,
    addressline,
    city,
    total,
    items: req.session.cart,
  });

  // Save the new order to the database
  try {
    const result = await newOrder.save();
    // Order saved successfully
    // Clear the cart after placing the order
    req.session.cart = [];

    

    res.redirect('/Account');
  } catch (err) {
    console.log('Error saving order:', err);
    res.render('ErrorPage', {
      message: 'An error occurred while placing the order',
      user: req.session.user === undefined ? '' : req.session.user,
      cart: req.session.cart === undefined ? '' : req.session.cart,
    });
  }
});

app.use((req, res, next) => {
  res.status(404).render('Error404');
});




module.exports = { app };


