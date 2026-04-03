import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.sendStatus(403);
  }
};
