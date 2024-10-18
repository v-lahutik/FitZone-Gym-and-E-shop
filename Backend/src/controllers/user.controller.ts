import User from "../models/user.model";
import Verify from "../models/verify.model";
import { NextFunction, Request, Response } from "express";
import { createToken } from "../utils/helper";
import { createJwtToken, verifyToken } from "../utils/jwt";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/helper";
import { sendResetPasswordEmail } from "../utils/helper";
import { CustomError, createError } from "../utils/helper";

//profile data
export const profileData = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.payload.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      role: user.role,
      membership: user.membership,
      profilePic: user.profilePic,
    });
  } catch (error) {
    next(error);
  }
}

//verify account after registration
export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { verifyToken: token, uid: userId } = req.params;

    const verified = await Verify.findOne({ token, userId });
    if (!verified) {
      return res.redirect(`${process.env.FE_URL}/user-not-found/?status=verify-error`);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect(`${process.env.FE_URL}/user-not-found/?status=user-not-found`);
    }

    if (user.is_activated) {
      return res.redirect(`${process.env.FE_URL}/verify/${userId}?status=already-activated`);
    }

    user.is_activated = true;
    await user.save();

    return res.redirect(`${process.env.FE_URL}/verify/${userId}?status=verified-success`);
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
    console.log(req.body);
    const { email, loginPassword } = req.body;

    if (!email || !loginPassword) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    if (!user.is_activated) {
      return res
        .status(403)
        .json({ msg: "Please verify your email before logging in." });
    }
    const isMatch = await user.comparePass(loginPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password is incorrect" });
    }

    //create jwt token and store in cookie
    const token = await createJwtToken(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    // destructuring user object to remove password, is_activated, createdAt, updatedAt, __v, bookedCourses, cart
    const {password, is_activated, createdAt, updatedAt, __v, bookedCourses, cart, ...userData} = user.toObject();
    res.status(200).json({
      msg: "User login successful",
      userData 
      
    });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ msg: "User logged out" });
};

//change password for logged in user
export const changePassword = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.payload.id;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({
          message:
            "Please provide current password, new password, and confirm password.",
        });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await user.comparePass(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    next(error);
  }
};

//forgot password - send reset password link to user's email
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with that email." });
    }

    const resetToken = await createToken(user);
    console.log("reset token", resetToken);

    await sendResetPasswordEmail(user, resetToken);
    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    next(error);
  }
};

//reset password - verify reset link and reset password
export const verifyResetLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { resetToken: token, uid: userId } = req.params;

  try {
    const verifyEntry = await Verify.findOne({
      token,
      userId,
      expiresAt: { $gt: Date.now() },
    });

    if (!verifyEntry) {
      console.log("verifyEntry", verifyEntry);
      console.log("Token:", token);
      console.log("User ID:", userId);
      console.log("Current Time:", Date.now());
      return res.redirect(`${process.env.FE_URL}/verify-link-not-found/?status=verify-error`)
      // return res.status(400).json({ message: "Invalid or expired token." });
    }
    // Display form to reset password - needs to be changed to a frontend form
    res.redirect(`${process.env.FE_URL}/reset-password?userId=${userId}&token=${token}&status=verified-success`);
  } catch (error) {
    next(error);
  }
};

// reset password and delete reset token from verify database
export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, userId, newPassword, confirmPassword } = req.body; // Access from the form submission

    const verifyEntry = await Verify.findOne({
      token,
      userId,
      expiresAt: { $gt: Date.now() },
    });

    if (!verifyEntry) {
      console.log("verifyEntry", verifyEntry);
      console.log("Token:", token);
      console.log("User ID:", userId);
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match." });
    }

    user.password = newPassword;
    await user.save();

    await Verify.deleteOne({ _id: verifyEntry._id });

    res
      .status(200)
      .json({ message: "Password has been changed successfully!" });
  } catch (error) {
    next(error);
  }
};

//authenticate

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Cookie does not exist or cookie expired" });
    }

    const token_payload = await verifyToken(
      token,
      process.env.JWT_SECRET as string
    );
    const user = await User.findById(token_payload.id).select("-password -is_activated -createdAt -updatedAt -__v -bookedCourses -cart");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted." });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

