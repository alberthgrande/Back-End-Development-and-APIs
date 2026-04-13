import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// ACCESS TOKEN (short-lived)
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15d",
  });
};

// REFRESH TOKEN (long-lived)
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// VERIFY ACCESS TOKEN
export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// VERIFY REFRESH TOKEN
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
