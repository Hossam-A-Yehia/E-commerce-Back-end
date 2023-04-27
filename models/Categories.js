const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
  title:{type:String, require:true, unique:true},
  img:{type:String, require:true},
},{timestamps:true})

module.exports = mongoose.model("category", categorySchema)