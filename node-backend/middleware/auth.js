const db = require("../models/index");

const jwt = require("jsonwebtoken");
const  JWT_SECRET  = process.env.JWT_SECRET;
exports.auth = (req, res, next) => {
  try {
    const token = req.header('authtoken') //|| req.query.token || req.cookies.token;
    if (!token) {
      return res.status(401).send("no token , authorization denied");
    }
    const decoded = jwt.verify(token,JWT_SECRET);

    console.log("middleware", decoded);
    req.user = decoded.user;
    console.log("55555555555555555555555+",req.user)
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invavid!!");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    // Get the token from the request cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET); // Replace with your JWT secret key

    // Check if the user with the decoded username has the 'admin' role in the database
    const user = await db.User.findOne({ where: { username: decoded.user.username } });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Access denied for non-admin users' });
    }

    // If the user is an admin, proceed to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
