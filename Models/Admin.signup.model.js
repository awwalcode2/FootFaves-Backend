const mongoose = require("mongoose")

const adminUserSchema = mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String,required:true},
    password: {type:String,required:true},
    email: {type:String,required:true, unique:true },
}, {timeStamps:true})


const adminUserModel = mongoose.model("adminauthorisation", adminUserSchema)
module.exports = adminUserModel