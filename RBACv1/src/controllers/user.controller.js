import * as userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
  res.json(await userService.getUsers());
};

export const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    message: "User successfully updated",
    data: {
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      created_at: user.created_at,
    },
  });
};

export const deleteUser = async (req, res) => {
  return res.status(200).json(await userService.deleteUser(req.params.id), {
    message: "User successfully deleted",
  });
};
