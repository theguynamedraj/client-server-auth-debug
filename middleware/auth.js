const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  try {
    const secret = process.env.JWT_SECRET || "default-secret-key";
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next(); // ✅ THIS WAS MISSING
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
