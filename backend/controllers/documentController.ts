import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import documentModel from "../models/documentModel";
import { UserData } from "../../shared/types";
import multer from "multer";
import path from "path";
import userModel from "../models/userModel";

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "documents");
//   },
//   filename: (req, file, callback) => {
//     console.log(file);
//     callback(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

const addDocument = expressAsyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
  }
  const fileData = req.file;

  const document = await documentModel.create({
    file: fileData?.buffer,
    name: fileData?.originalname,
    userId: req.body.userId,
  });

  const user = await userModel.findByIdAndUpdate(req.body.userId, {
    $push: { documents: document._id },
  });

  if (document) {
    res.status(200).send(document);
  } else res.status(500).send("Document could not be saved.");
});

const editDocument = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).send("No file uploaded");
    }
    const fileData = req.file;
    const document = await documentModel.findByIdAndUpdate(req.body._id, {
      file: fileData?.buffer,
      name: fileData?.originalname,
    });
    if (document) {
      res.status(200).send(document);
    } else res.status(500).send("Document could not be edited.");
  }
);

const deleteDocument = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const document = await documentModel.findByIdAndDelete(req.body._id);
    if (document) {
      res.status(200).send("Document deleted successfully");
    } else res.status(500).send("Document could not be deleted.");
  }
);

const getDocuments = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userRequest = <UserData>req.body.user;
    const documents = await documentModel.find({ userId: userRequest._id });
    if (documents) {
      res.status(200).send(documents);
    } else res.status(500).send("No document with matching ID found.");
  }
);

export { addDocument, editDocument, deleteDocument, getDocuments };
