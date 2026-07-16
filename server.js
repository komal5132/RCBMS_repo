import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import connectDb from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js"
configDotenv();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
connectDb();

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api",router)

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Roshni Creations Business Management System developed by Satyaansh Softech");
});
