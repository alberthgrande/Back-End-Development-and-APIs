import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = (req: Request, res: Response) => {
    const users = this.userService.getAllUsers();
    res.status(200).json(users);
  };

  getUserById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const user = this.userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  };

  createUser = async (req: Request, res: Response) => {
    const { name, email, passwordHash } = req.body;

    try {
      const user = await this.userService.createUser(name, email, passwordHash);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  updateUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name, email, passwordHash } = req.body;

    try {
      const user = await this.userService.updateUser(
        id,
        name,
        email,
        passwordHash,
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  deleteUser = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const success = this.userService.deleteUser(id);
    if (!success) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted successfully" });
  };

  login = async (req: Request, res: Response) => {
    const { email, passwordHash } = req.body;
    const user = await this.userService.authenticateUser(email, passwordHash);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    return res.status(200).json({ message: "Login successful", user });
  };
}
