import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import mongoose, {Types} from "mongoose";
import Product from "../models/product.model";

export const toAddToCart = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.payload;
    const productID = req.params.pid;
    const quantity = req.body.quantity || 1; // Get the quantity from the request body

    if (!payload) {
      return res
        .status(401)
        .json({ msg: "No valid token found, you need to login first!!" });
    }

    // Check the product
    const product = await Product.findById(productID).select(
      "-createdAt -updatedAt -__v"
    );
    if (!product) {
      return res.status(400).json({ msg: "No such product" });
    }

    // Convert productID to ObjectId if it's a string
    const productObjectId = new Types.ObjectId(productID);

    // Update user cart
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: payload.id,
        "cart.productId": productObjectId, // Check if product exists in the cart
      },
      {
        // Increment quantity if the product exists
        $inc: { "cart.$.quantity": quantity },
      },
      { new: true }
    )
      .select("-password -address -is_activated -createdAt -updatedAt -__v")
      .populate({
        path: "cart.productId", 
        select: "-createdAt -updatedAt -__v",
        populate: {
          path: "category", 
          select: "categoryName" // Populating categoryName here
        }
      });

    // If the product is not in the cart, add it
    if (!updatedUser) {
      const newUser = await User.findByIdAndUpdate(
        payload.id,
        {
          $push: {
            cart: { productId: productObjectId, quantity },
          },
        },
        { new: true }
      )
        .select("-password -address -is_activated -createdAt -updatedAt -__v")
        .populate({
          path: "cart.productId", 
          select: "-createdAt -updatedAt -__v",
          populate: {
            path: "category", 
            select: "categoryName"
          }
        });

      if (!newUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.status(200).json({ msg: "Added to your cart", updatedUser: newUser });
    }

    res.status(200).json({ msg: "Updated cart quantity", updatedUser });
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
        .json({ msg: "No valid token found, you need to login first!!" });
    }

    // Convert productID to ObjectId if it's a string
    const productObjectId = new Types.ObjectId(productID);

    // Check the product
    const product = await Product.findById(productObjectId).select(
      "-createdAt -updatedAt -__v"
    );
    if (!product) {
      return res.status(400).json({ msg: "No such product" });
    }

    // Find the user to check cart item quantity
    const user = await User.findById(payload.id)
      .select("cart")
      .lean(); // Use lean() to get a plain JavaScript object
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find the cart item
    const cartItem = user.cart.find((item) => item.productId.toString() === productObjectId.toString());

    if (!cartItem) {
      return res.status(400).json({ msg: "Product not found in the cart" });
    }

    // If quantity is greater than 1, decrement it; otherwise, remove it
    if (cartItem.quantity > 1) {
      const updatedUser = await User.findByIdAndUpdate(
        payload.id,
        { $set: { "cart.$[elem].quantity": cartItem.quantity - 1 } },
        {
          new: true,
          arrayFilters: [{ "elem.productId": productObjectId }] // Update the specific item
        }
      )
        .select("-password -address -is_activated -createdAt -updatedAt -__v")
        .populate("cart.productId", "-createdAt -updatedAt -__v");

      return res.status(200).json({
        msg: "Item deleted from your cart in your cart",
        updatedUser,
      });
    } else {
      // Remove the item from the cart since quantity is 1
      const updatedUser = await User.findByIdAndUpdate(
        payload.id,
        { $pull: { cart: { productId: productObjectId } } }, // Remove the item from the cart by productId
        { new: true } // Return the updated document
      )
        .select("-password -address -is_activated -createdAt -updatedAt -__v")
        .populate("cart.productId", "-createdAt -updatedAt -__v");

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({
        msg: "The product has been removed from your cart",
        updatedUser,
      });
    }
  } catch (error: any) {
    next(error);
  }
};

export const toClearCart = async (
  req: Request & { payload?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.payload;

    if (!payload) {
      return res
        .status(401)
        .json({ msg: "No valid token found, you need to login first!" });
    }

    // Update the user by clearing the cart
    const updatedUser = await User.findByIdAndUpdate(
      payload.id,
      { $set: { cart: [] } }, // Set the cart to an empty array
      { new: true } // Return the updated document
    )
      .select("-password -address -is_activated -createdAt -updatedAt -__v")
      .populate("cart.productId", "-createdAt -updatedAt -__v"); // Populate the product details in the cart

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "Your cart has been cleared",
      updatedUser,
    });
  } catch (error: any) {
    next(error);
  }
};
