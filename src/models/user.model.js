import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   minlength: [3, "Too short name"],
  //   maxlength: [55, "Too long name"],
  //   unique: true,
  //   trim: true,
  // },
  firstName: {
    type: String,
    minlength: [3, "Too short name"],
    maxlength: [55, "Too long name"],
    required: [true, " Please enter first name"],
    trim: true,
  },
  lastName: {
    type: String,
    minlength: [3, "Too short name"],
    maxlength: [55, "Too long name"],
    required: [true, " Please enter your  last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter Your Email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    min: [6, "Must have minimum of six character long"],
    max: [20, "Must not be more then twenty characters"],
    select: false,
  },
  phoneNumber: {
    type: String,
    minlength: [, "Too short number"],
    maxlength: [55, "Too long number"],
    required: [true, " Please enter your phone number"],
    unique: true,
    trim: true,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
});

// Duplicate the ID field.
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
