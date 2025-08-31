export function validateUserCreate(req, res, next) {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({ error: "username, email ve password zorunludur" });
  }
  if (!String(email).includes("@")) {
    return res.status(400).json({ error: "email formatı hatalı" });
  }
  next();
}

export function validateTodoCreate(req, res, next) {
  const { title, description, userId } = req.body || {};
  if (!title || !description || !userId) {
    return res.status(400).json({ error: "title, description ve userId zorunludur" });
  }
  next();
}

export function validateTodoPut(req, res, next) {
  const { title, description, completed } = req.body || {};
  const hasAll = title !== undefined && description !== undefined && completed !== undefined;
  if (!hasAll) {
    return res.status(400).json({ error: "PUT için title, description, completed zorunlu" });
  }
  next();
}
