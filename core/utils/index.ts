import bcrypt from "bcrypt";
import { SALT } from "../constants";
import { generate } from "generate-password";

export const encryptPw = async (pwd: string) => {
  return await bcrypt.hash(pwd, SALT);
};

export const comparePw = async (pwd: string, userPw: string) => {
  return await bcrypt.compare(pwd, userPw);
};

export const generatePw = () =>
  generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });
