import * as roleRepo from "../repositories/role.repository.js";

export const createRole = (name) => roleRepo.createRole(name);

export const updateRole = (id, name) => roleRepo.updateRole(id, name);

export const deleteRole = (id) => roleRepo.deleteRole(id);
