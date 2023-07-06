import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  editUserData,
  setUserAvatar,
} from "../controllers/userControllers";
import { protect } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/", protect, getUserData);

userRouter.put("/update", protect, editUserData);

userRouter.put("/avatar", protect, setUserAvatar);

export default userRouter;
