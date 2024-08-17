const express = require("express")
const { uploadProduct } = require("../Controlers/Admin.controllers")
const router2 = express.Router()


router2.post("/uploadProduct", uploadProduct)






module.exports = router2