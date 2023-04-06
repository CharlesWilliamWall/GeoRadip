const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { postSchema } = require("./post.model");
const { followSchema } = require("./follow.model");
const { pointSchema } = require("./point.model");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [15, "the name is too long"],
      minlength: [4, "The name is too short"],
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      trim: true,
      minlength: [6, "the password must contain at least 6 characters"],
      required: true,
    },
    points: [pointSchema], // [pointSchema]
    followers: { type: Array },
    followees: { type: Array },
    profilePicture: { type: String },
    posts: [postSchema],
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
