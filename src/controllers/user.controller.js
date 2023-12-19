import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
 import sendEmail from "../utils/sendEmail.js";
// import cloudinary from "cloudinary";
import sendToken from "../utils/jwtToken.js";
import crypto from "crypto";
import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";

//test api
export const test = (req, res) => {
    res.json({
        message: "api route is working properly",
    });
};
// Register a User
export const signUp = catchAsyncErrors(async (req, res, next) => {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    // });

    const { username, email, password, role } = req.body;
    

    const user = await User.create({
        username,
        email,
        password,
        role,
        // avatar: {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // },
    });

    sendToken(user, 201, res);
    
});

// Login User
export const signIn = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new errorHandler("Please Enter Email & Password", 400))
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new errorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched =await user.comparePassword(password); 

    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
export const signOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }
    
    // Get ResetPassword Token
    const resetToken =await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Swasthya-med Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new errorHandler(error.message, 500));
    }
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new errorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Update User Password
export const updateUserPassword = catchAsyncErrors(async (req, res, next) => { 
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) { 
        return next(new errorHandler("old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) { 
        return next(new errorHandler("password does not match", 400));
    }
    user.password = req.body.password;

    await User.save();
    sendToken(user, 200, res);
});

// Get user details
export const getUserDetails = catchAsyncErrors(async (req, res) => { 
    const user = await user.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//update user Profile
export const updateUserProfile = catchAsyncErrors(async (req, res, next) => { 
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
    };

    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id);

    //     const imageId = user.avatar.public_id;

    //     await cloudinary.v2.uploader.destroy(imageId);

    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale",
    //     });

    //     newUserData.avatar = {
    //         public_id: myCloud.public_id,    
    //         url_id: myCloud.secure_url,
    //     };
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
    });
});

//Update User Role -- Admin
export const updateUserRole = catchAsyncErrors(async (req, res, next) => { 
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
    };
    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });    
});

//Get all users(admin)
export const getAllUsers = catchAsyncErrors(async (req, res, next) => { 
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });    
});

// Get single user(admin)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => { 
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new errorHandler('User does not exist with this id: $(req.params.id)')
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Delete User -- Admin
export const deleteUser = catchAsyncErrors(async (req, res, next) => { 
    const user = await User.findById(req.params.id);

    if (!user) { 
        return next(
            new errorHandler('User does not exist with this id: $(req.params.id}',400)
        );
    }

    // const imageId = user.avatar.public_id;

    // await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message:"User Deleted Successfully",
    });
});