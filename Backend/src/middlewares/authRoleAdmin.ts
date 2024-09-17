

// import { NextFunction, Request, Response } from "express";
// import User from "../models/user.model";
// import { createError } from "../utils/helper";


// export const authorizeRoles = (...allowed_roles) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.token_payload.id;
//       const user = await User.findById(userId);

//       if (!user) {
//         throw createError("User not found!", 404);
//       }

//       if (!allowed_roles.includes(user.role)) {
//         throw createError("You are not permitted to do this operation", 403);
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
