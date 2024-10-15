import { Schema, model, Document, Types, ObjectId } from "mongoose";
import Category, { CategoryDocument } from './category.model'

export interface ProductInput {
  productName: string;
  description: string;
  price: number;
  stock: number;
  image?: string;

}

export interface ProductDocument extends ProductInput, Document {
  category: Schema.Types.ObjectId | CategoryDocument;
  averageRating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;

}

const productSchema = new Schema<ProductDocument>(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock must be a positive number"],
    },
    image: { type: String, required: true },

    category:  { type: Schema.Types.ObjectId, ref: "Category" , required: true },
    averageRating: { type: Number, min: 0, max: 5 },
    numReviews: { type: Number},
  }, { timestamps: true }

  

);

const Product = model<ProductDocument>("Product", productSchema);
export default Product;
