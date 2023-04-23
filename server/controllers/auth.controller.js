const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../queries/users.queries');
const { privateKey } = require('../environment/keys');

const JWT_EXPIRY = 60*5; 


exports.sessionCreate = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (user) {
        const match = await user.comparePassword(req.body.password);
      if(match) {
        const token = jwt.sign({ userId: user._id.toString() }, privateKey, {
          expiresIn: JWT_EXPIRY,
          algorithm: "RS256"
        });
          res.cookie('token', token, { maxAge: JWT_EXPIRY * 1000, httpOnly: true });

                user.password = undefined;

                res.json(user, 200);
            } else {
                res.json({ error: "Bad username or password" }, 400);
            }
        } else {
            res.json({ error: "Bad username or password" }, 400);
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};


exports.sessionDelete = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.end();
  } catch (error) {
    res.json({ error: error.message });
  }
};
