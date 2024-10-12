const express = require("express")
const { singup ,login, sendotp, changePassword, verifypassword } = require("../Controlers/signup-login.controllers")
const router = express.Router()

router.post("/singup",singup)
router.post("/login",login)
router.post("/sendotp",sendotp)
router.post("/changepassword", changePassword)
router.get("/verifypassword", verifypassword)


module.exports = router