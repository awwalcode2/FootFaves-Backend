const mongoose = require("mongoose")
const cloudinary = require("../utilis/cloudinary")
const adminModel = require("../Models/adminModels")


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
                console.log(uploadimage.secure_url);
                const upload = uploadimage.secure_url
                if (!upload) {
                    res.status(405).send({ message: "error occured while uploading image ", status: false })
                } else {
                    // res.status(202).send({ message: "image uploaded successfully", status: true })
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
module.exports = { uploadProduct }


