/*const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.CLOUD_API_KEY,
   // api_secrete : process.env.CLOUD_API_SECRETE
api_secret: process.env.CLOUD_API_SECRET

});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
   allowedFormat:["png", "jpg", "jpeg"],
  },
});

module.exports = {
    cloudinary,
    storage,
}*/
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET, // ✅ fixed
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png", "jpg", "jpeg"], // ✅ correct key name: allowedFormats (plural)
  },
});

module.exports = {
  cloudinary,
  storage,
};
