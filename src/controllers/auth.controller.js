import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorhandler } from '../utils/error.js';
import Jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);  //password hashed by using bcryptjs
    const newUser = new User({ username, email, password:hashedPassword });
    try {
        await newUser.save();
        res
            .status(201)
            .json({ message: "user created successfully"});
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorhandler(404, 'user not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorhandler(401, 'wrong credentials'));
        const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
        const { password: pass, ...rest } = validUser._doc;  //hiding password information from console
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');
    } catch (error) {
        next(error);
    }
};