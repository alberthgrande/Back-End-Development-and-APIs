import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("accessToken: ", token);

  if (!token) return res.sendStatus(401);

  try {
    const decode = jwt.verify(token, config.JWT_ACCESS_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
