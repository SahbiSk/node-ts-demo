import { Request, Response } from "express";
import User from "../models/User";

//loggin in users
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(403).json({ message: "Invalid email or password" });
  const user = await User.findOne({
    email,
    password,
  });
  if (user) {
    return res.status(200).json({ message: "Logged in!" });
  } else {
    return res.status(403).json({ message: "Invalid email or password" });
  }
};

//adding a single user
export const addUser = async (req: Request, res: Response) => {
  const user = User.build(req.body);
  const result = await user.save();
  console.log(result);
  res.status(201).json(user);
};

//getting all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
};
