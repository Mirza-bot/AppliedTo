import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
} from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/user", protect, getUserData);

export default userRouter;
