import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { createUser, findByEmail } from "../repositories/user.repository.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util.js";

export const register = async ({ email, password }) => {
  const existing = findByEmail(email);
  if (existing) throw new Error("User already exist");

  const passwordHashed = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4,
    email,
    password: passwordHashed,
  };

  createUser(user);

  return user;
};

export const login = async ({ email, password }) => {
  const user = findByEmail(email);
  if (!user) throw new Error("Invalid Credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Credentials");

  const payload = { userId: user.id };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
