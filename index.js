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
}); //read

app.post("/sign-up", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.create({ email, password });
    response.status(201).json({ message: "user created", user: user });
  } catch (err) {
    response.status(500).json({ message: "internal Server Error", error: err });
  }
});

app.post("/food-category", async (request, response) => {});
app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      response.status(404).json({ message: "user not found" });
    }
    response.status(200).json({ message: "user not found" });
  } catch (err) {
    response.status(500).json({ message: "internal Server Error", error: err });
  }
});

app.delete("/api/health", (request, response) => {
  response.json({ message: `YOU ARE CALLING DELETE ${PORT}` });
}); // delete

app.put("/api/health", (request, response) => {
  response.json({ message: `YOU ARE CALLING UPDATE ${PORT}` });
}); // update

app.listen(PORT, () => {
  console.log("server is running, on port ${PORT}");
});

("mongodb+srv://ooktb57_db_user:90040331@cluster0.m23cvjk.mongodb.net/");
