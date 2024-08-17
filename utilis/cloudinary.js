const cloudinary = require("cloudinary").v2




cloudinary.config(
    {
        cloud_name: 'dam25jdq8', 
        api_key: process.env.api_key, 
        api_secret: process.env.API_SECRET,
        secure:true
    }
)

module.exports = cloudinary