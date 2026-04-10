import * as roleRepo from "../repositories/role.repository.js";

export const createRole = (name) => roleRepo.createRole(name);
