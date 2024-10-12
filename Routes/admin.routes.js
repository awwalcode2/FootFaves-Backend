const express = require("express")
const { uploadProduct, AdmminUpdate, deleteproduct, editproduct, edit, Allwomen, verifyadmin, WomenShoe, Womenslides, WomenSandals, Menshoes, Menpalm, Menslides, addtocart } = require("../Controlers/Admin.controllers")
const { adminSignUp, adminLogin } = require("../Controlers/adminUserController")
const router2 = express.Router()


router2.post("/uploadProduct", uploadProduct)
router2.get("/adminUpdate", AdmminUpdate)
router2.get("/verifyadmin", verifyadmin)
router2.get("/WomenShoe", WomenShoe)
router2.get("/Womenslides",Womenslides)
router2.get("/Womensandals",WomenSandals)
router2.get("/Menshoes",Menshoes)
router2.get("/Menslides",Menslides)
router2.get("/Menpalm",Menpalm)
router2.post("/deleteproduct", deleteproduct)
router2.post("/editproduct", editproduct)
router2.get("/allwomen", Allwomen)
router2.post("/edit", edit)
router2.post("/adminSignup", adminSignUp)
router2.post("/adminlogin", adminLogin)
router2.post("/addtocart",  addtocart)



module.exports = router2