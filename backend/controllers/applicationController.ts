import { Request, Response, application } from "express";
import expressAsyncHandler from "express-async-handler";
import applicationModel from "../models/applicationModel";
import userModel from "../models/userModel";
import { Application, UserData } from "../../shared/types";

/**
 * creates a new application in database.
 */
const setApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request = req.body as Application;

    const application = await applicationModel.create({
      jobTitle: request.jobTitle,
      companyName: request.companyName,
      jobDescription: request.jobDescription,
      userId: request.userId,
      appliedOver: request.appliedOver,
      cvId: request.cvId,
      clId: request.clId,
      notes: request.notes,
      isFavorite: request.isFavorite,
    });

    if (application) {
      res.status(201).json({
        _id: application._id,
        jobTitle: application.jobTitle,
        companyName: application.companyName,
        jobDescription: application.jobDescription,
        notes: application.notes,
        isFavorite: application.isFavorite,
      });
    } else {
      res.status(400);
      throw new Error("Invalid application data.");
    }
  }
);

/**
 * searches the database for the object with same id
 */
const getApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request = req.body as Application;

    const user = (await userModel.findById(req.body.userId)) as UserData;
    const application = (await applicationModel.findById(
      request._id
    )) as Application;

    if (user._id.toString() === application.userId.toString()) {
      res.status(200).json({
        _id: application._id,
        jobTitle: application.jobTitle,
        companyName: application.companyName,
        jobDescription: application.jobDescription,
        notes: application.notes,
        isFavorite: application.isFavorite,
      });
    } else {
      throw new Error("User has no permission to read this application.");
    }
  }
);

/**
 * searches the database for the application with same id
 * and checks the creatorId of the
 */
const editApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request = req.body as Application;

    const user = (await userModel.findById(req.body.userId)) as UserData;
    const application = (await applicationModel.findById(
      request._id
    )) as Application;

    if (user._id.toString() === application.userId.toString()) {
      await applicationModel.updateOne(
        {
          _id: request._id,
        },
        {
          jobTitle: request.jobTitle,
          companyName: request.companyName,
          jobDescription: request.jobDescription,
          appliedOver: request.appliedOver,
          cvId: request.cvId,
          clId: request.clId,
          notes: request.notes,
          isFavorite: request.isFavorite,
        }
      );
      res.status(200).send("Successfully updated!");
    } else {
      throw new Error("User has no permission to edit this application.");
    }
  }
);

const deleteApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request = req.body as Application;

    const user = (await userModel.findById(req.body.userId)) as UserData;
    const application = (await applicationModel.findById(
      request._id
    )) as Application;

    if (user._id.toString() === application.userId.toString()) {
      await applicationModel.deleteOne(application._id as String);
      res.status(200).send("Successfully deleted!");
    } else {
      throw new Error("User has no permission to delete this application.");
    }
  }
);

export { setApplication, getApplication, editApplication, deleteApplication };
