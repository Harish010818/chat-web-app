import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image";
    let folder = "chatapp/images";

    if (
      file.mimetype.startsWith("audio/") || file.mimetype.startsWith("video/")) {
      resourceType = "video"; // audio + video
      folder = "chatapp/media";
    }

    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowed  = file.mimetype.startsWith("image/") || file.mimetype.startsWith("audio/");
  cb(allowed ? null : new Error("Invalid file type"), allowed);
};


export const uploadFile = multer({ 
    storage,
    limits:{
        fileSize: 2 * 1024 * 1024
    },

    fileFilter,
 }).single("file");