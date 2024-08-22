const bcrypt = require('bcryptjs'); // Import bcrypt for password comparison
const jwt = require('jsonwebtoken');
const { saveRefreshToken } = require("../Common/redisClient"); // Destructure if you exported multiple things
const { verifyUser, createUser } = require("../Components/UserComponent"); // Destructure if you exported multiple things

const login = async (req, res) => {
  console.log("testtt");
  const { email, password } = req.body;

  try {
    const user = await verifyUser(email);

    if (user === null) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const hashedPassword = user ? user.password : '';

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtRefreshKey = process.env.JWT_REFRESH_KEY;

    const data = {
      time: Date(),
      name: user.name,
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.EXPIRESIN),
    };

    const refreshData = {
      time: Date(),
      name: user.name,
      id: user._id,
      exp: Math.floor(Date.now() / 1000) + Number(process.env.REFRESH_TOKEN_EXPIRESIN),
    };

    const token = jwt.sign(data, jwtSecretKey);
    const refreshToken = jwt.sign(refreshData, jwtRefreshKey);

    await saveRefreshToken(refreshToken, user._id, Number(process.env.REFRESH_TOKEN_EXPIRESIN));

    res.status(200).json({ status: "success", token, refreshToken, name: user ? user.name : '' });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  if (!name || name.length < 2 || name.length > 20) {
    return res.status(400).json({ status: "error", message: "Name must be between 2 and 20 characters long." });
  }

  if (!password || password.length < 4 || password.length > 20) {
    return res.status(400).json({ status: "error", message: "Password must be between 4 and 20 characters long." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ status: "error", message: "Please provide a valid email address." });
  }

  try {
    const result = await createUser(name, email, password);
    if (result) {
      return res.status(200).json({ status: "success", message: "User Created" });
    } else {
      return res.status(500).json({ status: "error", message: "Failed to create user." });
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};


module.exports = { login, signUp };
