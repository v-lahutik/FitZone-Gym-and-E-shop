import { NextFunction, Request, Response } from "express";

import CourseTemplate from "../models/courseTemplate.model";
import Product from "../models/product.model";

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

// get product by id
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pid = req.params.pid;
    const product = await Product.findById(pid);
    res
      .status(200)
      .json({ msg: "get product data successfully", product });
  } catch (error: any) {
    next(error);
  }
};
