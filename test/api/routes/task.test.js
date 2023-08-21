import supertest from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line

import app from "../../../src/app.js";
import TaskService from "../../../src/services/task.js";

jest.mock("../../../src/services/task.js");

describe("/api/v1/task/", () => {
  test("GET lists all the models", async () => {
    const data = [{ name: "First" }, { name: "Second" }];
    TaskService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req.get("/api/v1/task").set("Authorization", "token abc");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(TaskService.list).toHaveBeenCalled();
  });

  test("POST creates a new Task", async () => {
    const data = {
      status: "test",
      createdAt: "2001-01-01T00:00:00Z",
      updatedAt: "2001-01-01T00:00:00Z",
      description: "test",
    };

    TaskService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/task")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(TaskService.create).toHaveBeenCalledWith(data);
  });

  test("creating a new Task without required attributes fails", async () => {
    const data = {};

    TaskService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post("/api/v1/task")
      .set("Authorization", "token abc")
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(TaskService.create).not.toHaveBeenCalled();
  });
});

describe("/api/v1/task/:id", () => {
  test("getting a single result succeeds for authorized user", async () => {
    const data = { email: "test@example.com" };
    TaskService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/task/1`)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(TaskService.get).toHaveBeenCalledWith(1);
  });

  test("request for nonexistent object returns 404", async () => {
    const id = "1";
    TaskService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/task/${id}`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(404);
    expect(TaskService.get).toHaveBeenCalled();
  });

  test("request with incorrectly-formatted ObjectId fails", async () => {
    TaskService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/task/bogus`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(400);
    expect(TaskService.get).not.toHaveBeenCalled();
  });

  test("Task update", async () => {
    const data = {
      status: "test",
      description: "test",
    };
    TaskService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/task/1`)
      .send(data)
      .set("Authorization", "token abc");

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(TaskService.update).toHaveBeenCalledWith(1, data);
  });

  test("Task deletion", async () => {
    TaskService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/task/1`)
      .set("Authorization", "token abc");

    expect(res.status).toBe(204);
    expect(TaskService.delete).toHaveBeenCalledWith(1);
  });
});
