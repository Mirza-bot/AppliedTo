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
    const request = <Application>req.body;

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
      status: request.status,
    });

    if (application) {
      res.status(201).json({
        _id: application._id,
        jobTitle: application.jobTitle,
        companyName: application.companyName,
        jobDescription: application.jobDescription,
        notes: application.notes,
        isFavorite: application.isFavorite,
        status: request.status,
      });
    } else {
      res.status(400);
      throw new Error("Invalid application data.");
    }
  }
);

/**
 * searches the database for all documents that match the userId param
 */
const getApplications = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.body.user._id;

      const user = await userModel.findById(userId);

      if (!user) {
        res
          .status(400)
          .json({ error: "No matching user found due to invalid data." });
        return;
      }

      const applications = await applicationModel.find({ userId: user._id });

      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

/**
 * searches the database for the application with same id
 * and checks the creatorId of the
 */
const editApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const request = req.body;
      const user = await userModel.findById(request.user._id);
      const application = await applicationModel.findById(request._id);

      if (!application) {
        res.status(400);
        throw new Error(
          "Application couldn't be found due to invalid request."
        );
      }

      if (!user) {
        res.status(400);
        throw new Error("No matching user found due to invalid data.");
      }

      if (user._id.toString() === application.userId?.toString()) {
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
            status: request.status,
          }
        );
        res.status(200).send("Successfully updated!");
      } else {
        throw new Error("User has no permission to edit this application.");
      }
    } catch (error) {
      res.status(400);
      throw new Error("Invalid data");
    }
  }
);

const deleteApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request = <Application>req.body;

    const user = await userModel.findById(request.userId);
    const application = await applicationModel.findById(request._id);

    if (!application) {
      res.status(400);
      throw new Error("Application couldn't be found due to invalid request.");
    }

    if (!user) {
      res.status(400);
      throw new Error("No matching user found due to invalid data.");
    }

    const isAuthorizedToDelete =
      user._id.toString() === application.userId?.toString();

    if (!isAuthorizedToDelete) {
      throw new Error("User has no permission to delete this application.");
    } else {
      await applicationModel.deleteOne({ _id: application._id });
      res.status(200).send("Successfully deleted!");
    }
  }
);

export { setApplication, getApplications, editApplication, deleteApplication };
