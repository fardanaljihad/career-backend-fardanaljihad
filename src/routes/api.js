import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import searchController from "../controllers/search-controller.js";

const userRouter = express.Router();
const searchRouter = express.Router();
userRouter.use(authMiddleware);
searchRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/:id', userController.deleteUser);

searchRouter.get('/api/search/name', searchController.searchByName);
searchRouter.get('/api/search/nim', searchController.searchByNim);

export {
    userRouter,
    searchRouter
}
