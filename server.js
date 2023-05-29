
const express = require('express');
const ejs = require('ejs');
const users = require('./models/users');
const products = require('./models/product');

////////////////
const cookieParser = require("cookie-parser");
const session = require('express-session');
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const multer = require('multer');
const busboy = require('connect-busboy');//ashan swar
//////////////////
const prodRouter = require("./routes/productsRoute.js");
const admindashboardRouter = require("./routes/admindashboardRoute.js");
const addproductsRouter = require("./routes/addproductsRoute.js");
const productdetailRouter = require("./routes/productdetailRoute");
const app = express()
const port = 3000
const mongoose = require('mongoose')
const path = require('path');

app.use(express.static('public'))
//////////////

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/javascript'))
app.use('/imgs', express.static(__dirname + 'public/imgs'))
app.use('/uploads', express.static(__dirname + 'public/imgs/uploads'))
const dburi = 'mongodb+srv://nour_hesham:Nour11062003@cluster0.1kyqmes.mongodb.net/cluster0?retryWrites=true&w=majority'

mongoose.connect(dburi).then(result => app.listen(port, () => console.info(`listening on port ${port}`))).catch(err => console.log(err))
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

app.use( '/body',prodRouter);
app.use('/admindashboard',admindashboardRouter)
app.use('/addproduct-action',addproductsRouter)
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
        res.send('invalid data')
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/Myprofile', (req, res) => {
  res.render('myprofile', { userP: req.session.user, user: (req.session.user === undefined ? "" : req.session.user) });
});
app.post('/RegisterationForm-action', async (req, res) => {
  const user = new users({
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Email: req.body.email,
    Password: req.body.password,
    Type: req.body.type
  });
  await user.save()
    .then(result => {
      res.redirect('/Account');
    })
    .catch(err => {
      console.log(err);
    });
});
/////////////
/*app.post('/addproduct-action',(req, res) => {
  let imgFile1,imgFile2,imgFile3,imgFile4;
  let uploadPath1,uploadPath2,uploadPath3,uploadPath4;
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  imgFile1 = req.files.image1;
  imgFile2 = req.files.image2;
  imgFile3 = req.files.image3;
  imgFile4 = req.files.image4;
  uploadPath1 =__dirname+'/public/imgs/uploads/' + req.body.name+"_1" + path.extname(imgFile1.name);
  uploadPath2 =__dirname+'/public/imgs/uploads/' + req.body.name +"_2"+ path.extname(imgFile2.name);
  uploadPath3 =__dirname+'/public/imgs/uploads/' + req.body.name +"_3"+ path.extname(imgFile3.name);
  uploadPath4 =__dirname+'/public/imgs/uploads/' + req.body.name +"_4"+ path.extname(imgFile4.name);
  // Use the mv() method to place the file somewhere on your server
  imgFile1.mv(uploadPath1, function (err) {
    if (err)
      return res.status(500).send(err);
  })
  imgFile2.mv(uploadPath2, function (err) {
    if (err)
      return res.status(500).send(err);
  })
  imgFile3.mv(uploadPath3, function (err) {
    if (err)
      return res.status(500).send(err);
  })
  imgFile4.mv(uploadPath4, function (err) {
    if (err)
      return res.status(500).send(err);
  })
  
  const prod= new products({
    name: req.body.name,
    price: req.body.price,
    description:req.body.description,
    category:req.body.category,
    type:req.body.type,
    image1: req.body.name+"_1" + path.extname(imgFile1.name),
    image2: req.body.name+"_2" + path.extname(imgFile2.name),
    image3: req.body.name+"_3" + path.extname(imgFile3.name),
    image4: req.body.name+"_4" + path.extname(imgFile4.name)
    
  });
  prod.save()
    .then(result => {
      res.redirect('/adminproducts');
    })
    .catch(err => {
      console.log(err);
    });
});
///////////*/
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
      res.redirect('/admindashboard')
      // res.render('admin/admin-dashboard.ejs')
    })
    .catch(err => {
      console.log(err);
    })
});


////////////////////////////

/*app.get('/admindashboard', (req, res) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
    users.find()
      .then(result => {
        res.render('admindashboard', { users: result, user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
  }
  else {
    res.send('you are not admin');
  }
});*/
////////////////////

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
app.get('/allface', (req, res) => {
  res.render('allface', { user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/Lipbalm+treatment', (req, res) => {
  res.render('Lipbalm+treatment', { user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/skincarePage1', (req, res) => {
  res.render('skincarePage1', { user: (req.session.user === undefined ? "" : req.session.user) })
})

/*app.get('/adminstatistics', (req, res) => {
  res.render('adminstatistics', { user: (req.session.user === undefined ? "" : req.session.user) })
})*/


app.get('/sophistiqueBeauty', (req, res) => {
  res.render('sophistiqueBeauty', { user: (req.session.user === undefined ? "" : req.session.user) })
})

app.get('/adminproducts', (req, res) => {
  res.render('adminproducts', { user: (req.session.user === undefined ? "" : req.session.user) })
})

app.get('/adminlogin', (req, res) => {
  res.render('adminlogin')
})
app.get('/RegisterationForm', (req, res) => {
  res.render('RegisterationForm', { user: (req.session.user === undefined ? "" : req.session.user) });
});
app.get('/users', (req, res) => {
  res.render('users')
})
app.get('/Error404', (req, res) => {
  res.render('Error404')
})
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = { app };