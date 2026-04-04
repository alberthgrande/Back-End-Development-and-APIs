import { userRepo } from "../repositories/user.repository.js";

export class UserService {
  async getUsers() {
    return await userRepo.getAll();
  }

  async getUser(id) {
    return await userRepo.getById(id);
  }

  async createUser(data) {
    return await userRepo.create(data);
  }

  async updateUser(id, data) {
    return await userRepo.update(id, data);
  }

  async deleteUser(id) {
    return await userRepo.delete(id);
  }
}

export const userService = new UserService();
