import * as roleService from "../services/role.service.js";

export const createRole = async (req, res) => {
  res.json(await roleService.createRole(req.body.name));
};

export const updateRole = async (req, res) => {
  const result = await roleService.updateRole(req.params.id, req.body);
  res.status(200).json(result);
};

export const deleteRole = async (req, res) => {
  const result = await roleService.deleteRole(req.params.id);
  res.status(200).json(result);
};
