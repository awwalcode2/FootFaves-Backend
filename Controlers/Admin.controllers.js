const mongoose = require("mongoose")
const cloudinary = require("../utilis/cloudinary")
const adminModel = require("../Models/adminModels")
const jwt = require("jsonwebtoken")


const uploadProduct = async (req, res) => {
    const { productname, productdescription, productprice, productimage, prodCategory } = req.body
    if (!productname || !productdescription || !productprice || !productimage || prodCategory.length < 1) {
        res.status(400).send({ message: "all fields are mandatory", status: false })
    } else {
        if (!productprice.startsWith("$" || "#")) {
            res.status(405).send({ message: "product price must start with $ ", status: false })
        }
        else {
            try {
                if (!productimage) {
                    res.status(404).send({ message: "image cannot be empty", status: false })
                }
                const uploadimage = await cloudinary.uploader.upload(productimage)
                // console.log(uploadimage.secure_url);
                const upload = uploadimage.secure_url
                if (!upload) {
                    res.status(405).send({ message: "error occured while uploading image ", status: false })
                } else {
                    let savedProduct = await adminModel.create({ productname, productdescription, productprice, prodCategory, productimage: upload })
                    if (savedProduct) {
                        res.status(200).send({ message: "product saved to database successfully", status: true })
                    } else {
                        res.status(409).send({ message: "unable to save product", status: false })
                    }

                }

            } catch (error) {
                console.log(error.message);
            }



            
        }
    }

}




const AdmminUpdate = async (req, res) => {
    try {
        let find = await adminModel.find()
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}


const deleteproduct = async (req, res) => {
    let id = req.body.productid
    let productdeleted = await adminModel.findByIdAndDelete(id)
    if (!productdeleted) {
        res.status(502).send({ message: "unable to delete product", status: false })
    } else {
        res.status(200).send({ message: "deleted successfuly", status: true })
    }
}

const editproduct = async (req, res) => {
    let id = req.body.id
    // console.log(id);
    let value = await adminModel.findById(id)
    // console.log(value);
    res.status(200).send({ message: "product fetched successfully", status: true, value })
}
const edit = async (req, res) => {
    let { productid, productname, productprice, productdescription, productimage, prodCategory } = req.body

    if (!productid || !productname || !productprice || !productdescription || !productimage || prodCategory.length < 1 ||productprice.includes("-")) {
        res.status(400).send({ message: "all input fields are mandatory", status: false })
    } else {
        let existproduct = await adminModel.findById(productid)
        // console.log(existproduct);
        if (!existproduct) {
            res.status(509).send({ message: "invalid product", status: false })
        } else {
            try {
                const edituploadimage = await cloudinary.uploader.upload(productimage)
                const editupload = edituploadimage.secure_url

                // console.log(editupload);
                if (!editupload) {
                    res.status(511).send({ message: "unable to save to cloudinary", status: false })
                } else {
                    let editedproduct = await adminModel.findByIdAndUpdate(productid, { productid, productname, productprice, productdescription, productimage, prodCategory }, { new: true })
                    console.log(editedproduct);
                    res.status(200).send({ message: "product edited succeessfuly", status: true })
                }

            } catch (error) {
                
                res.status(513).send({ message: error.message, status: false })

            }
        }
    }
}

const verifyadmin = async (req, res) => {
    let security = req.headers.authorization || req.headers.authorisation
    // console.log(req.headers);
    if (!security) {
        res.status(512).send({ message: "no authorization found", status: false })
    } else if (!security.startsWith("Bearer")) {
        res.status(512).send({ message: "invalid authorization method", status: false })
    }
    else {
        let token = security.split(" ")[1]
        // console.log(token);
        if (token) {
            let confirm = await jwt.verify(token,"dontTryGuessingMySecretCode",(err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'Invalid token.' });
                } else {
                    // console.log(decoded);
                }


            })
            // console.log("hello");
            console.log(confirm);
            // console.log(confirm);
            // if (!confirm) {
            //     res.status(517).send({ message: "unauthorize user", status: false })
            // } else {
            //     res.status(200).send({ message: "expected token provided", status: true })
            // } 
        }

    }
}










const addtocart = async (req, res) => {

    console.log(req.headers);
    let UserSecurity = req.headers.authorization || req.headers.authorisation
    console.log(UserSecurity);
    if (!UserSecurity) {
        res.status(400).send({ message: "headers is mandatory", status: false })
    } else if (!UserSecurity.startsWith("Bearer")) {
        res.status(402).send({ message: "invalid header provided", status: false })
    } else {
        let confirmUserSecurity = UserSecurity.split(" ")[1]
        console.log(confirmUserSecurity);
        jwt.verify(confirmUserSecurity,"dontTryGuessingMySecretCode", (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid token.' });
            } else {
                return res.status(200).send({ message: 'token succesfully verified' });
            }
        })
    
    }
}











// men and women controllers

const Allwomen = async (req, res) => {
    try {
        let find = await adminModel.find({ prodCategory: "women" })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            // console.log(find);
            res.status(200).send({ message: "womens shoe fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}

const WomenShoe = async (req, res) => {

    try {
        let find = await adminModel.find({ prodCategory: ["women", "shoe"] })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            console.log(find);
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}


const Womenslides = async (req, res) => {

    try {
        let find = await adminModel.find({ prodCategory: ["women", "slides"] })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            console.log(find);
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}


const WomenSandals = async (req, res) => {

    try {
        let find = await adminModel.find({ prodCategory: ["women", "sandals"] })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            console.log(find);
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}


const Menshoes = async (req, res) => {

    try {
        let find = await adminModel.find({ prodCategory: ["men", "shoe"] })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            console.log(find);
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}

const Menslides = async (req, res) => {

    try {
        let find = await adminModel.find({ prodCategory: ["men", "slides"] })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            console.log(find);
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}


const Menpalm = async (req, res) => {

    try {
        let find = await adminModel.find({ prodCategory: ["men", "palm"] })
        if (!find) {
            res.status(400).send({ message: "cannot find products", status: false })
        } else {
            console.log(find);
            res.status(200).send({ message: "products fetched successfully", products: find, status: "okay" })
        }
    } catch (error) {
        res.status(500).send({ message: "internal server error", status: false })
    }
}


module.exports = { uploadProduct, AdmminUpdate, deleteproduct, editproduct, edit, Allwomen, verifyadmin, addtocart, WomenShoe, Womenslides, WomenSandals, Menslides, Menshoes, Menpalm }


