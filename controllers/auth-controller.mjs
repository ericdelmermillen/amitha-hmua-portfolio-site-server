import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../dbClient.mjs';
import { generateUploadURL } from '../s3.mjs';
import { getToken, generateRefreshToken } from '../utils/utils.mjs';

const NODE_ENVIRONMENT = process.env.NODE_ENV || 'development';
const JWT_REFRESH_TOKEN_EXPIRATION_INTERVAL = process.env.JWT_REFRESH_TOKEN_EXPIRATION_INTERVAL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// console.log(`JWT_REFRESH_TOKEN_EXPIRATION_INTERVAL: ${JWT_REFRESH_TOKEN_EXPIRATION_INTERVAL}`)
// console.log(`JWT_TOKEN_EXPIRATION_INTERVAL: ${process.env.JWT_TOKEN_EXPIRATION_INTERVAL}`)
// *** issue where client not being logged out when both token and refresh token are expired


// createUser function
const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check existing user
    const [existingRows] = await pool.query(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (existingRows.length) {
      return res.status(409).json({
        success: false,
        message: "User with that email already exists",
      });
    };

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const [ result ] = await pool.query(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, hashedPassword]
    );

    return res.status(201).json({
      message: "User created successfully",
      userID: result.insertId
    });

  } catch (error) {
    console.log(`Error creating user: ${error}`);
    return res.status(500).json({ error: "Failed to create user" });
  };
};


// userLogin function
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      `SELECT id, password FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    const matchedUser = rows[0];

    if (!matchedUser) {
      return res.status(404).json({
        success: false,
        message: "User with that email not found",
      });
    };

    const passwordMatch = await bcrypt.compare(
      password,
      matchedUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    };

    const user = { id: matchedUser.id };

    const token = getToken(user);
    const refreshToken = generateRefreshToken(user.id);

    return res.json({
      message: "Login successful",
      user,
      token,
      refreshToken
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: "An error occurred while logging in"
    });
  };
};


// token refresh function
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  console.log("refreshing");
  console.log(`JWT_REFRESH_TOKEN_EXPIRATION_INTERVAL: ${JWT_REFRESH_TOKEN_EXPIRATION_INTERVAL}`);

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id },
      JWT_SECRET,
      { expiresIn: JWT_TOKEN_EXPIRATION_INTERVAL }
    );

    return res.json({
      success: true,
      message: "Token refreshed successfully",
      accessToken
    });

  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

// get signed AWS S3 URL
const getSignedURL = async (req, res) => {
  const { dirname } = req.query;

  const url = await generateUploadURL(dirname);
  
  return res.send({url});
};


// userLogout function
const logout = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send({ message: "Invalid or missing User ID" });
  } else if (isNaN(+user_id)) {
    return res.status(400).send({ message: "User ID must be a number" });
  };

  try {
    const [rows] = await pool.query(
      `SELECT id FROM users WHERE id = ? LIMIT 1`,
      [user_id]
    );

    const matchedUser = rows[0];

    if (!matchedUser) {
      return res.status(404).json({
        message: `User with id of ${user_id} not found`
      });
    };

    return res.status(200).json({
      message: "Successfully Logged Out"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while logging out"
    });
  };
};

export {
  createUser,
  userLogin,
  refreshToken,
  getSignedURL,
  logout
};