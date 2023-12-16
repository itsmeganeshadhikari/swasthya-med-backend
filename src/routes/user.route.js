import Express from "express";
import {deleteUser, getUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const userRouter = Express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verifyToken, updateUser);
userRouter.delete('/delete/:id', verifyToken,deleteUser);
userRouter.get('/:id', verifyToken,getUser);

export default userRouter;