import { Document, Schema, model } from 'mongoose';

// Define the interface for Contact
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  isStarred?: boolean;
  isImportant?: boolean;
  isRead?: boolean;
  date?: Date;
}

// Create the schema
const contactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isStarred: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  isRead: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const Contact = model<IContact>('Contact', contactSchema);

export default Contact;
