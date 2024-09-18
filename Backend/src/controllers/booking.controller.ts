import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import User from "../models/user.model";
import { ObjectId } from "mongoose";
import Course from "../models/course.model";



export const bookingCourse = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.token;
        const cid:any = req.params.cid
        const isVerified = await verifyToken(token, process.env.SECRET_KEY as string);
        if (!isVerified) {
          return res.status(401).json({ msg: "no valid token found you need to login first!!" });
        }
        if (!cid) {
          return res.status(400).json({ msg: "No such course" });
        }

        //check if course is already booked
        const user = await User.findById(isVerified.id);
        const courseAlreadyBooked = user?.bookedCourses.includes(cid)
        if(courseAlreadyBooked){
          return res.status(400).json({ msg: "You already booked that course" });
        }

        //check if course is full
        const course = await Course.findById(cid);
        if(course?.participants?.length === course?.maxParticipants){
          return res.status(400).json({ msg: "Sorry, this course is full" });
        }
    
        //add course id to user's bookedCourses array
        user?.bookedCourses.push(cid)
        user?.save()
        //add user id to course's participants array
        course?.participants?.push(isVerified.id)
        course?.save()

        await user?.populate("courses")
        await course?.populate("users","participants")
    
        res.status(200).json({ msg: "Course booked", user, course });
    } catch (error:any) {
        next(error)
    }
}

export const cancelBooking = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.token;
        const cid:any = req.params.cid
        const isVerified = await verifyToken(token, process.env.SECRET_KEY as string);
        if (!isVerified) {
          return res.status(401).json({ msg: "no valid token found you need to login first!!" });
        }
        if (!cid) {
          return res.status(400).json({ msg: "No such course" });
        }
    
        //check if course is booked
        const user = await User.findById(isVerified.id);
        const courseIsBooked = user?.bookedCourses.includes(cid);
        if(!courseIsBooked){
            return res.status(400).json({ msg: "You have not booked that course" });
        }
    
        //remove course id from user's bookedCourses array
        if (user && user.bookedCourses) {
            user.bookedCourses = user.bookedCourses.filter(id => id !== cid);
            user.save()
        }
    
        //remove user id from course's participants array
        const updatedCourse = await Course.findByIdAndUpdate(cid,
        { $pull: { participants: user?._id } },{ new: true });

        await user?.populate("courses")
        await updatedCourse?.populate("users","participants")
    
        res.status(200).json({ msg: "Course booking deleted", updatedUser: user, updatedCourse });
    } catch (error:any) {
        next(error)
    }
}