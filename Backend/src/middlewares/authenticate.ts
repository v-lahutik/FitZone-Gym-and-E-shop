import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/helper";
import { verifyToken } from "../utils/jwt";
import User from "../models/user.model";


export const authenticateUser = async (
  req: Request & { token_payload?: any }, 
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.headers.cookie;
    if (!cookies) {
      return res.status(400).json({
        status: "failure",
        msg: "Cookie does not exist",
      });
    }

    // Extract token from cookies
    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return res.status(400).json({
        status: "failure",
        msg: "Token does not exist in cookies",
      });
    }
    // Verify token
    const token_payload = await verifyToken(token, process.env.JWT_SECRET as string);

    const user = await User.findById(token_payload.id);

    if (!user) {
      throw createError("User not found!", 404);
    }

    req.token_payload = token_payload;

    next();
  } catch (error) {
    next(error);
  }
};



// export const authenticateUser = async (
//   req: Request & { token_payload?: any }, 
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(400).json({
//         status: "failure",
//         msg: "Cookie does not exist",
//       });
//     }

//     // Verify token
//     const token_payload = await verifyToken(token, process.env.JWT_SECRET as string);
//     const user = await User.findById(token_payload.id);
//     if (!user) {
//       throw createError("User not found!", 404);
//     }

//     req.token_payload = token_payload;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
