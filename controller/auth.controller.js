// auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';


// Generate JWT token 
const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role
  },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    });
}
/**
 * Register a new user in the system.
 * @function signup
 * @param {Request} req - The Express request object containing user details 
 *                        (name, email, password, role) in the body.
 * @param {Response} res - The Express response object used to send back the 
 *                         response to the client.
 * @returns {undefined} - Sends a success message if the user is registered 
 *                        successfully, otherwise sends an error message.
 */

export async function signup (req, res) {
  try {
    const { name, email, password, role } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    // If the user already exists, send an error message
    if (existingUser) {
      return res.status(400).send({ message: 'Email already registered' });
    }
// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);

// check if the user role is valid
if (role !== 'student' && role !== 'teacher') {
  return res.status(400).send({ message: 'Invalid role. Please choose either "student" or "teacher' });
}
    
    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    // Send a success message
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    
  }
};

/**
 * Signin a user in the system.
 * @function signin
 * @param {Request} req - The Express request object containing user details 
 *                        (email, password) in the body.
 * @param {Response} res - The Express response object used to send back the 
 *                         response to the client.
 * @returns {undefined} - Sends a success message with user details and a JWT 
 *                        access token if the user is signed in successfully, 
 *                        otherwise sends an error message.
 */
// controllers/auth.controller.js (modified signin)
export async function signin (req, res)  {
  try{
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    // If the user doesn't exist, send an error message
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // If the password is incorrect, send an error message
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    // Generate a JWT token
    const token = generateToken(user);
    // Send a success message with user details and token
    res.status(200).json({
      message: 'User signed in successfully',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
} ;

//  Protected routes middleware(Verify Token)

