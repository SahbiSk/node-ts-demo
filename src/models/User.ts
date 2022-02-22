import { Schema, model, Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

//env variables
config();
const secret = process.env.JWT_SECRET || "";
const expiresIn = process.env.JWT_EXPIRES || "";

interface IUser {
  username: String;
  email: String;
  password: String;
}

interface IUserDoc extends Document {
  username: String;
  email: String;
  password: String;
  _doc: any;
  createJwt(): String;
}
interface IUserModel extends Model<IUserDoc> {
  build(user: IUser): IUserDoc;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

//using statics to define a helper function that belongs to the whole model
userSchema.statics.build = (user: IUser) => new User(user);
//using methods to define a helper function that behaves directly on a an document (model instance)
userSchema.methods.createJwt = function () {
  return jwt.sign({ id: this.id, email: this.email }, secret, {
    expiresIn,
  });
};

const User = model<IUserDoc, IUserModel>("User", userSchema);

export default User;
