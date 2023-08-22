import { Router } from "express";

import TaskService from "../../services/task.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/task.js";

const router = Router();

/** @swagger
 *
 * tags:
 *   name: Task
 *   description: API for managing Task objects
 *
 * /task:
 *   get:
 *     tags: [Task]
 *     summary: Get all the Task objects
 *     responses:
 *       200:
 *         description: List of Task objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await TaskService.list();
    res.json(results);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /task:
 *   post:
 *     tags: [Task]
 *     summary: Create a new Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: The created Task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    if (req.body.description === "GENERATE") {
      const obj = await TaskService.generate(req.validatedBody, 20);
      res.status(201).json(obj);
    } else {
      const obj = await TaskService.create(req.validatedBody);
      res.status(201).json(obj);
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /task/{id}:
 *   get:
 *     tags: [Task]
 *     summary: Get a Task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await TaskService.get(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /task/{id}:
 *   put:
 *     tags: [Task]
 *     summary: Update Task with the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The updated Task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await TaskService.update(req.params.id, req.validatedBody);
      if (obj) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      if (error.isClientError()) {
        res.status(400).json({ error });
      } else {
        next(error);
      }
    }
  }
);

/** @swagger
 *
 * /task/{id}:
 *   delete:
 *     tags: [Task]
 *     summary: Delete Task with the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *        description: OK, object deleted
 */
router.delete("/:id", requireValidId, async (req, res, next) => {
  try {
    let success;
    if (req.params.id < 0) {
      success = await TaskService.deleteAll();
    } else {
      success = await TaskService.delete(req.params.id);
    }
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

export default router;
