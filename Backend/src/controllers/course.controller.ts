import { NextFunction, Request, Response } from "express";
import Course from "../models/course.model";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCourses = await Course.find({});
    console.log("🚀 ~ allCourses:", allCourses);
    res
      .status(200)
      .json({ msg: "get all course data successfully", allCourses });
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cid = req.params.cid; // cid is course ID of mongoDB
    const deletedCourse = await Course.findByIdAndDelete(cid);
    if (deletedCourse) {
      res
        .status(200)
        .json({ msg: "Course deleted successfully", deletedCourse });
    } else {
      return res
        .status(400)
        .json({ msg: "There is no such course in our database" });
    }
  } catch (error) {
    next(error);
  }
};

export const addNewCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      courseName,
      category,
      weekday,
      date,
      time,
      maxParticipants,
      description,
      instructor,
    } = req.body;
    const newCourse = await Course.create({
      courseName,
      category,
      weekday,
      date,
      time,
      maxParticipants,
      description,
      instructor,
    });
    res.status(200).json({ msg: "Course added successfully", newCourse });
  } catch (error: any) {
    next(error);
  }
};

export const editCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cid = req.params.cid; // cid is course ID of mongoDB
    const {
      courseName,
      category,
      weekday,
      date,
      time,
      maxParticipants,
      description,
      instructor,
    } = req.body;
    const editedCourse = await Course.findByIdAndUpdate(
      cid,
      {
        courseName,
        category,
        weekday,
        date,
        time,
        maxParticipants,
        description,
        instructor,
      },
      { new: true }
    );
    res.status(200).json({ msg: "Course edited successfully", editedCourse });
  } catch (error) {
    next(error);
  }
};
