import mongoose from "mongoose";
const FoodCategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
export const FoodCategory = mongoose.model("FoodCategory", FoodCategorySchema);
