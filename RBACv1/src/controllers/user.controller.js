import * as userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
  res.json(await userService.getUsers());
};
