import { userService } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: "Database query failed!" });
    throw error;
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(id);

    if (!user) res.status(404).json({ error: "User not found!" });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user!" });
    throw error;
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({ message: "User created!", data: user });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user!" });
    throw error;
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await userService.updateUser(id, req.body);
    if (!users) return res.status(404).json({ error: "User not found!" });

    res.status(200).json({ message: "User updated!", data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user!" });
    throw error;
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userService.deleteUser(id);
    if (!users) return res.status(404).json({ error: "User not found!" });

    res.status(200).json({ message: "User deleted!", data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user!" });
    throw error;
  }
};
