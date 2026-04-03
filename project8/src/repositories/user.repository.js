import { users } from "../models/user.model.js";

export const createUser = (user) => {
  users.push(user);
  return users;
};

export const findByEmail = (email) => {
  return users.find((u) => u.email === email);
};

export const findById = (id) => {
  return users.find((u) => u.id === id);
};
