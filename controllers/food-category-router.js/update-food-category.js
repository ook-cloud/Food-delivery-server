import { FoodCategory } from "../../schemas/food-category.js";

export const getFoodCategoryController = async (request, response) => {
  try {
    const foodCategory = await FoodCategory.find();
    response.status(200).json({
      message: "food categories found:",
      foodCategories: foodCategory,
    });
  } catch (err) {
    response.status(500).json({ message: "Internal Server Error", error: err });
  }
};
