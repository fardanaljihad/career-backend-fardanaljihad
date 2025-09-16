import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/:id', userController.deleteUser);

export {
    userRouter
}
