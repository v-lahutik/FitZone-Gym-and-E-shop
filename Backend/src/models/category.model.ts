import { Schema, model, Document } from "mongoose";


export interface CategoryDocument extends Document {
    categoryName: string
}

export const categorySchema = new Schema<CategoryDocument>({
    categoryName: { type: String, required: true, unique: true },
})

const Category = model<CategoryDocument>("Category", categorySchema);
export default Category;
