import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createUser, findByEmail } from "../repositories/user.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util.js";

export const register = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existing = await findByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4(),
    email,
    password: hashed,
  };

  await createUser(user);

  return user;
};

export const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) throw new Error("Invalid Credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Credentials");

  const payload = { userId: user.id };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
