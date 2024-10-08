
import { NextFunction, Request, Response } from "express";
import CourseTemplate from "../models/courseTemplate.model";



export const getAllCourseTemplates = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
      const allTemplates = await CourseTemplate.find({});
      res.status(200).json({ msg: "get all course template data successfully", allTemplates });
    } catch (error: any) {
      next(error);
    }
};


export const deleteCourseTemplate = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const tid = req.params.tid; // tid is course template ID of mongoDB
      const deletedTemplate = await CourseTemplate.findByIdAndDelete(tid);
      if (deletedTemplate) {
        res.status(200).json({ msg: "Course template deleted successfully",deletedTemplate });
      } else {
        return res.status(400).json({ msg: 'There is no such template in our database' });
      }
    } catch (error) {
      next(error);
    }
};

export const createNewCourseTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {coursePic, courseName,category,weekday,time,maxParticipants,description,instructor} = req.body;
    const newCourseTemplate = await CourseTemplate.create({coursePic, courseName,category,weekday,time,maxParticipants,description,instructor});
    res.status(200).json({ msg: "Course template added successfully", newCourseTemplate });
  } catch (error: any) {
    next(error);
  }
};

export const editCourseTemplate = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const tid = req.params.tid  // tid is course template ID of mongoDB
        const{coursePic, courseName,category,weekday,time,maxParticipants,description,instructor} = req.body;
        const editedCourse = await CourseTemplate.findByIdAndUpdate(tid, {coursePic, courseName,category,weekday,time,maxParticipants,description,instructor}, { new: true });
        res.status(200).json({ msg: "Course template edited successfully", editedCourse });
    } catch (error) {
        next(error);
    }
}
