const express = require("express")
const app = express()
require("dotenv").config()
const connectdb = require("./Config/db.config")
const cors = require("cors")
const router = require("./Routes/Signup-login-route")
const router2 = require("./Routes/admin.routes")

app.use(cors({origin:"*"}))
app.use(express.json({extended:true,limits:"100mb"}))
app.use('/user',router)
app.use('/admin',router2)



connectdb()

let port = 7777

app.listen(port,()=>{
console.log(`app started on port ${port}`);
})