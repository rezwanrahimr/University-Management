import express, { urlencoded } from "express";
import cors from "cors";
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
