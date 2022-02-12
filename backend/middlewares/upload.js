const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { MONGO_URI, GRID_FS_IMG_BUCKET } = require("../config");

let storage = GridFsStorage({
  url: MONGO_URI,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    const filename = `${Date.now()}-img-${file.originalname}`; // TODO Have a unique filename
    if (match.indexOf(file.mimetype) === -1) {
      return filename;
    }
    return {
      bucketName: GRID_FS_IMG_BUCKET,
      filename: filename
    };
  }
});

let uploadFiles = multer({ storage: storage }).array("images");
let uploadFilesMiddleware = util.promisify(uploadFiles);

/**
 * Middleware to save files from multipart/form-data requests
 */
module.exports = uploadFilesMiddleware;