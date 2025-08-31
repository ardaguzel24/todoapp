import { v4 as uuidv4 } from "uuid";
import { todos } from "../db/todos.js";
import { findUserById } from "./usersService.js";

export function listTodos() {
  return todos;
}

export function findTodoById(id) {
  return todos.find(t => t.id === id);
}

export function createTodo({ title, description, userId, completed }) {
  const user = findUserById(userId);
  if (!user) return { error: "User not found" };

  const todo = {
    id: uuidv4(),
    title,
    description,
    userId,
    completed: completed ?? false,
  };
  todos.push(todo);
  return { data: todo };
}

export function putUpdate(id, { title, description, completed }) {
  const todo = findTodoById(id);
  if (!todo) return null;
  todo.title = title;
  todo.description = description;
  todo.completed = completed;
  return todo;
}

export function patchUpdate(id, partial) {
  const todo = findTodoById(id);
  if (!todo) return null;
  const allowed = ["title", "description", "completed", "userId"];
  Object.keys(partial || {}).forEach(k => {
    if (allowed.includes(k)) todo[k] = partial[k];
  });
  return todo;
}

export function removeTodo(id) {
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return false;
  todos.splice(idx, 1);
  return true;
}
