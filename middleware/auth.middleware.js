// authJwt.js
import jwt from 'jsonwebtoken';
// import { secret } from '../config/auth.config.js';


/**
 * Verify the given token and send back a 403 response if invalid.
 * Otherwise, set req.userId to the decoded id and call next.
 * @function verifyToken
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {undefined}
 */
verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ message: "No token provided!" });

  verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    req.userId = decoded.id;
    next();
  });
};

/**
 * Verify that the user is a teacher.
 * @function isTeacher
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {undefined}
 */
isTeacher = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === "teacher") next();
    else res.status(403).send({ message: "Require Teacher Role!" });
  });
};

// middleware/authJwt.js
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === 'admin') return next();
    res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { verifyToken, isTeacher, isAdmin };