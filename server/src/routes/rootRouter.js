import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import attractionsRouter from './api/v1/attractionsRouter.js'
import keywordsRouter from "./api/v1/keywordsRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/attractions", attractionsRouter)
rootRouter.use('/api/v1/keywords', keywordsRouter )

export default rootRouter;
