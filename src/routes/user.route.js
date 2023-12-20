import Express from "express";
import {
    test,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    updateUserPassword,
    getUserDetails,
    updateUserProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
} from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = Express.Router();

router.get('/test', test);

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.get('/sign-out', signOut);

router.post('/password/forgot', forgotPassword);

router.put('/password/reset/:token', resetPassword);

router.put('/password/update', isAuthenticatedUser, updateUserPassword);

router.get('/me',isAuthenticatedUser, getUserDetails);

router.put('/me/update', isAuthenticatedUser, updateUserProfile);

// Admin routes

router.get('/admin/users',isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);

router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default router;