import { Schema, model, Model, Document } from "mongoose";

interface IUser {
  email: String;
  password: String;
}

interface IUserDoc extends Document {
  email: String;
  password: String;
}
interface IUserModel extends Model<IUserDoc> {
  build(user: IUser): IUserDoc;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

userSchema.statics.build = (user: IUser) => new User(user);

const User = model<IUserDoc, IUserModel>("User", userSchema);

export default User;
