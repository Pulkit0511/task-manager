import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

// GET /tasks
router.get("/", async (req, res) => {
  const { status, category } = req.query;
  const where = { userId: req.user.id };
  if (status) where.status = status;
  if (category) where.category = category;

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(tasks);
});

// POST /tasks
router.post("/", async (req, res) => {
  const { title, description, dueDate, category } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const task = await prisma.task.create({
    data: {
      title,
      description: description || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category || null,
      userId: req.user.id,
    },
  });
  res.status(201).json(task);
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, dueDate, category, status } = req.body;

  const existing = await prisma.task.findFirst({
    where: { id, userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ error: "Task not found" });

  const updated = await prisma.task.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      description:
        description === undefined ? existing.description : description,
      dueDate:
        dueDate === undefined
          ? existing.dueDate
          : dueDate
          ? new Date(dueDate)
          : null,
      category: category === undefined ? existing.category : category,
      status: status ?? existing.status,
    },
  });
  res.json(updated);
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.task.findFirst({
    where: { id, userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ error: "Task not found" });

  await prisma.task.delete({ where: { id } });
  res.status(204).send();
});

export default router;
