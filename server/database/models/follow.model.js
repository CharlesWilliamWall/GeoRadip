const mongoose = require("mongoose");
const { postSchema } = require("./post.model");
const followSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, },
  profilePicture: { type: String },
  posts: [postSchema],
});

const Follow = mongoose.model("follow", followSchema);

module.exports = { Follow, followSchema };