import express from "express";
import { login, register } from "../controllers/user.controller";
import { loginValidation, registerValidation } from "../validators/user.validator";
import { validateRequest } from "../middlewares/validationMiddleware";

const userRouter =express.Router();

userRouter.post('/register',registerValidation, validateRequest, register)
userRouter.post('/login',loginValidation, validateRequest, login)

export default userRouter;