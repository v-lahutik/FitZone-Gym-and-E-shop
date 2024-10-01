import { NextFunction, Request, Response } from 'express';
import { sendVerificationEmail } from "../utils/helper";
import { createJwtToken } from "../utils/jwt";
import { createToken } from "../utils/helper";
import User from "../models/user.model";
import Category from "../models/category.model";
import Product from "../models/product.model";
import Order from "../models/order.model";
import Course from "../models/course.model";
import CourseTemplate from "../models/courseTemplate.model";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log('get all users');
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error: any) {
        next(error);
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const { firstName, lastName, email, address, membership, role } = req.body;

        if (!firstName || !lastName || !email || !address || !membership || !role) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        const userExist= await User.findOne({ email });
        if (userExist) {
          return res.status(400).json({ msg: 'User already exists' });
        }
        //create new user
        const newUser = new User({ firstName, lastName, email, address, membership, role });
        
        //create verification token and send verification email
       //  const verificationToken: string = await createToken(newUser);
        // await sendVerificationEmail(newUser, verificationToken);

        await newUser.save();
        res.status(201).json({
            msg: 'User registration successful. Please verify email',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                address: newUser.address,
                membership: newUser.membership,
                role: newUser.role
            }});
    } catch (error: any) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('update user running');
    try {
        const { firstName, lastName, email, address, membership, role ,is_activated, cart} = req.body;
        const { uid } = req.params; 

        if (!firstName || !lastName || !email || !address || !membership|| !role || !is_activated || !cart) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }

        const user = await User.findByIdAndUpdate(uid, { firstName, lastName, email, address, membership, role , is_activated, cart}, { new: true });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'User updated', user });
    } catch (error: any) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findByIdAndDelete(req.params.uid);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.status(200).json({ msg: 'User deleted', user });
    } catch (error: any) {
        next(error);
    }
}

export const fetchAllDatabase = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const [users, categories, products, orders, courses, courseTemplates] = await Promise.all([
            User.find().select("-password -createdAt -updatedAt -__v"),
            Category.find().select("-createdAt -updatedAt -__v"),
            Product.find().select("-createdAt -updatedAt -__v"),
            Order.find().select("-createdAt -updatedAt -__v"),
            Course.find().select("-createdAt -updatedAt -__v"),
            CourseTemplate.find().select("-createdAt -updatedAt -__v")
        ])
        res.status(200).json({users, categories, products, orders, courses, courseTemplates});

    }catch(error: any){
        next(error);
    }
}
