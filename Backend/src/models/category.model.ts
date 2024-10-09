import { Schema, model, Document } from "mongoose";

//You extend Document in Mongoose to include MongoDB document methods and properties like _id and .save() for type safety and better functionality.
export interface CategoryDocument extends Document {
    categoryName: string
}

export const categorySchema = new Schema<CategoryDocument>({
    categoryName: { type: String, required: true, unique: true },
})

const Category = model<CategoryDocument>("Category", categorySchema);
export default Category;
