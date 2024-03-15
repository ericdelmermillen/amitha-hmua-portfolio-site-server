const jwt = require('jsonwebtoken');

// generate jwt
const getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1m' });
};

// verify jwt
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return decoded;
    
  } catch(error) {
    if(error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else {
      throw new Error('Unauthorized');
    }
  }
};

// date format options: returns config obj for dates
const dateFormatOptions = () => (
  { year: 'numeric', month: '2-digit', day: '2-digit' }
);


module.exports = {
  getToken,
  verifyToken,
  dateFormatOptions
};