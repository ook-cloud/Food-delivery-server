import express from "express";
import { User } from "../../schemas/user-schema.js";

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return response.status(401).json({ message: "Invalid credentials" });
    }

    response.status(200).json({ message: "User found", user });
  } catch (err) {
    console.error("loginController error:", err);
    response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({ email, password });

    response.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error("signUpController error:", err);
    response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
