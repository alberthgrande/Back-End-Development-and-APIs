import * as permissionRepo from "../repositories/permission.repository.js";

export const createPermission = (name) => permissionRepo.createPermission(name);

export const assignPermissionToRole = (role_id, permission_id) =>
  permissionRepo.assignPermissionToRole(role_id, permission_id);

export const updatePermission = (id, name) =>
  permissionRepo.updatePermission(id, name);

export const deletePermission = (id) => permissionRepo.deletePermission(id);
