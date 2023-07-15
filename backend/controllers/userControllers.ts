import { Request, Response } from "express";
import { User, UserData } from "../../shared/types";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

/**
 * Registers a user
 * @route /api/users/register
 * @access public
 */
const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = <User>req.body;
    if (!email || !name || !password) {
      res.status(400);
      throw new Error("Please provide a valid username, email and password!");
    }

    const userExists = await userModel.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }

    // Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // User creation
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      documents: [],
      applications: [],
      settings: [],
      avatar: [],
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  }
);

/**
 * Signs in a user
 * @route /api/users/login
 * @access public
 */
const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = <User>req.body;

  const user = await userModel.findOne({ email });

  if (!email || !password) {
    res.status(400);
    throw new Error("Both email and password are required.");
  }

  if (!user || !user.password) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  // Check matching user and passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      documents: user.documents,
      settings: user.settings,
      applications: user.applications,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// Function to create JWT
const generateToken = (id: String) => {
  return jwt.sign({ id }, <jwt.Secret>process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getUserData = (req: Request, res: Response) => {
  const request = <UserData>req.body.user;
  const user = {
    id: request._id,
    email: request.email,
    name: request.name,
    documents: request.documents,
    settings: request.settings,
    applications: request.applications,
  };
  res.status(200).json(user);
};

const editUserData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const user = (await userModel.findOne(req.body.user._id)) as UserData;
      if (!user) {
        res.status(401);
        throw new Error("Internal error invalid token.");
      }
      await userModel.findByIdAndUpdate(user._id.toString(), {
        email: req.body.email,
        name: req.body.name,
        settings: req.body.settings,
      });
      res.status(201).json({
        _id: user._id,
        name: req.body.name,
        email: req.body.email,
        token: generateToken(user._id),
        settings: req.body.settings,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error("Invalid data.");
    }
  }
);

const setUserAvatar = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const request = <UserData>req.body;
    await userModel.findByIdAndUpdate(request._id.toString(), {
      avatar: request.avatar,
    });
    res.status(200).json(req.file);
  }
);

export { registerUser, loginUser, getUserData, editUserData, setUserAvatar };
