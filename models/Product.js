const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  title:{type:String, require:true, unique:true},
  desc:{type:String, require:true},
  img:{type:String, require:true},
  categories:{type:Array},
  size:{type:Array},
  color:{type:Array},
  price:{type:Number, require:true},
  rate:{type:Number},
},{timestamps:true})

module.exports = mongoose.model("product", productSchema)