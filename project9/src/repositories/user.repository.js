import { users } from "../model/user.model.js";

export const createUser = async (user) => {
  users.push(user);
  return users;
};

export const findByEmail = async (email) => {
  return users.find((u) => u.email === email);
};

export const findById = async (id) => {
  return users.find((u) => u.id === id);
};
