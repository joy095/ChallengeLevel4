import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/route.js";

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.get("/test", (req, res) => {
  res.send("testing");
});

app.use("/task", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
