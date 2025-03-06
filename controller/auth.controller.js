// auth.controller.js
import { sign } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { secret } from '../config/auth.config';
import { user as _user } from '../models';
const User = _user;

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

export async function signup(req, res) {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashSync(req.body.password, 8),
      role: req.body.role || 'student'
    });
    res.send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

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
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).send({ message: "User Not found." });

    const passwordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordValid) return res.status(401).send({ message: "Invalid Password!" });

    const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: '1h' });
    
    res.status(200).send({
      id: user.id,
      role: user.role,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};