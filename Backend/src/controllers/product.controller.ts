import { NextFunction, Request, Response } from "express";
import Product from "../models/product.model";



export const addNewProduct = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const {productName,description,price,stock,image,category} = req.body
        const newProduct = await Product.create({productName,description,price,stock,image,category})
        await newProduct.populate("category")
        res.status(200).json({ msg: "new product added successfully", newProduct });
    } catch (error:any) {
        next(error)
    }
}

export const editProduct = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const pid = req.params.pid
        const {productName,description,prise,stock,image,category} = req.body
        const editedProduct = await Product.findByIdAndUpdate(pid, {productName,description,prise,stock,image,category}, { new: true });
        await editedProduct?.populate('category')
        res.status(200).json({ msg: "product edited successfully", editedProduct });
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const pid = req.params.pid;
      const deletedProduct = await Product.findByIdAndDelete(pid);
      await deletedProduct?.populate("category")
      if (deletedProduct) {
        res.status(200).json({ msg: "Course deleted successfully",deletedProduct });
      } else {
        return res.status(400).json({ msg: 'There is no such product in our database' });
      }
    } catch (error) {
      next(error);
    }
};

export const getAllProducts = async (req: Request,res: Response,next: NextFunction) => {
    try {
      const allProducts = await Product.find({}).populate("category").exec();
      res.status(200).json({ msg: "get all product successfully", allProducts });
    } catch (error: any) {
      next(error);
    }
};

