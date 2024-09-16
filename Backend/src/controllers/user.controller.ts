import { nextTick } from "process";
import User from "../models/user.model";
import { NextFunction, Request, Response } from 'express';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, address } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        const userExist= await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: 'User already exist' });
        }
       const newUser =  new User({ firstName, lastName, email, password, address });
        await newUser.save();
        res.status(201).json({
            msg: 'User registration successful',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                address: newUser.address,
            }});
    } catch (error: any) {
        next(error);
    }
}

export const login= async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await user.comparePass(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Email or Password is incorrect' });
        }
        res.status(200).json({ msg: 'User login successful' });
    } catch (error: any) {
       next(error);
    }
}