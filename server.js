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
const userRouter = require("./routes/userRoute.js");
const cartRouter=require("./routes/cartRoute")
const productdetailRouter = require("./routes/productdetailRoute");
const urlencodedParser =bodyParser.urlencoded({extended: false});
const app = express()
const port = 3000;
const mongoose = require('mongoose')
const  ObjectID = require('mongodb').ObjectId;
const path = require('path');
//const axios = require('axios');
//////////////////////
const API_KEY = 'your_api_key';

const Fs = require('fs');
const axios = require('axios');
const Formdata = require('form-data');

const imagePath = path.join(__dirname, '../public/imgs', 'girl.png');
const formData = new Formdata();
/*async function analyzeSkin() {
const data = new Formdata();
data.append('image',imagePath );
data.append('max_face_num', '1');

const options = {
  method: 'POST',
  url: 'https://skin-analysis.p.rapidapi.com/face/effect/skin_analyze',
  headers: {
    'X-RapidAPI-Key': '9ef28e2594msh70a2a82edf792e5p158565jsnaa6eea7ce44d',
    'X-RapidAPI-Host': 'skin-analysis.p.rapidapi.com',
    ...data.getHeaders(),
  },
  data: data
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}
analyzeSkin();*/
///////////////
formData.append('image', Fs.createReadStream(imagePath));
formData.append('max_face_num', '1');


  axios.post('https://skin-analysis.p.rapidapi.com/face/effect/skin_analyze', formData, {
  headers: {
    ...formData.getHeaders(),
    'X-RapidAPI-Key': '9ef28e2594msh70a2a82edf792e5p158565jsnaa6eea7ce44d',
    'X-RapidAPI-Host': 'skin-analysis.p.rapidapi.com',
  }
})
  .then(response => {
    
    const { result } = response.data;
    const { face_num, face_list } = result;

    console.log('Skin Analysis Result:', result);
    console.log('Number of Detected Faces:', face_num);
    console.log('Face List:', face_list);
  })
  .catch(error => {
    console.error(error);
  });


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
app.get('', (req, res) => {

  res.render('index', { user: (req.session.user === undefined ? "" : req.session.user),
  cart: (req.session.cart === undefined ? "" : req.session.cart)  })
})
app.get('/index', (req, res) => {

  res.render('index', { user: (req.session.user === undefined ? "" : req.session.user),
  cart: (req.session.cart === undefined ? "" : req.session.cart)  })
})
app.get('/', (req, res) => {

  res.render('index', { user: (req.session.user === undefined ? "" : req.session.user),
  cart: (req.session.cart === undefined ? "" : req.session.cart)  })
});
app.use('/Skinproducts',productsRouter);
app.use('/Beautyproducts', bproductsRouter);
app.use('/admindashboard', admindashboardRouter);
app.use('/product', productsRouter);
app.use('/Account',userRouter);
app.use('/addtocart',cartRouter);

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

app.get('/sophistiqueBeauty', (req, res) => {
  res.render('sophistiqueBeauty')
})
app.get('/checkout', (req, res) => {
  res.render('checkout')
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
  res.render('sophistiqueBeauty', { user: (req.session.user === undefined ? "" : req.session.user) })
})


app.get('/adminlogin', (req, res) => {
  res.render('adminlogin')
})

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
app.use((req, res, next) => {
  res.status(404).render('Error404');
});





module.exports = { app };


