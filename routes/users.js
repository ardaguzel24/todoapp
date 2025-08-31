import { Router } from "express";
import { createUser, listUsers, listTodosOfUser } from "../services/usersService.js";
import { validateUserCreate } from "../middleware/validators.js";

const router = Router();

router.post("/", validateUserCreate, (req, res) => {
  const safeUser = createUser(req.body);
  res.status(201).json(safeUser);
});

router.get("/", (req, res) => {
  res.json(listUsers());
});

router.get("/:id/todos", (req, res) => {
  const result = listTodosOfUser(req.params.id);
  if (!result) return res.status(404).json({ error: "User not found" });
  res.json(result);
});

export default router;
