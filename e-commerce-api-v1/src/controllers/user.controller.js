import * as userService from "../services/user.service.js";

// GET LOGGED IN USER PROFILE
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userService.getUserById(userId);

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
