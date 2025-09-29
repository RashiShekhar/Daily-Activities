// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret_key";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // now accessible in routes
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
