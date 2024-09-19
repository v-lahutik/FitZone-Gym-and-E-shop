import express from "express";
import { login, logout, verifyAccount } from "../controllers/user.controller";
import { loginValidation } from "../validators/user.validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { bookingCourse, cancelBooking } from "../controllers/booking.controller";

const userRouter =express.Router();

userRouter.get('/verify/:verifyToken/:uid', verifyAccount)
userRouter.post('/login',loginValidation, validateRequest, login)
userRouter.post('/logout', logout)

userRouter.patch('/booking/:cid',bookingCourse)
userRouter.patch('/cancelBooking/:cid',cancelBooking)

export default userRouter;