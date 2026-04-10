import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const tokens = await authService.login(req.body.email, req.body.password);
    res.status(200).json({ tokens: tokens });
  } catch (error) {
    throw error;
    res.status(401).json({ error: error.message });
  }
};
