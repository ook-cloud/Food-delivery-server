import express from "express";

import { createFoodCategoryController } from "../../controllers/food-category/create-food-category.js";
import { getFoodCategoryController } from "../../controllers/food-category/get-food-category.js";
import { updateFoodCategoryController } from "../../controllers/food-category/update-food-category.js";
import { deleteFoodCategoryController } from "../../controllers/food-category/delete-food-category.js";

const router = express.Router();

router.post("/create", createFoodCategoryController);
router.get("/get", getFoodCategoryController);
router.put("/update", updateFoodCategoryController);
router.delete("/delete", deleteFoodCategoryController);

export default router;
