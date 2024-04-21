const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending a timestamp
    const fileExtention = file.originalname.split(".")[1];
    const fileName = Date.now() + `.${fileExtention}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedType = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedType.includes(file.mimetype)) cb(null, true);
  else cb("Invalid file Format", false);
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
