const User = require("../database/models/user.model");
const { Post } = require("../database/models/post.model");

exports.findUserByID = (id) => {
  return User.findById(id).select("-password");
};

exports.findUserByEmail = (email) => {
  return User.findOne({ email: email });
};

exports.createUser = async (data) => {
  const user = await this.findUserByEmail(data.email);
  if (user) throw new Error("Courriel déjà utilisé");
  const hashedPassword = await User.hashPassword(data.password);
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    profilePicture: data.profilePicture,
  });
  return newUser.save();
};

exports.deleteAllUsers = () => {
  return User.deleteMany({});
};

/* exports.updateUserPoint = (data) => {
  return User.findOneAndUpdate(
    { email: data.email },
    { $push: { points: data.points } },
    { runValidators: true, new: true }
  );
}; */

exports.updateUserFollowee = (data) => {
  return User.findOneAndUpdate({ name: data.followers }, { $push: { followees: data.followees } }, { runValidators: true, new: true });
};

exports.updateUserFollower = (data) => {
  return User.findOneAndUpdate({ name: data.followees }, { $push: { followers: data.followers } }, { runValidators: true, new: true });
};

exports.showAllUsers = () => {
  return User.find();
};

exports.getAllFollower = () => {
  return User.find();
};

exports.getAllFollowee = () => {
  return User.find();
};

exports.createPost = (data) => {
  return User.findOneAndUpdate(
    { name: data.user },
    { $push: { posts: data } },
    { runValidators: true, new: true }
  );
};

exports.updateProfilePicture = (data) => {
  return User.findOneAndUpdate (
    { name: data.user },
    { profilePicture: data.profilePicture },
  )
};

exports.savePoint = (data) => {
  console.log('on va ajouter des points');
  return User.findOneAndUpdate(
    { email: data.email },
    { $push: { points: data.points } },
    { runValidators: true, new: true }
  );
};

  