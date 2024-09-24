import User from "../models/user.model";
import { NextFunction, Request, Response } from 'express';
import { sendVerificationEmail } from "../utils/helper";
import { createJwtToken } from "../utils/jwt";
import { createToken } from "../utils/helper";


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

        const newUser = new User({ firstName, lastName, email, address, membership, role });

        const verificationToken: string = await createToken(newUser);

        await sendVerificationEmail(newUser, verificationToken);

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
    try {
        const { firstName, lastName, email, address, membership, role } = req.body;
        const { uid } = req.params; 

        if (!firstName || !lastName || !email || !address || !membership|| !role) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }

        const user = await User.findByIdAndUpdate(uid, { firstName, lastName, email, address, membership, role }, { new: true });

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
