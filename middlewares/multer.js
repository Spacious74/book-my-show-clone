const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage,
    limits: {
        fieldSize: 10 * 1024 * 1024, // Adjust the limit as needed (10MB in this example)
      },}).array("images");

module.exports = upload;