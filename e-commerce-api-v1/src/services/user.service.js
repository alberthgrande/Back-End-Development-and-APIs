import * as userRepo from "../repositories/user.repository.js";

// GET USER BY ID (PROFILE)
export const getUserById = async (userId) => {
  const user = await userRepo.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// GET ALL USERS
export const getAllUsers = async () => {
  const users = await userRepo.findAllUsers();

  return users;
};
