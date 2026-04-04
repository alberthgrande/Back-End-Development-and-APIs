import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    const cookieOptions = {
      httpOnly: true,
      secure: false, // HTTPS true only in production
      sameSite: "strict",
    };

    res
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({ message: "Logged in" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
