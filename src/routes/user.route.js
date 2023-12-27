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

const userRoute = Express.Router();

userRoute.get("/test", test);

userRoute.post("/sign-up", signUp);

userRoute.post("/sign-in", signIn);

userRoute.get("/sign-out", signOut);

userRoute.post("/password/forgot", forgotPassword);

userRoute.put("/password/reset/:token", resetPassword);

userRoute.put("/password/update", isAuthenticatedUser, updateUserPassword);

userRoute.get("/me", isAuthenticatedUser, getUserDetails);

userRoute.put("/me/update", isAuthenticatedUser, updateUserProfile);

// Admin routes

userRoute.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);

userRoute.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);

userRoute.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);

userRoute.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

export default userRoute;
