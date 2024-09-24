import express from "express";
import { login, logout, verifyAccount } from "../controllers/user.controller";
import { loginValidation } from "../validators/user.validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { bookingCourse, cancelBooking } from "../controllers/booking.controller";
import { authenticateAndCheckRoles } from "../middlewares/authAndRoles";
import { toAddToCart, toDeleteFromCart } from "../controllers/cart.controller";

const userRouter =express.Router();

userRouter.get('/verify/:verifyToken/:uid', verifyAccount)
userRouter.post('/login',loginValidation, validateRequest, login)
userRouter.post('/logout', logout)

userRouter.put('/booking/:cid',authenticateAndCheckRoles('member'),bookingCourse)
userRouter.put('/cancelBooking/:cid',authenticateAndCheckRoles('member'),cancelBooking)

userRouter.put('/cart/add/:pid',authenticateAndCheckRoles("member"),toAddToCart)
userRouter.put('/cart/delete/:pid',authenticateAndCheckRoles("member"),toDeleteFromCart)

export default userRouter;