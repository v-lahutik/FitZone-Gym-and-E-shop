import bcrypt from "bcrypt";
import { Schema, model, Document, ObjectId } from "mongoose";

export enum UserRole {
  member = "member",
  admin = "admin",
  guest = "guest",
}

export interface AddressInput {
  streetNumber: number;
  streetName: string;
  city: string;
  country: string;
  postCode: string;
}
const addressSchema = new Schema({
  streetNumber: {
      type: Number,
      required: true,
  },
  streetName: {
      type: String,
      required: true,
  },
  city: {
      type: String,
      required: true,
  },
  postCode: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true,
  }
}, { _id: false })


export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: AddressInput,
  role: string;
}

export interface UserDocument extends UserInput, Document {
  _id: ObjectId
  pass_changed_at?: Date; //optional field
  is_activated: boolean;
  bookedCourses: ObjectId[]
  cart:ObjectId[]
  comparePass(plainPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  address: {
    type: addressSchema,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.member,
  },
  is_activated: {
    type: Boolean,
    default: false,
  },
  bookedCourses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
  cart:[{ type:Schema.Types.ObjectId, ref: "products" }]
  
},{timestamps: true});

userSchema.pre<UserDocument>("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.pass_changed_at = new Date()
       
        next();
    } catch (error: Error | any) {
        next(error);
    }
});

userSchema.methods.comparePass = async function (this: UserDocument, plainPassword: string) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = model <UserDocument>("User", userSchema);
export default User;