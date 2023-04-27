const mongoose = require("mongoose") 

const commentSchema = mongoose.Schema({
  productId:{type:String, require:true},
  userId:{type:String, require:true},
  username:{type:String, require:true},
  comment:{type:String, require:true},
  img:{type:String},
  productImg:{type:String, require:true},
  productTitle:{type:String, require:true}
},{timestamps:true})

module.exports = mongoose.model("comment", commentSchema)