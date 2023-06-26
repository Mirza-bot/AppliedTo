import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileUpload = upload.single("file");

export default fileUpload;
