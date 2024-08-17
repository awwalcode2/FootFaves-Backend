const mongoose = require("mongoose")
require("dotenv").config()

const connectdb = ()=>{
    let URI = process.env.URI
     mongoose.connect(URI).then((res)=>{
        console.log("connected to database successfully");
    }).catch((err)=>{
        console.log();
    })
}
connectdb()
module.exports = connectdb
