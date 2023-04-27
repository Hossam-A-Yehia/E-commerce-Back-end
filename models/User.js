const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username:{type:String, require:true, unique:true},
  email:{type:String, require:true, unique:true},
  password:{type:String, require:true},
  address:{type:String, require:true},
  phone:{type:Number, require:true},
  isAdmin:{type:Boolean, default:false},
  img:{type:String, default:"https://i.pinimg.com/564x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"},

},{timestamps:true})

module.exports = mongoose.model("user", userSchema)