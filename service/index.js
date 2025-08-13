import express from "express"
import router from "./routes/post.js"
import db from './models/characters.json' with { type: "json"};

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

const PORT = 4000;

app.use("/",router)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
