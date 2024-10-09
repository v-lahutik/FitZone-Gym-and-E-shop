import express from "express";
import { authenticate, changePassword, forgotPassword, login, logout, profileData, resetPasswordHandler, verifyAccount, verifyResetLink } from "../controllers/user.controller";
import { changePasswordValidation, loginValidation, resetPasswordValidation } from "../validators/user.validator";
import { validateRequest } from "../middlewares/validationMiddleware";
import { getAllCourses } from "../controllers/course.controller";
import { bookingCourse, cancelBooking } from "../controllers/booking.controller";
import { authenticateAndCheckRoles } from "../middlewares/authAndRoles";
import { toAddToCart, toClearCart, toDeleteFromCart } from "../controllers/cart.controller";
import { create } from "domain";
import { createOrder, getOrders, getSingleOrder } from "../controllers/order.controller";
import { UserRole } from "../models/user.model";

const userRouter =express.Router();


//verify account /login/ logout
userRouter.get('/verify/:verifyToken/:uid', verifyAccount)
userRouter.post('/login',loginValidation, validateRequest, login)
userRouter.post('/logout', logout)
userRouter.get('/authenticate', authenticate)
userRouter.get('/profile',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),profileData)

//password change
userRouter.post('/changePassword',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),changePasswordValidation,validateRequest, changePassword);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.get('/resetPassword/:resetToken/:uid', verifyResetLink); 
userRouter.post('/resetPassword',resetPasswordValidation, validateRequest, resetPasswordHandler);

//booking courses
userRouter.get('/courses',authenticateAndCheckRoles([UserRole.admin, UserRole.member]), getAllCourses)
userRouter.put('/booking/:cid',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),bookingCourse)
userRouter.put('/cancelBooking/:cid',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),cancelBooking)

//cart
userRouter.put('/cart/add/:pid',authenticateAndCheckRoles([UserRole.admin,  UserRole.member]),toAddToCart)
userRouter.put('/cart/delete/:pid',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),toDeleteFromCart)
userRouter.delete('/cart/clear',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),toClearCart)

//orders
userRouter.post('/orders',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),createOrder)
userRouter.get('/orders',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),getOrders)
userRouter.get('/orders/:oid',authenticateAndCheckRoles([UserRole.admin, UserRole.member]),getSingleOrder)


export default userRouter;