import express from "express";
import userController from "../controllers/user-controller.js";

const publicRuoter = express.Router();
publicRuoter.post('/api/users', userController.register);
publicRuoter.post('/api/users/login', userController.login);

export {
    publicRuoter
}
