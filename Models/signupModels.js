const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String,required:true},
    password: {type:String,required:true},
    email: {type:String,required:true, unique:true },
}, {timeStamps:true})


const userModel = mongoose.model("authorisation",userSchema)
module.exports = userModel