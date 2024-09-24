import User from "../models/user.model";
import Verify from "../models/verify.model";
import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/helper";
import { createJwtToken } from "../utils/jwt";

export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verifyToken: token, uid: userId } = req.params;

    const verified = await Verify.findOne({ token, userId });
    if (!verified) {
      return res
        .status(401)
        .json({ message: "Verification link is not valid or has expired." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted." });
    }

    if (user.is_activated) {
      return res
        .status(400)
        .json({ message: "User account is already activated." });
    }

    user.is_activated = true;
    await user.save();

    res.status(200).json({
      status: "Account verified!",
      message: "Account has been successfully verified.",
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    if (!user.is_activated) {
      return res
        .status(403)
        .json({ error: "Please verify your email before logging in." });
    }
    const isMatch = await user.comparePass(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password is incorrect" });
    }

    const token = await createJwtToken(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string
    );

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ msg: "User login successful" });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").json({ msg: "User logged out" });
};
