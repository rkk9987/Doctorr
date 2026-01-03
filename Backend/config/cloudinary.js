const cloudinary = require("cloudinary").v2;

const connectCloudinary = async () => {
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });

  // console.log(cloudinary.config().cloud_name);
};

module.exports = {
  connectCloudinary,
};
