import { Router } from "express";
import {
  addUser,
  deleteUsers,
  getUsers,
  login,
} from "../controllers/userControllers";

const router = Router();

router.post("/login", login);
router.post("/addUser", addUser);
router.get("/getUsers", getUsers);
router.delete("/delete", deleteUsers);

export { router as userRouter };
