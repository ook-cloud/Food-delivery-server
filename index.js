import express, { request, response } from "express";
import mongoose from "mongoose";
import { User } from "./schemas/user-schema.js";
import connectDB from "./connectDB.js";
const app = express();

const PORT = 1010;

app.use(express.json());

connectDB();

app.get("/api/health", (request, response) => {
  response.json({ message: `API HEALTHY RUNNING ON ${PORT}` });
});

app.post("/login",);

app.post("/sign-up",);

app.post("/food/category", async (request, response) => 

app.listen(PORT, () => {
  console.log("server is running, on port ${PORT}");
});

("mongodb+srv://ooktb57_db_user:90040331@cluster0.m23cvjk.mongodb.net/");
