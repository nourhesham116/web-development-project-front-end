const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  category: {
    type: String,
    required: true
  },
  type:{
    type:String,
    required:true
  },
 /* status:{// NEW/on sale/50% off .....etc.
    type: String,
  },*/
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
    //images 3,4 and 5 to have the full product detail display

  image3: {
    type: String,
    //required: true
  },
  image4: {
    type: String,
    //required: true
  }
  
},{ timestamps: true });

const Product = new  mongoose.model('Product', productSchema);

module.exports = Product;