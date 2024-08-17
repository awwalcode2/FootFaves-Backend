const express = require("express")
const { singup ,login } = require("../Controlers/signup-login.controllers")
const router = express.Router()

router.post("/singup",singup)
router.post("/login",login)


module.exports = router