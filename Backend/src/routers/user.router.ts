import express from "express";
import { changePassword, forgotPassword, login, logout, resetPasswordHandler, verifyAccount, verifyResetLink } from "../controllers/user.controller";
import { changePasswordValidation, loginValidation, resetPasswordValidation } from "../validators/user.validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { bookingCourse, cancelBooking } from "../controllers/booking.controller";
import { authenticateAndCheckRoles } from "../middlewares/authAndRoles";
import { toAddToCart, toDeleteFromCart } from "../controllers/cart.controller";

const userRouter =express.Router();

userRouter.get('/verify/:verifyToken/:uid', verifyAccount)
userRouter.post('/login',loginValidation, validateRequest, login)
userRouter.post('/logout', logout)


userRouter.post('/changePassword',authenticateAndCheckRoles('Member'),changePasswordValidation,validateRequest, changePassword);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.get('/resetPassword/:resetToken/:uid', verifyResetLink); 
userRouter.post('/resetPassword',resetPasswordValidation, validateRequest, resetPasswordHandler);


userRouter.put('/booking/:cid',authenticateAndCheckRoles('Member'),bookingCourse)
userRouter.put('/cancelBooking/:cid',authenticateAndCheckRoles('Member'),cancelBooking)

userRouter.put('/cart/add/:pid',authenticateAndCheckRoles("Member"),toAddToCart)
userRouter.put('/cart/delete/:pid',authenticateAndCheckRoles("Member"),toDeleteFromCart)

export default userRouter;