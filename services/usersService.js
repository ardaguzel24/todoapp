import { v4 as uuidv4 } from "uuid";
import { users } from "../db/users.js";
import { todos } from "../db/todos.js";

export function createUser({ username, email, password }) {
  const user = { id: uuidv4(), username, email, password };
  users.push(user);
  return { id: user.id, username: user.username, email: user.email };
}

export function listUsers() {
  return users.map(({ id, username, email }) => ({ id, username, email }));
}

export function findUserById(id) {
  return users.find(u => u.id === id);
}

export function listTodosOfUser(userId) {
  const user = findUserById(userId);
  if (!user) return null;
  return todos.filter(t => t.userId === userId);
}