const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { User, SupportSchedule } = db;
db.sequelize.sync();
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      prefix,
      nickname,
      tel,
      firstname,
      lastname,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      prefix,
      nickname,
      tel,
      firstname,
      lastname,
    });
    res.json({ message: "Registration successful" });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Username is already taken" });
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const payload = {
      user: {
        username: user.username,
        role: user.role,
      },
    };

    // Generate Token with a longer expiration time
    jwt.sign(payload, JWT_SECRET, { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      res
       // .cookie("token", token, { httpOnly: true, maxAge: 3600000 })
        .send({ token, payload });
    });

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Unauthorized");
    } else {
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(402).send("Unauthorized");
      }

      res.json(`Welcome, ${token}`);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
