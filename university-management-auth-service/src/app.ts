import express, { urlencoded } from "express";
import usersRouter from "./app/modules/users/users.route";
import cors from "cors";
const app = express();

// middleware
app.use(cors());
// parser
app.use(express.json());
app.use(urlencoded({ extended: true }));

// application route
app.use('/api/v1/users', usersRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
