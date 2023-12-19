import User from "../models/user.model.js";
import  errorHandler  from "../utils/errorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import  jwt  from 'jsonwebtoken';

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => { 
    const { token } = req.cookies;

    if (!token) {
        return next(new errorHandler("please login to access this resource",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

export const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return next(
                new errorHandler(
                    'Roles: ${req.user.roles} is not allowed to access this resource', 403
                )
            );
        }
        next();
    };
};