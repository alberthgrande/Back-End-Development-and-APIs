import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/user.repository.js";
import * as roleRepo from "../repositories/role.repository.js";
import * as tokenRepo from "../repositories/token.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const register = async (data) => {
  const defaultRole = "user";
  const role = await roleRepo.findByName(defaultRole);
  if (!role) throw new Error("Role not found");

  const hashed = await hashPassword(data.password);

  const user = await userRepo.createUser({
    ...data,
    password: hashed,
    role_id: role.id,
  });

  return user;
};

// export const login = async (email, password) => {
//   const user = await userRepo.findByEmail(email);
//   if (!email) throw new Error("Invalid credentials");

//   const isMatch = await comparePassword(password, user.password);
//   if (!isMatch) throw new Error("Invalid credentials");

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);

//   await tokenRepo.saveToken(user.id, refreshToken);

//   return { accessToken, refreshToken };
// };

export const login = async (email, password) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const payload = {
    id: user.id,
    role: user.role, // ensure this exists
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await tokenRepo.saveToken(user.id, refreshToken);

  return { accessToken, refreshToken };
};

export const refresh = async (token) => {
  if (!token) throw new Error("No refresh token");

  // 1. Check DB
  const stored = await tokenRepo.findToken(token);
  if (!stored) throw new Error("Invalid refresh token");

  // 2. Verify using REFRESH SECRET
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  // 3. Generate new tokens (rotation)
  await tokenRepo.deleteToken(token);

  const newPayload = {
    id: decoded.id,
    role: decoded.role,
  };

  const newAccessToken = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);

  await tokenRepo.saveToken(decoded.id, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
