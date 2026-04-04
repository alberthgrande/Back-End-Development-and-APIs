import { User, SafeUser } from "../types/user";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class UserService {
  private users: User[] = [];

  private stripPassword(user: User): SafeUser {
    const { passwordHash, ...safe } = user;
    return safe;
  }

  getAllUsers(): SafeUser[] {
    return this.users.map((user) => this.stripPassword(user));
  }

  getUserById(id: string): SafeUser | undefined {
    const user = this.users.find((user) => user.id === id);
    return user ? this.stripPassword(user) : undefined;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<SafeUser> {
    const existing = this.users.find((u) => u.email === email);
    if (existing) throw new Error("Email already exists");

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser: User = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
    };

    this.users.push(newUser);
    return this.stripPassword(newUser);
  }

  async updateUser(
    id: string,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<SafeUser | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    const user = this.users[index];

    const updatedUser: User = {
      ...user,
      name: name ?? user.name,
      email: email ?? user.email,
      passwordHash: password
        ? await bcrypt.hash(password, SALT_ROUNDS)
        : user.passwordHash,
    };

    this.users[index] = updatedUser;
    return this.stripPassword(updatedUser);
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = this.users.find((u) => u.email === email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return null;

    return this.stripPassword(user);
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}
