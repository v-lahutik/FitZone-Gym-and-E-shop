import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";
import { createError } from "../utils/helper";


export const addNewCategory = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {categoryName} = req.body
        const newCategory = await Category.create({categoryName})
        res.status(200).json({ msg: "new category added successfully", newCategory});
    } catch (error:any) {
        next(error)
    }
}

export const deleteCategory = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const cid = req.params.cid
        const deletedCategory = await Category.findByIdAndDelete(cid)
        if (deletedCategory) {
            res.status(200).json({ msg: "deleted the category successfully", deletedCategory});
        } else {
            throw createError("there is no such category", 403)
        }
    } catch (error:any) {
        next(error)
    }
}