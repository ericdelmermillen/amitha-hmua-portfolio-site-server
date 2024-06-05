const { verifyToken } = require('../../utils/utils.js');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if(!token || !verifyToken(token)) {
    console.log("rejected from middleware")
    return res.status(401).send({ message: "unauthorized" });
  }

  next();
};

module.exports = {
  validateToken
}