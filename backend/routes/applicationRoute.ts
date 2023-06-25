import express from "express";
import {
  setApplication,
  getApplication,
  editApplication,
  deleteApplication,
} from "../controllers/applicationController";

const applicationRouter = express.Router();

applicationRouter.post("/create", setApplication);

applicationRouter.get("/read", getApplication);

applicationRouter.patch("/edit", editApplication);

applicationRouter.delete("/delete", deleteApplication);

export default applicationRouter;
