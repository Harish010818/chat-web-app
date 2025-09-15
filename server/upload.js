import multer from "multer";
import path from "path";
import fs from "fs";

const dir = "./uploads";
if(!fs.existsSync(dir)){
    fs.mkdirSync(dir); 
}

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir); // folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
export const upload = multer({ storage });  
