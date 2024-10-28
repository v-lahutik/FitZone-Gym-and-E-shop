import { Request, Response } from "express";
import Order from "../models/order.model";
import Product from "../models/product.model";
import User from "../models/user.model";
import { isValidObjectId } from "mongoose"
import { v4 as uuidv4 } from 'uuid';
import {CategoryDocument} from "../models/category.model";
import Category from "../models/category.model";

 //After clicking on the "Place Order" button - new order is created
export const createOrder = async (req: Request , res: Response) => {
  try {

    const { deliveryAddress, cart, user } = req.body; 

    let userId=user.shopUser._id

     // create a new user if the user id does not exist for guests
    if(!userId){
      const newUser = await User.create({
        firstName: user.shopUser.firstName,
        lastName: user.shopUser.lastName,
        email: user.shopUser.email,
        address: deliveryAddress
    })
     userId = newUser._id
  }
    // Check if cart is provided in the request body
    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Calculate total price
    let totalPrice = 0;
    const products = [];

    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      totalPrice += product.price * item.quantity;
      products.push({ productId: item.productId, quantity: item.quantity, price: product.price });
    }

    // Generate a unique order number using UUID
    const orderNumber = uuidv4();

    // Create and save the order
    const newOrder = await Order.create({
      userId,
      orderNumber,
      products,
      totalPrice,
      deliveryAddress
    });


    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Server error" });
  }
};



// User can view all their orders
export const getOrders = async (req: Request & { payload?: any }, res: Response) => {
  try {
      const userId = req.payload?.id; 

      if (!userId) {
          return res.status(400).json({ error: "User ID is required." });
      }

      const orders = await Order.find({ userId }).populate({path: "products.productId", populate: {path: "category", model: "Category"}})

      // Check if orders exist
      if (orders.length === 0) {
          return res.status(404).json({ error: "No orders found for this user." });
      }

      return res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ error: "Server error" });
  }
}

export const getSingleOrder = async (req: Request, res: Response) => {
  try {
      const { oid } = req.params;

      // Check if order id exists and valid
      if (!oid) {
          return res.status(400).json({ error: "Order ID is required." });
      }

      if (!isValidObjectId(oid)) {
          return res.status(400).json({ error: "Invalid Order ID format." });
      }

      const order = await Order.findById(oid).populate("products.productId");

      // Check if the order exists
      if (!order) {
          return res.status(404).json({ error: "Order not found." });
      }

      return res.status(200).json(order);
  } catch (error) {
      console.error("Error fetching single order:", error);
      return res.status(500).json({ error: "Server error" });
  }
}

// Controllers below is for admin only!!!

// Controller to get all orders - for admins only
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
    .populate({
      path: "products.productId",
      populate: {
        path: "category",
        model: "Category"
      }
    })
    .populate({
      path: "userId", 
      select: "firstName lastName", 
      model: "User"
    });

      // Check if orders exist
      if (orders.length === 0) {
          return res.status(404).json({ error: "No orders found." });
      }

      return res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching all orders:", error);
      return res.status(500).json({ error: "Server error" });
  }
}

// Controller to get any single orders - for admins only
export const getOneOrder = async (req: Request, res: Response) => {
  try {
      const { oid } = req.params; 

      if (!oid) {
          return res.status(400).json({ error: "Order ID is required." });
      }

      if (!isValidObjectId(oid)) {
          return res.status(400).json({ error: "Invalid Order ID format." });
      }

      const order = await Order.findById(oid).populate("products.productId");

      if (!order) {
          return res.status(404).json({ error: "Order not found." });
      }

      return res.status(200).json(order); // Return the found order
  } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ error: "Server error" });
  }
};

// Controller to update the status of an order - for admins only
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
      const { oid} = req.params;
      const { status } = req.body;

      if (!oid) {
          return res.status(400).json({ error: "Order ID is required." });
      }

      if (!isValidObjectId(oid)) {
          return res.status(400).json({ error: "Invalid Order ID format." });
      }

      const order = await Order.findByIdAndUpdate(oid, { status }, { new: true });

      if (!order) {
          return res.status(404).json({ error: "Order not found." });
      }

      return res.status(200).json(order);
  } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ error: "Server error" });
  }
}

// Controller to delete an order - for admins only! 
export const deleteOrder = async (req: Request, res: Response) => {
  try {
      const { oid } = req.params;

      if (!oid) {
          return res.status(400).json({ error: "Order ID is required." });
      }

      if (!isValidObjectId(oid)) {
          return res.status(400).json({ error: "Invalid Order ID format." });
      }
      // Delete the order
      const order = await Order.findByIdAndDelete(oid);

      // Check if the order was found and deleted
      if (!order) {
          return res.status(404).json({ error: "Order not found." });
      }

      return res.status(200).json({ message: "Order deleted successfully.", order });
  } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ error: "Server error" });
  }
}