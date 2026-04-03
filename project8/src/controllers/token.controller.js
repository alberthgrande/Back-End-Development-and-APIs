import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { generateAccessToken } from "../utils/token.util.js";

export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  console.log("refreshToken: ", token);
  if (!token) return res.sendStatus(401);

  try {
    const decode = jwt.verify(token, config.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken({
      userId: decode.userId,
    });

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .json({ message: "Token refreshed" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(403);
  }
};
