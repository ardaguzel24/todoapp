import { Router } from "express";
import idGuard from "../middleware/idGuard.js";
import {
  listTodos,
  findTodoById,
  createTodo,
  putUpdate,
  patchUpdate,
  removeTodo,
} from "../services/todosService.js";
import { validateTodoCreate, validateTodoPut } from "../middleware/validators.js";

const router = Router();

router.get("/", (req, res) => res.json(listTodos()));

router.get("/:id", idGuard(findTodoById, "Todo"), (req, res) => {
  res.json(req.__entity);
});

router.post("/", validateTodoCreate, (req, res) => {
  const { data, error } = createTodo(req.body);
  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
});

router.put("/:id", idGuard(findTodoById, "Todo"), validateTodoPut, (req, res) => {
  const updated = putUpdate(req.params.id, req.body);
  res.json(updated);
});

router.patch("/:id", idGuard(findTodoById, "Todo"), (req, res) => {
  const updated = patchUpdate(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", idGuard(findTodoById, "Todo"), (req, res) => {
  removeTodo(req.params.id);
  res.status(204).send();
});

export default router;
