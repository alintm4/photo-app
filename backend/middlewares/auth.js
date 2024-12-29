import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please refresh" });
    }
    return res.status(400).json({ message: "Invalid token" });
  }
}
