import { Schema, model, Document } from "mongoose";

export interface ProductInput {
  productName: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category?: string[];
}

export interface ProductDocument extends ProductInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
    stock: { type: Number, required: true, min: [0, 'Stock must be a positive number'] },
    image: { type: String, required: true },
    category:  [{ type: Schema.Types.ObjectId, ref: "Category" , required: true }]
  }, { timestamps: true }
);

const Product = model<ProductDocument>("Product", productSchema);
export default Product;
