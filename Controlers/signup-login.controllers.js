const mongoose = require("mongoose")
const userModel = require("../Models/signupModels")
const bcrypt = require("bcryptjs")

const singup = async (req,res)=>{

console.log(req.body);
let {firstname,lastname,email,password} = req.body
if (!firstname || !lastname || !email || !password) {
    res.status(400).send({message:"input field must not be empty"})
}
else{

try {
    let existuser = await userModel.findOne({email})
    if (existuser) {
        res.status(401).send({message:"user already exist, login instead",status:false})
    }else{
    let saltround = 10
    let hashedpassword = await bcrypt.hash(password,saltround)
    let createduser =  await userModel.create({firstname,lastname,email,password:hashedpassword})
    if (createduser) {
        res.status(200).send({message:"signup successfully", status:true})
    }else{
        res.status(402).send({message:"unable to signup successfully", status:false})
    }
    
    }
} catch (err) {
    console.log(err);
}
}
}

const login = async (req,res)=>{
    console.log(req.body);
   let {email2,password2} = req.body
   if (!email2 || !password2) {
    res.status(403).send({message:"all inputs are mandatory"})
   }else{
    const existuser = await userModel.findOne({email2})
    if (!existuser) {
        res.status(404).send({message:"incorrect email or password",status:false})
    }else{
     let correctPassword =  await bcrypt.compare(password,existuser.password)
     if (!correctPassword) {
        res.status(404).send({message:"incorrect email or password",status:false}) 
     }else{
        res.status(200).send({message:"login successfully",status:true}) 
     }
    }
   }
}


module.exports = {singup,login }