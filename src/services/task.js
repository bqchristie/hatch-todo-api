import { Task } from "../models/init.js";
import DatabaseError from "../models/error.js";
import { faker } from "@faker-js/faker";

class TaskService {
  static async list() {
    try {
      return Task.findMany();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await Task.findUnique({ where: { id } });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async generate(data, quantity) {
    const statuses = ["NEW", "IN PROGRESS", "QA", "DONE"];
    try {
      for (let i = 0; i < quantity; i++) {
        data.createdAt = new Date();
        data.updatedAt = data.createdAt;
        data.description = faker.lorem.sentence(8);
        data.status = statuses[i < 7 ? 0 : i < 15 ? 1 : i < 17 ? 2 : 3];
        await Task.create({ data });
      }
      return {};
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      data.createdAt = new Date();
      data.updatedAt = data.createdAt;
      return await Task.create({ data });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      data.updatedAt = new Date();
      return await Task.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      await Task.delete({ where: { id } });
      return true;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async deleteAll() {
    try {
      await Task.deleteMany({});
      return true;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default TaskService;
