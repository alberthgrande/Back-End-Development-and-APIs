import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
