import { Request, Response } from "express";
import { User } from "../../shared/types";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";
import userModel from "../models/userModel";
import { Types } from "mongoose";

/**
 * Registers a user
 * @route /api/users/register
 * @access public
 */
const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body as User;
    if (!name || !email || !password) {
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
      throw new Error("Invalid user data");
    }
  }
);

/**
 * Signs in a user
 * @route /api/users/login
 * @access public
 */
const loginUser = expressAsyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body as User;

  const user = await userModel.findOne({ email });

  // Check matching user and passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// Function to create JWT
const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser };
