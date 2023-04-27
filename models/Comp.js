const mongoose = require("mongoose") 

const complaintSchema = mongoose.Schema({
  userId:{type:String, require:true},
  username:{type:String, require:true},
  complaint:{type:String, require:true},
  img:{type:String},
},{timestamps:true})

module.exports = mongoose.model("complaint", complaintSchema)