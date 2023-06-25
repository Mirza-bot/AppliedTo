import jwt, { Jwt } from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel";
import { Request, Response } from "express";

interface Token {
  id: string;
  iat: number;
  exp: number;
}

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get Token from header
        token = req.headers.authorization.split(" ")[1];
        // Verification
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as jwt.Secret
        ) as Token;
        req.body.user = await userModel
          .findById(decoded.id)
          .select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized!");
      }
    }
  }
);

export { protect };
