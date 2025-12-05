import express from "express";
import dotenv from "dotenv";
import path from "path";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// user routes
app.use("/api/v1/users", userRoutes);

app.use("/auth", authRoutes);
// DB init
initDB().catch((err) => {
  console.error("DB init failed:", err);
});

export default app;
