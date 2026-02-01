import { Request, Response } from "express";
import UserService from "../services/user.service";

export const getAllUsers = (req: Request, res: Response): void => {
  const users = UserService.getAllUsers();
  const usersCount = users.length;
  res.status(200).json({ data: users, count: usersCount });
};

export const getUserById = (
  req: Request<{ id: string }>,
  res: Response,
): void => {
  const user = UserService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const createUser = (req: Request, res: Response): void => {
  const { name, email } = req.body;
  const newUser = UserService.createUser(name, email);
  res.status(201).json({ message: "User created successfully", user: newUser });
};

export const createUsers = (req: Request, res: Response): void => {
  const usersData: { name: string; email: string }[] = req.body;
  const newUsers = UserService.createUsers(usersData);
  res
    .status(201)
    .json({ message: "Users created successfully", users: newUsers });
};

export const updateUser = (
  req: Request<{ id: string }>,
  res: Response,
): void => {
  const { name, email } = req.body;
  const updatedUser = UserService.updateUser(req.params.id, name, email);
  if (updatedUser) {
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = (
  req: Request<{ id: string }>,
  res: Response,
): void => {
  const success = UserService.deleteUser(req.params.id);
  if (success) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
