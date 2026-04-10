import * as userRepo from "../repositories/user.repository.js";
import * as roleRepo from "../repositories/role.repository.js";
import * as tokenRepo from "../repositories/token.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const register = async (data) => {
  const defaultRole = "users";
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

export const login = async (email, password) => {
  const user = await userRepo.findByEmail(email);
  if (!email) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await tokenRepo.saveToken(user.id, refreshToken);

  return { accessToken, refreshToken };
};
