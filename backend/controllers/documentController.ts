import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import documentModel from "../models/documentModel";
import { UserData } from "../../shared/types";

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
