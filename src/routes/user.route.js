import Express from "express";
import {
    deleteUser,
    forgotPassword,
    getUser,
    resetPassword,
    signIn,
    signOut,
    signUp,
    test,
    updateUser
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Express.Router();

router.get('/test', test);
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);
router.get('/password/forgot', forgotPassword);
router.get('/password/reset/:token', resetPassword);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken,deleteUser);
router.get('/:id', verifyToken,getUser);

export default router;