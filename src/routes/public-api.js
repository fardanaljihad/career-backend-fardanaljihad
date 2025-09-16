import express from "express";
import userController from "../controllers/user-controller.js";

const publicRuoter = express.Router();
publicRuoter.post('/api/users', userController.register);

export {
    publicRuoter
}
