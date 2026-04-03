import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { generateAccessToken } from "../utils/token.util.js";

export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
    });
    const cookieOptions = {
      httpOnly: true,
      secure: false, // HTTPS true only in production
      sameSite: "strict",
    };

    res
      .cookie("accessToken", newAccessToken, cookieOptions)
      .json({ message: "Token refreshed" });
  } catch {
    return res.sendStatus(403);
  }
};
