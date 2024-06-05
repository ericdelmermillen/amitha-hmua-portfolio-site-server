const {
  paramsIsNumber,
  emailAndPasswordAreValid, 
  bioDataIsValid,
  validContactFormData,
  photographerDataValid,
  modelDataValid,
  tagDataValid,
  shootDataValid,
  shootsOrderDataValid
} = require("../../utils/validationSchemas.js");
const { verifyToken } = require('../../utils/utils.js');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if(!token || !verifyToken(token)) {
    console.log("rejected from middleware")
    return res.status(401).send({ message: "unauthorized" });
  }

  next();
};

console.log(paramsIsNumber)

module.exports = {
  validateToken
}