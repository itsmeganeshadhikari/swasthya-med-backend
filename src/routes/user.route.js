import Express from "express";
import test from "../controllers/user.controller.js";


const userRouter = Express.Router();

userRouter.get('/test', test);

export default userRouter;