import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { createError } from "../utils/helper";
import { verifyToken } from "../utils/jwt";

export const authenticateAndCheckRoles = (role: string) => {
  return async (req: Request,res: Response,next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(400).json({
          status: "failure",
          msg: "Cookie does not exist or cookie expired",
        });
      }
      // Verify jwtToken to check the user logged in or not 
      const token_payload = await verifyToken(token,process.env.JWT_SECRET as string);
      const user = await User.findById(token_payload.id);
      if (!user) {
        throw createError("User not found!", 404);
      }
      // To check the role
      if (role !== user.role) {
        throw createError("You are not permitted to do this operation", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
