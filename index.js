import express from "express";
import mongoose from "mongoose";

import authRouter from "./router/auth/auth.js";
import foodCategoryRouter from "./router/food-category/food-category-router.js";

import { User } from "./schemas/user-schema.js";
import { ConnectDB } from "./connectDB.js";

const app = express();
const PORT = 1000;

app.use(express.json());

ConnectDB();

app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
