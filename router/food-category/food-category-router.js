import express from "express";
import { getFoodCategoryController } from "../../controllers/food-category-router.js/get-food-category.js";
import { updateFoodCategory } from "../../controllers/food-category-router.js/update-food-category.js";
import { delCategory } from "../../controllers/food-category-router.js/delete-food-category.js";
import { createFoodCategoryController } from "../../controllers/food-category-router.js/create-food-category.js";

const router = express.Router();

router.post("/create", createFoodCategoryController);
router.get("/get", getFoodCategoryController);
router.put("/update", updateFoodCategory);
router.delete("/delete", delCategory);

export default router;
