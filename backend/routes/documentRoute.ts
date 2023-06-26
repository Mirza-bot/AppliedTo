import express from "express";
import { protect } from "../middleware/authMiddleware";
import fileUpload from "../middleware/fileUploadMiddleware";
import {
  addDocument,
  deleteDocument,
  editDocument,
  getDocuments,
} from "../controllers/documentController";

const documentRouter = express.Router();

documentRouter.post("/upload", protect, fileUpload, addDocument);
documentRouter.patch("/edit", protect, fileUpload, editDocument);
documentRouter.delete("/delete", protect, deleteDocument);
documentRouter.get("/read", protect, getDocuments);

export default documentRouter;
