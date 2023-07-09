import express from "express";
import {
  setApplication,
  getApplications,
  editApplication,
  deleteApplication,
} from "../controllers/applicationController";
import { protect } from "../middleware/authMiddleware";

const applicationRouter = express.Router();

applicationRouter.post("/create", protect, setApplication);

applicationRouter.get("/read", protect, getApplications);

applicationRouter.patch("/edit", protect, editApplication);

applicationRouter.delete("/delete", protect, deleteApplication);

export default applicationRouter;
