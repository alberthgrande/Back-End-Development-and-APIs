import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { users } from "../model/user.model.js";

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    id: Date.now(),
    username,
    password: hashedPassword,
    role: role || "user",
  };

  users.push(user);
  res.status(201).json({ message: "User registered!" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(404).json({ message: "Invalid credentials!" });
  }

  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  res.status(200).json(token);
};
