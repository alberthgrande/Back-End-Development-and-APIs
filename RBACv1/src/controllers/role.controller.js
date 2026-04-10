import * as roleService from "../services/role.service.js";

export const createRole = async (req, res) => {
  res.json(await roleService.createRole(req.body.name));
};
