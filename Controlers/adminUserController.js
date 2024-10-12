const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const adminUserModel = require("../Models/Admin.signup.model");

const adminSignUp = async (req,res)=>{

console.log(req.body);
let {firstname,lastname,email,password} = req.body
if (!firstname || !lastname || !email || !password) {
    res.status(400).send({message:"all input field must not be empty"})
}
else{

try {
    let existuser = await adminUserModel.findOne({email})
    if (existuser) {
        res.status(401).send({message:"user already exist, login instead",status:false})
    }else{
    let saltround = 10
    let hashedpassword = await bcrypt.hash(password,saltround)
    let createduser =  await adminUserModel.create({firstname,lastname,email,password:hashedpassword})
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

const adminLogin = async (req,res)=>{
    console.log("hi");
    console.log(req.body);
   let {email,password} = req.body
   console.log(email,password);
   if (!email || !password) {
    res.status(403).send({message:"all inputs are mandatory"})
   }else{
    const existuser = await adminUserModel.findOne({email})
    if (!existuser) {
        res.status(404).send({message:"incorrect email or password",status:false})
    }else{
     let correctPassword =  await bcrypt.compare(password,existuser.password)
     if (!correctPassword) {
        res.status(404).send({message:"incorrect email or password",status:false}) 
     }else{
       let security =  await jwt.sign({email}, "dontTryGuessingMySecretCode",{expiresIn:"5h"})
       console.log(security);
        res.status(200).send({message:"login successfully",status:true,security}) 
     }
    }
   }
}

module.exports = {adminSignUp,adminLogin }