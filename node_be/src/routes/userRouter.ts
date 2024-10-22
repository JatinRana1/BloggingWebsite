import { Router } from "express";
import { adminController } from "../controller/adminController";

export const userRouter = Router();

//admin routes
userRouter.post('/login', adminController.login)