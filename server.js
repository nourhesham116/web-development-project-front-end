
const express=require('express');
const ejs = require('ejs');
const app=express()
const port=3000

app.use(express.static('public'))
app.use('/css',express.static(__dirname +'public/css'))
app.use('/js',express.static(__dirname +'public/javascript'))
app.use('/imgs',express.static(__dirname +'public/imgs'))

app.set('views','./views')
app.set('view engine', 'ejs');
 

app.listen(port,()=> console.info(`listening on port ${port}`))

app.get('/', function (req, res) {
    res.render('pages/index');
});
app.get('/login', (req, res) => {
    res.render('login', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.get('/skincarepage', function (req, res) {
        res.render('skincare');
});
app.use((req, res) => {
  res.status(404).render('404', { userName: (req.session.userName === undefined ? "" : req.session.userName) });
 });













