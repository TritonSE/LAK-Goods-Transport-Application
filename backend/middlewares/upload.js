/**
 * Middleware to save files from multipart/form-data requests
 */

import util from 'util';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { MONGO_URI, GRID_FS_IMG_BUCKET } from '../config.js';

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

const uploadFiles = multer({ storage: storage }).array("images");
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;
