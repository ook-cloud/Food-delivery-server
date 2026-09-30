import "dotenv/config";
import express from "express";
import cors from "cors";

import authRouter from "./router/auth/auth.js";
import foodCategoryRouter from "./router/food-category/foodCategory.js";
import dishesRouter from "./router/dishes/dishes.js";
import { connectDB } from "./connectDB.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 1010;

// Middleware-үүд
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/foodCategory", foodCategoryRouter);
app.use("/dishes", dishesRouter);

// Серверийг датабааз холбогдсоны ДАРАА ажиллуулах функц
const startServer = async () => {
  try {
    // 1. Датабаазтай эхэлж холбогдоно
    await connectDB();

    // 2. Амжилттай холбогдсоны дараа Express порт дээр сонсож эхэлнэ
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
