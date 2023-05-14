
const express=require('express');
const ejs = require('ejs');
const prodRouter= require("./routes/productsRoute.js");
const app=express()
const port=3000

app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/js',express.static(__dirname +'public/javascript'))
app.use('/imgs',express.static(__dirname +'public/imgs'))

app.set('views','./views')
app.set('view engine','ejs')
app.use('/body',prodRouter);
app.get('',(req,res)=>{
    res.render('index')
})
app.get('/index',(req,res)=>{
    res.render('index')
})
app.get('/productdetail',(req,res)=>{
    res.render('productdetail')
})
app.get('/Account',(req,res)=>{
    res.render('Account')
})
app.get('/sophistique_beauty_main',(req,res)=>{
    res.render('sophistique_beauty_main')
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






app.listen(port,()=>console.info(`listening on port ${port}`));







