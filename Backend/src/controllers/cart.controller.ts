import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import Product from "../models/product.model";

export const toAddToCart = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.payload;
    const productID = req.params.pid;
    if (!payload) {
      return res
        .status(401)
        .json({ msg: "no valid token found you need to login first!!" });
    }
    // check the product
    const product = await Product.findById(productID).select(
      "-createdAt -updatedAt -__v"
    );
    if (!product) {
      return res.status(400).json({ msg: "No such product" });
    }

    const user = await User.findById(payload.id).select(
      "-password -address -is_activated -createdAt -updatedAt -__v"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    //add product id to user's cart array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { cart: productID } },
      { new: true }
    )
      .select("-password -address -is_activated -createdAt -updatedAt -__v")
      .populate("cart", "-createdAt -updatedAt -__v");

    res.status(200).json({ msg: "added to your cart", updatedUser });
  } catch (error: any) {
    next(error);
  }
};

export const toDeleteFromCart = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.payload;
    const productID = req.params.pid;
    if (!payload) {
      return res
        .status(401)
        .json({ msg: "no valid token found you need to login first!!" });
    }
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // check the product
    const product = await Product.findById(productID).select(
      "-createdAt -updatedAt -__v"
    );
    if (!product) {
      return res.status(400).json({ msg: "No such product" });
    }

    //remove product id from user's cart array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { cart: product._id } },
      { new: true }
    )
      .select("-password -address -is_activated -createdAt -updatedAt -__v")
      .populate("cart", "-createdAt -updatedAt -__v");

    res.status(200).json({msg: "the product removed from your cart", updatedUser,});
  } catch (error: any) {
    next(error);
  }
};
