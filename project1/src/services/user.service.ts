import { User } from "../types/user";
import { randomUUID } from "crypto";

class UserService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: randomUUID(),
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  createUsers(users: { name: string; email: string }[]): User[] {
    const newUsers: User[] = users.map(({ name, email }) => ({
      id: randomUUID(),
      name,
      email,
    }));
    this.users.push(...newUsers);
    return newUsers;
  }

  updateUser(id: string, name: string, email: string): User | undefined {
    const user = this.getUserById(id);
    if (user) {
      user.name = name;
      user.email = email;
      return user;
    }
    return undefined;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default new UserService();
