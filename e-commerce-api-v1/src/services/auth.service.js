import bcrypt from "bcrypt";
import * as userRepo from "../repositories/user.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.utils.js";

export const register = async (email, password) => {
  const existing = await userRepo.findByEmail(email);

  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser(email, hashedPassword);

  return {
    user,
    accessToken: generateAccessToken({ userId: user.id }),
    refreshToken: generateRefreshToken({ userId: user.id }),
  };
};

export const login = async (email, password) => {
  const user = await userRepo.findByEmail(email);

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  return {
    user: { id: user.id, email: user.email },
    accessToken: generateAccessToken({ userId: user.id }),
    refreshToken: generateRefreshToken({ userId: user.id }),
  };
};

export const updatePassword = async (userId, oldPassword, newPassword) => {
  const user = await userRepo.findById(userId);

  if (!user) throw new Error("User not found");

  // need full user with password → re-fetch
  const fullUser = await userRepo.findByEmail(user.email);

  const isMatch = await bcrypt.compare(oldPassword, fullUser.password);

  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userRepo.updatePassword(userId, hashedPassword);

  return { message: "Password updated successfully" };
};
