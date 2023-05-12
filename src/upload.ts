import util from "util";
import multer from "multer";

// middleware for file upload
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../../frontend/public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

export let uploadFileMiddleware = util.promisify(uploadFile);
