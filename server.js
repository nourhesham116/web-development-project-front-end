
const express=require('express');
const ejs = require('ejs');
const users = require('./models/users');
////////////////
const cookieParser=require("cookie-parser");
const session = require('express-session');
const fileUpload = require('express-fileupload');
const morgan=require("morgan");
//////////////////
const prodRouter= require("./routes/productsRoute.js");
const app=express()
const port=3000
const mongoose=require('mongoose')
const path = require('path')
app.use(express.static('public'))
//////////////

app.use('/css',express.static(__dirname +'public/css'))
app.use('/js',express.static(__dirname +'public/javascript'))
app.use('/imgs',express.static(__dirname +'public/imgs'))
const dburi='mongodb+srv://nour_hesham:Nour11062003@cluster0.1kyqmes.mongodb.net/cluster0?retryWrites=true&w=majority'

mongoose.connect(dburi)
.then(result=>app.listen(port,()=>console.info(`listening on port ${port}`)))
.catch(err=> console.log(err))



/////////////////
// default options
app.use(fileUpload());
app.use(express.static('public'));
app.use(session({ secret: 'Your_Secret_Key' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/////////////////////////
app.set('views','./views')
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.render('index',{ user: (req.session.user === undefined ? "" : req.session.user) })
})

app.use('/body',prodRouter);
app.get('',(req,res)=>{

    res.render('index',{ user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/index',(req,res)=>{
    res.render('index',{ user: (req.session.user === undefined ? "" : req.session.user) })
})
app.post('/login-action', (req, res) => {
    var query = { Email:req.body.email, Password: req.body.password };
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
        Email:req.body.email,
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

app.get('/productdetail',(req,res)=>{
    res.render('productdetail',{ user: (req.session.user === undefined ? "" : req.session.user) })
})
app.get('/Account',(req,res)=>{
    if(req.session.user === undefined ? "" : req.session.user){
        res.redirect('/myprofile')
    }
    else{
    res.render('Account',{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
})

app.get('/sophistiqueBeauty',(req,res)=>{
    res.render('sophistiqueBeauty')
})
app.get('/allface',(req,res)=>{
    res.render('allface')
})
app.get('/Lipbalm+traetment',(req,res)=>{
    res.render('Lipbalm+traetment')
})
app.get('/RegisterationForm',(req,res)=>{
    res.render('RegisterationForm')
})
app.get('/skincarePage1',(req,res)=>{
    res.render('skincarePage1')
})

app.get('/admindashboard',(req,res)=>{
    res.render('admindashboard')
})


app.get('/adminstatistics',(req,res)=>{
    res.render('adminstatistics')
})


app.get('/sophistiqueBeauty',(req,res)=>{
    res.render('sophistiqueBeauty')
})

app.get('/adminproducts',(req,res)=>{
    res.render('adminproducts')
})

app.get('/adminlogin',(req,res)=>{
    res.render('adminlogin')
})
app.get('/RegisterationForm',(req,res)=>{
    res.render('RegisterationForm',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

module.exports={app};

