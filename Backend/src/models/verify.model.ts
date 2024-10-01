import { Schema, model, Document } from "mongoose";

interface VerifyDocument extends Document {
    token: string;
    userId: string;
    expiresAt: Date;
}

const verifySchema = new Schema<VerifyDocument>({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },

});


const Verify = model<VerifyDocument>('Verify', verifySchema);
export default Verify;