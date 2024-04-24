const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const knex = require("knex")(require("../knexfile.js"));
const app = require('../server.js');
const { getToken, generateRefreshToken } = require('../utils/utils.js');

// createUser function
const createUser = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing either email or password",
    });
  }
  
  try {
    const userExists = await knex('users').where({ email: email }).first();
    
    if(userExists) {
      return res.status(409).json({
        success: false,
        message: "User with that email already exists",
      });
    }

    const newUser = {
      email: email,
      password: await bcrypt.hash(password, 10), 
    };
    
    const [ userId ] = await knex('users').insert(newUser);

    res.json({
      success: true,
      message: "User created successfully",
      userID: userId,
    });

  } catch(error) {
    console.log(`Error creating user: ${error}`);
    return res.status(500).json({ error: "Failed to create user"});
  }
};

// userLogin function
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing either email or password",
    });
  }

  try {
    const matchedUser = await knex('users').where({ email }).first();

    if(!matchedUser) {
      return res.status(404).json({
        success: false,
        message: "User with that email not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, matchedUser.password);        

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // build the user
    const user = {};
    user.id = matchedUser.id;
    user.role = matchedUser.role;
    user.role = matchedUser.role 

    const token = getToken(user);
    const refreshToken = generateRefreshToken(user.id); // Generate refresh token

    res.json({
      success: true,
      message: "Login successful",
      user: user,
      token: token,
      refreshToken: refreshToken,
    });
    
  } catch(error) {
    console.error('Error:', error);
    return res.status(500).json({ error: "An error occurred while logging in" });
  }
};


// token refresh function
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  // Verify refresh token
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate new access token with short expiration time
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: accessToken
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}


// userLogout function
// client can get the user_id from the jwt
const logLogout = async (req, res) => {
  const { user_id } = req.body;

  if(!user_id) {
    res.status(400).send({message: "Invalid or missing User ID"})
  } else if(isNaN(+user_id)) {
    res.status(400).send({message: "User ID must be a number"})
  }

  try {
    const matchedUser = await knex('users').where('id', user_id).first();

    if(!matchedUser) {
      res.status(404).json({ message: `User with id of ${user_id} not found`});
    } else {
      res.status(200).json({ message: 'Successfully Logged Out' });
    }
    
  } catch(error) {
    console.log(error)
    return res.status(500).json({ error: "An error occurred while logging in" });
  }
};


module.exports = {
  createUser,
  userLogin,
  refreshToken,
  logLogout
};