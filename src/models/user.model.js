import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength:[3,'Too short name'],
        maxlength:[55,'Too long name'],
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: [6, 'Must have minimum of six character long'],
        max:[20,'Must not be more then twenty characters'],
    },
});

const User = mongoose.model('User', userSchema);
export default User;