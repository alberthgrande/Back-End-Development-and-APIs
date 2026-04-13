import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.register(email, password);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    const result = await authService.updatePassword(
      userId,
      oldPassword,
      newPassword,
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
