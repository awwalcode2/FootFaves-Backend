const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String,required:true},
    password: {type:String,required:true},
    email: {type:String,required:true, unique:true },
    cart: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, required: true },
          quantity: { type: Number, required: true },
          productprice: { type: Number, required: true },
          productdescription: { type: String, required: true },
          productname: { type: String, required: true },
        }
      ]
}, {timeStamps:true})


const userModel = mongoose.model("authorisation",userSchema)
module.exports = userModel