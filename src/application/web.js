import express from "express";
import { publicRuoter } from "../routes/public-api.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { searchRouter, userRouter } from "../routes/api.js";

export const web = express();
web.use(express.json());

web.use(publicRuoter);
web.use(searchRouter);
web.use(userRouter);

web.use(errorMiddleware);
