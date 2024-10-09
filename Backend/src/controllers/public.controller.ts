import { NextFunction, Request, Response } from "express";

import CourseTemplate from "../models/courseTemplate.model";

export const getAllPublicTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTemplates = await CourseTemplate.find({});
    res
      .status(200)
      .json({ msg: "get all course template data successfully", allTemplates });
  } catch (error: any) {
    next(error);
  }
};

// get coursetemplate by id
export const getCourseTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tid = req.params.tid;
    const template = await CourseTemplate.findById(tid);
    res
      .status(200)
      .json({ msg: "get course template data successfully", template });
  } catch (error: any) {
    next(error);
  }
};
