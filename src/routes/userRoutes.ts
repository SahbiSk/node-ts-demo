import { Router } from "express";
import { addUser, getUsers, login } from "../controllers/userControllers";

const router = Router();

router.post("/login", login);
router.post("/addUser",addUser);
router.get("/getUsers", getUsers);

export { router as userRouter };
