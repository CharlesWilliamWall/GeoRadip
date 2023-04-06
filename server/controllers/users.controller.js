const {
    createUser,
    findUserByEmail,
    findUserByID,
    updateUserPoint,
    updateUserFollowee,
    updateUserFollower,
    showAllUsers,
    getAllFollower,
    getAllFollowee,
    createPost,
    updateProfilePicture,
    savePoint,
    deleteAllUsers
  } = require("../queries/users.queries");
  const { publicKey } = require("../environment/keys"); 
  const jwt = require("jsonwebtoken");
  
exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.params.email);
    res.send(user ? { email: user.email } : null);
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    const token = jwt.sign({ userId: user._id }, publicKey, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });
    
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, publicKey, async (error, decoded) => {
      
        if (!error) {
          const user = await findUserByID(decoded.userId);
          if (user) {
            res.json(user);
            return;
          }
        } else {
          res.clearCookie("token");
          res.json(null);
        }
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
  
exports.updateUserPointController = async (req, res, next) => {
  try {
    await updateUserPoint(req.body);
    res.json({ msg: req.body.email });
  } catch (err) {
    next(err);
  }
};

exports.showAllUsers = async (req, res, next) => {
  try {
    const users = await showAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await findUserByID(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const users = require("../database/models/user.model");
exports.addFollowerController = async (req, res, next) => {
  try {
    console.log(req.body);
    await updateUserFollower(req.body);
    await updateUserFollowee(req.body);
    console.log("req.body");
    res.json({ msg: req.body });
  } catch (err) {
    next(err);
  }
};

exports.getAllFollower = async (req, res, next) => {
  try {
    const followers = await getAllFollower();
    res.json(followers);
  } catch (err) {
    next(err);
  }
};

exports.getAllFollowee = async (req, res, next) => {
  try {
    const followees = await getAllFollowee();
    res.json(followees);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    console.log(req.body);
    const post = await createPost(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};


exports.updateProfilePicture = async (req, res, next) => {
  try {
    const user = await updateProfilePicture(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.savePointCont = async (req, res, next) => {
  try {
    console.log(req.body);
    const post = await savePoint(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deleteAllUserCont = async (req, res, next) => {
  try {
   await deleteAllUsers();
    res.send('All users have been deleted');
  } catch (err) {
    next(err);
  }
};



  
