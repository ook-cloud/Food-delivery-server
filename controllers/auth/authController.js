import express from "express";
import { User } from "../../schemas/user-schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is missing.");
}

const signAuthToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" },
  );
};

const publicUser = (user) => ({
  _id: user._id,
  email: user.email,
  role: user.role,
});

export const SignUpController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ message: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = signAuthToken(user);

    return response.status(201).json({
      message: "User created successfully",
      user: publicUser(user),
      token,
    });
  } catch (err) {
    console.error("SignUp Error:", err);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

export const LoginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response
        .status(401)
        .json({ message: "Invalid email or password." });
    }

    const token = signAuthToken(user);

    return response.status(201).json({
      message: "Login successful",
      user: publicUser(user),
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
