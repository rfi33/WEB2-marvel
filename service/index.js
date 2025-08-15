import express from "express"
import router from "./routes/post.js"

const app = express();

app.use(express.json());


const PORT = 4000;

app.use("/",router)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
