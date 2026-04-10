import * as permissionRepo from "../repositories/permission.repository.js";

export const createPermission = (name) => permissionRepo.createPermission(name);

export const assignPermissionToRole = (role_id, permission_id) =>
  permissionRepo.assignPermissionToRole(role_id, permission_id);
