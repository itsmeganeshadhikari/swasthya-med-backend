import Express from "express";
import {getUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const userRouter = Express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verifyToken,updateUser);
userRouter.get('/:id', verifyToken,getUser);

export default userRouter;