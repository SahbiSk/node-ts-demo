import { Request, Response } from "express";
import User from "../models/User";
import { comparePw, encryptPw } from "../../core/utils";

//loggin in users
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const result = await comparePw(password, user.password.toString());

    if (!result)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = user.createJwt();
    return res.status(200).json({
      token,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

//adding a single user
export const addUser = async (req: Request, res: Response) => {
  try {
    let { email, password, username } = req.body;

    let ecryptedPw = await encryptPw(password);
    const user = User.build({ username, email, password: ecryptedPw });

    const result = await user.save();

    res.status(201).json({ ...result._doc, password });
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};

//getting all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-__v");
  res.status(200).json(users);
};
//deleting all users
export const deleteUsers = async (req: Request, res: Response) => {
  await User.deleteMany();
};
