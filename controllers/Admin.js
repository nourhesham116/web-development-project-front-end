const product = require('../models/product');
const user = require('../models/users');
const path = require('path');
const fs = require('fs');


const addproduct = (req, res) => {
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
    uploadPath1 =require('path').resolve(__dirname, '..')+'/public/imgs/uploads/' + req.body.name+"_1" + path.extname(imgFile1.name);//awl part gets the parent directory elhya feha aslan public folder
    uploadPath2 =require('path').resolve(__dirname, '..')+'/public/imgs/uploads/' + req.body.name +"_2"+ path.extname(imgFile2.name);
    uploadPath3 =require('path').resolve(__dirname, '..')+'/public/imgs/uploads/' + req.body.name +"_3"+ path.extname(imgFile3.name);
    uploadPath4 =require('path').resolve(__dirname, '..')+'/public/imgs/uploads/' + req.body.name +"_4"+ path.extname(imgFile4.name);
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
      
}
module.exports = {
        addproduct
      };