import * as permissionService from "../services/permission.service.js";

export const createPermission = async (req, res) => {
  res.json(await permissionService.createPermission(req.body.name));
};

export const assignPermission = async (req, res) => {
  const { role_id, permission_id } = req.body;

  await permissionService.assignPermissionToRole(role_id, permission_id);

  res.json({ message: "Permission assigned" });
};
