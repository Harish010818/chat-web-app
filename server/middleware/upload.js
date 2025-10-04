import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "chatapp/uploads",
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    },
});

const upload = multer({ storage }).single("profilePhoto")


export default upload;