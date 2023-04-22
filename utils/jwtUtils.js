import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const createJwtToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "1800s",
  });
};

export const authenticateJwtToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, userDetails) => {
    if (err) return res.sendStatus(403);
    req.email = userDetails.email;
    next();
  });
};
