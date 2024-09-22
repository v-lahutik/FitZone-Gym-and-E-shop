import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import User from "../models/user.model";
import Course from "../models/course.model";
import mongoose from "mongoose";

mongoose.set("strictPopulate", false);

export const bookingCourse = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.payload;
    // cid == course ID
    const cid: any = req.params.cid;
    
    if (!payload) {
      return res
        .status(401)
        .json({ msg: "no valid token found you need to login first!!" });
    }
    if (!cid) {
      return res.status(400).json({ msg: "No such course" });
    }

    const user = await User.findById(payload.id).select('-password -address -is_activated -createdAt -updatedAt -__v');
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //check if course is already booked
    const courseAlreadyBooked = user?.bookedCourses.includes(cid);
    if (courseAlreadyBooked) {
      return res.status(400).json({ msg: "You already booked that course" });
    }

    const course = await Course.findById(cid).select('-createdAt -updatedAt -__v');
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    //check if course is full
    if (course?.participants?.length === course?.maxParticipants) {
      return res.status(400).json({ msg: "Sorry, this course is full" });
    }

     //add course id to user's bookedCourses array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { bookedCourses: cid } },
      { new: true }
    ).select('-password -address -is_activated -createdAt -updatedAt -__v').populate("bookedCourses", "-createdAt -updatedAt -__v");

    //add user id to course's participants array
    const updatedCourse = await Course.findByIdAndUpdate(
      cid,
      { $push: { participants: user._id } },
      { new: true }
    ).select('-createdAt -updatedAt -__v').populate("participants","firstName lastName email role");

    res.status(200).json({ msg: "Course booked", updatedUser, updatedCourse });
  } catch (error: any) {
    next(error);
  }
};

export const cancelBooking = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.payload;
    const cid: any = req.params.cid;
    if (!payload) {
      return res
        .status(401)
        .json({ msg: "no valid token found you need to login first!!" });
    }
    if (!cid) {
      return res.status(400).json({ msg: "No such course" });
    }

    const user = await User.findById(payload.id)
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //check if course is booked
    const courseIsBooked = user.bookedCourses.some((courseId) => courseId.toString() === cid);
    if (!courseIsBooked) {
      return res.status(400).json({ msg: "You have not booked that course" });
    }

    //remove course id from user's bookedCourses array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { bookedCourses: cid } },
      { new: true }
    ).select('-password -address -is_activated -createdAt -updatedAt -__v').populate("bookedCourses", "-createdAt -updatedAt -__v");

    //remove user id from course's participants array
    const updatedCourse = await Course.findByIdAndUpdate(
      cid,
      { $pull: { participants: user._id } },
      { new: true }
    ).select('-createdAt -updatedAt -__v').populate("participants","firstName lastName email role");

    res
      .status(200)
      .json({
        msg: "You canceled the course !",
        updatedUser,
        updatedCourse,
      });
  } catch (error: any) {
    next(error);
  }
};
