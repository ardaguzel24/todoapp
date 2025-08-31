import express from "express";
import usersRouter from "./routes/users.js";
import todosRouter from "./routes/todos.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));
