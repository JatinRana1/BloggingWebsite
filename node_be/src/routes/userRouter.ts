import { Router } from "express";
import { adminController } from "../controller/adminController";

export const userRouter = Router();

//admin routes
userRouter.post('/login', adminController.login);
userRouter.post('/refresh_token', adminController.refreshToken);