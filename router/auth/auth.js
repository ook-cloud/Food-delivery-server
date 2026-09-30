import express from "express";
import { User } from "../../schemas/user-schema.js";
import {
  LoginController,
  SignUpController,
} from "../../controllers/auth/authController.js";
const router = express.Router();

router.post("/signup", SignUpController);
router.post("/login", LoginController);

export default router;
