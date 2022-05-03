import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import attractionsRouter from './api/v1/attractionsRouter.js'
import attractionsReviewsRouter from "./api/v1/attractionsReviewsRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/users/sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/attractions", attractionsRouter)
rootRouter.use("/ap1/v1/reviews", attractionsReviewsRouter)

export default rootRouter;
