import User from "../models/user.model";
import { Request, Response } from 'express';


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).json({ msg: 'User created successfully' });
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
    }
}
