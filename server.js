/////////////////////
const express = require('express');
const ejs = require('ejs');
const users = require('./models/users');
const products = require('./models/product');
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
const productdetailRouter = require("./routes/productdetailRoute");
const urlencodedParser =bodyParser.urlencoded({extended: false})
const app = express()
const port = 3000
const mongoose = require('mongoose')
const  ObjectID = require('mongodb').ObjectId;
const path = require('path');
//////////////////////
app.get('/api',(req,res)=>{
  res.render('api');
})
const axios = require('axios');
const { ppid } = require('process');

app.post('/analyze-skin', (req, res) => {
 // const { imageUrl } = req.body; // Assuming you have a form field with the name "imageUrl"

  // Set the necessary headers and request parameters
  const apiKey = "3K2YwJO_kL3yAxtYy3Rf6Kl08k64ayY-"; // Replace with your Face++ API key
  const apiSecret = 'UUvKKkbqWdqo2LHLdVYF7K8HLJxkx3FY'; // Replace with your Face++ API secret

  const formData = {
    api_key: apiKey,
    api_secret: apiSecret,
    image_url:"/public/imgs/Beautiful-young-woman-with-clean-fresh-skin.jpeg",
  };

  // Make the API request to analyze the skin
  axios.post('https://api-us.faceplusplus.com/facepp/v1/skinanalyze', formData)
    .then(response => {
      const analysisResult = response.data;

      // Pass the analysis result to the EJS template
      res.render('template', { analysisResult });
    })
    .catch(err => {
      console.log(err);
      // Handle the error here
    });
});

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


app.get('/', (req, res) => {
  res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) })
})


app.use('/Skinproducts',productsRouter);
app.use('/Beautyproducts', bproductsRouter);
app.use('/admindashboard', admindashboardRouter);
app.use('/product', productsRouter);

app.get('', (req, res) => {

  res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/index', (req, res) => {
  res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) })
})

app.post('/login-action', (req, res) => {
  console.log("logged")
  var query = { Email: req.body.email, Password: req.body.password };
  users.find(query)
    .then(result => {
      if (result.length > 0) {
        console.log(result[0]);
        req.session.user = result[0];
        res.render('myprofile', { userP: result[0], user: (req.session.user === undefined ? "" : req.session.user) });
      }
      else {
        // Error message: Invalid email or password
        res.render('Account', { error: 'Invalid email or password', email: req.body.email || '', password: req.body.password || '' });
      }
    })
    .catch(err => {
      console.log(err);
      // Error message: An error occurred
      res.render('Account', { error: 'An error occurred', email: req.body.email || '', password: req.body.password || '' });
    });
});

app.get('/Myprofile', (req, res) => {
  res.render('myprofile', { userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user) });
});


app.post('/RegisterationForm', urlencodedParser, [
  check('Firstname', 'Firstname should contain min 3 characters')
    .exists()
    .isLength({ min: 3 }),
  check('Lastname', 'Lastname should contain min 3 characters')
    .exists()
    .isLength({ min: 3 }),
  check('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Invalid email'),
  check('password')
    .exists().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should contain at least 6 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .withMessage('Password should contain at least one letter, one number, and one special character'),
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render('RegisterationForm', {
      alert,
      emailError: errors.array().find(error => error.param === 'email') || null,
    });
  } else {
    const email = req.body.email;
    users.isThisEmailInUse(email)
      .then(inUse => {
        if (inUse) {
          // Email is not in use, proceed with registration
          res.render('RegisterationForm', { emailError: '', alert: [] });
        } else {
          // Email is already in use
          res.render('RegisterationForm', { emailError: 'Email already taken', alert: [] });
        }
      })
      .catch(error => {
        console.log('Error checking email:', error);
        res.render('RegisterationForm', { emailError: 'An error occurred', alert: [] });
      });
  }
});


/////////*/
app.post('/addadmin-action', async (req, res, next) => {

  // const hashPass = await bcrypt.hash(req.body.pass, 10)

  const add = new users({
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
app.get('/Account', (req, res) => {
  if (req.session.user === undefined ? "" : req.session.user) {
    res.redirect('/myprofile')
  }
  else {
    res.render('Account', { user: (req.session.user === undefined ? "" : req.session.user) })
  }
})


app.get('/sophistiqueBeauty', (req, res) => {
  res.render('sophistiqueBeauty')
})
app.get('/checkout', (req, res) => {
  res.render('checkout')
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
  res.render('sophistiqueBeauty', { user: (req.session.user === undefined ? "" : req.session.user) })
})



/*app.get('/adminproducts', (req, res) => {
  res.render('adminproducts', { user: (req.session.user === undefined ? "" : req.session.user) })
})*/

app.get('/adminlogin', (req, res) => {
  res.render('adminlogin')
})
app.get('/RegisterationForm', (req, res) => {
  res.render('RegisterationForm', { user: (req.session.user === undefined ? "" : req.session.user) });
});

app.get('/users', (req, res) => {
  res.render('users')
})
app.get('/bodymoisturizer', (req, res) => {
  res.render('Skinproducts')
})
app.get('/Error404', (req, res) => {
  res.render('Error404')
})
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
/////////////////////////////////////
/*app.get('/editproduct/:prodId',(req,res)=>{
  products.findById(req.params.prodId).then(function (prod){
    res.render('editproduct',{product:prod});
  })
  
})*/


// Custom error handling middleware
app.use((req, res, next) => {
  res.status(404).render('Error404');
});


//app.get('/RegisterationForm', (req, res) => {
 // res.render('RegisterationForm', { errorMessages: req.flash('error') });
//});

//app.post('/RegisterationForm', validateUser, saveUser);


module.exports = { app };


