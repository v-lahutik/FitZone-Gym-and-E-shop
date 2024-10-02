import bcrypt from "bcrypt";
import { Schema, model, Document, ObjectId } from "mongoose";

export enum UserRole {
  member = "Member",
  admin = "Admin",
  guest = "Guest",
}
export enum membership{
  basic = "Basic",
  standard = "Standard",
  premium = "Premium",
  staff= "Staff"
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
  address: AddressInput
  membership: string,
  role: string;
  profilePic?: string;
}

export interface UserDocument extends UserInput, Document {
  _id: ObjectId;
  password: string;
  pass_changed_at?: Date; 
  is_activated: boolean;
  bookedCourses:Schema.Types.ObjectId[];
  cart: { productId: Schema.Types.ObjectId, quantity: number }[];
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
    // default password because registration is done by admin
    default: function () {
      return (this.firstName + this.lastName).toLowerCase();
    }
  },
  address: {
    type: addressSchema,
    required: true,
  },
  membership: {
    type: String,
    enum: Object.values(membership),
    default: membership.basic,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.member,
  },
  profilePic: {
    type: String,
    default: "https://res.cloudinary.com/dqwwj6av8/image/upload/v1727783301/uws5sujdjwjpvxj2ksdg.png",
  },
  is_activated: {
    type: Boolean,
    default: false,
  },
  bookedCourses:[{ type: Schema.Types.ObjectId, ref:'Course'}],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ]
},{timestamps: true});


//pre save hook to hash password before saving or changing password
userSchema.pre<UserDocument>("save", async function (next) {
    try {
        if (!this.isNew && !this.isModified("password")) {
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