const mongoose = require("mongoose")


const adminShema = mongoose.Schema({
    productname : {type:String, required:true},
    productdescription : {type:String, required:true},
    productprice : {type:String , required: true},
    productimage : {type: String , required: true},
    prodCategory : {type : [] ,required : true, default : []}
},{timeStamps:true})

const adminModel = mongoose.model("adminProducts",adminShema)


module.exports =  adminModel