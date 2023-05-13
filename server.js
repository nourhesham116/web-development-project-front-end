
const express=require('express');
const ejs = require('ejs');
const app=express()
const port=3000

app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/js',express.static(__dirname +'public/javascript'))
app.use('/imgs',express.static(__dirname +'public/imgs'))

app.set('views','./views')
app.set('view engine','ejs')

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





app.listen(port,()=>console.info(`listening on port ${port}`));







