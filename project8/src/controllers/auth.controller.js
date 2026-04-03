import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "Created user" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw error;
  }
};

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .json({ message: "Logged in" });
  } catch (error) {
    res.status(401).json({ message: err.message });
  }
};
