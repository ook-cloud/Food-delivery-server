import express from "express";
import jwt from "jsonwebtoken";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import { FoodCategory } from "../../schemas/category-schema.js";
import {
  foodCategoryControllerCreate,
  foodCategoryControllerDelete,
  foodCategoryControllerReadAll,
  foodCategoryControllerUpdate,
} from "../../controllers/food-category-router.js/foodCategoryController.js";
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/post", foodCategoryControllerCreate);
router.get("/get", foodCategoryControllerReadAll);
router.put("/put", foodCategoryControllerUpdate);
router.delete(
  "/delete",

  foodCategoryControllerDelete,
);
export default router;
