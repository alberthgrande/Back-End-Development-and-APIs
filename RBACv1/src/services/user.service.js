import * as userRepo from "../repositories/user.repository.js";

export const getUsers = () => userRepo.findAll();

export const updateUser = (id, data) => userRepo.updateUser(id, data);

export const deleteUser = (id) => userRepo.deleteUser(id);
