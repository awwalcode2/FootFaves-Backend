const mongoose = require("mongoose")
const userModel = require("../Models/signupModels")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { welcomemail, myotp } = require("../utilis/Mailer")
let generalotp = ""
let Email = ""

const singup = async (req, res) => {

    console.log(req.body);
    let { firstname, lastname, email, password } = req.body
    if (!firstname || !lastname || !email || !password) {
        res.status(400).send({ message: "input field must not be empty" })
    }
    else {

        try {
            let existuser = await userModel.findOne({ email })
            if (existuser) {
                res.status(401).send({ message: "user already exist, login instead", status: false })
            } else {
                let saltround = 10
                let hashedpassword = await bcrypt.hash(password, saltround)
                let createduser = await userModel.create({ firstname, lastname, email, password: hashedpassword })
                if (createduser) {
                    await welcomemail(email, firstname)
                    res.status(200).send({ message: "signup successfully", status: true })
                } else {
                    res.status(402).send({ message: "unable to signup successfully", status: false })
                }

            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "internal server error" })
        }
    }
}


const login = async (req, res) => {
    let { email2, password2 } = req.body
    if (!email2 || !password2) {
        res.status(403).send({ message: "all inputs are mandatory" })
    } else {
        const existuser = await userModel.findOne({ email: email2 })
        if (!existuser) {
            res.status(404).send({ message: "incorrect email or password  ", status: false })
        } else {
            let correctPassword = await bcrypt.compare(password2, existuser.password)
            if (!correctPassword) {
                res.status(404).send({ message: "incorrect email or password ", status: false })
            } else {
                let UserSecurity = jwt.sign({ email2 }, "dontTryGuessingMySecretCode", { expiresIn: "60d" })
                //    console.log(UserSecurity);
                res.status(200).send({ message: "login successfully", status: true, UserSecurity })

            }
        }
    }
}

const sendotp = async (req, res) => {
    const { email } = req.body
    console.log(email);
    if (!email) {
        res.status(404).send({ message: "email is required", status: false })
    } else {
        const existuser = await userModel.findOne({ email: email })
        try {
            if (!existuser) {
                res.status(405).send({ message: "Invalid Email", status: false })
            } else {
                let otp = ""
                for (let index = 0; index < 6; index++) {
                    let random = Math.floor(Math.random() * 9);
                    otp += random
                    generalotp = otp
                }
                myotp(existuser.email, otp, existuser.firstname)
                Email = email
                console.log(Email);
                let OTPverifications = jwt.sign({ email }, "dontTryGuessingMySecretCode", { expiresIn: "2m" })
                res.status(200).send({ message: "OTP Sent successfully", status: true, otp, OTPverifications, Email })
            }
        } catch (error) {
            res.status(500).send({ message: "internal server error" })
            console.log(error);
        }

    }


}



const changePassword = async (req, res) => {
    const { Password, email } = req.body
    console.log(email, Password);
    if (!Password || !email) {
        res.status(400).send({ message: "password is mandatory" })
    } else {
        try {
            const hashedPassword = await bcrypt.hash(Password, 10)
            console.log(hashedPassword);
              const checkEmail = await userModel.findOneAndUpdate({email:email} , {
                password:hashedPassword
              } , {new:true})
              if(!checkEmail){
                  res.status(400).send({message:"Password Failed to Update"})    
              }else {
                  res.status(200).send({message:"Password successfully updated" , status:"true"})    
              }
        } catch (error) {
                  res.status(500).send({message:"internal server error"})  
                  console.log(error); 
              }
        }

    }

    const verifypassword = async (req, res) => {
        let OTPverifications = req.headers.authorization || req.headers.authorisation
        if (!OTPverifications) {
            res.status(512).send({ message: "no authorization found", status: false })
        } else if (!OTPverifications.startsWith("Bearer")) {
            res.status(512).send({ message: "invalid authorization method", status: false })
        }
        else {
            let OTPverificationstoken = OTPverifications.split(" ")[1]
            if (OTPverificationstoken) {
                let confirm = await jwt.verify(OTPverificationstoken, "dontTryGuessingMySecretCode", (err, decoded) => {
                    if (err) {
                        return res.status(401).send({ message: 'Invalid token.' });
                    } else {
                        console.log(decoded);
                        return res.status(200).send({ message: 'tokenverified' });
                    }


                })
                console.log(confirm);
            }

        }
    }







    module.exports = { singup, login, sendotp, changePassword, verifypassword }