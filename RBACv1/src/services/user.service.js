import * as userRepo from "../repositories/user.repository.js";

export const getUsers = () => userRepo.findAll();
