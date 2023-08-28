import multer from "multer";
import path from "path";

//uploads path:
const UPLOADS_FOLDER = "./uploads";

//define the storage:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

//prepare multer upload object:
export const upload = multer({
  // dest: UPLOADS_FOLDER,
  storage: storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only .jpg .png or .jpeg formate allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("only .pdf formate allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});
