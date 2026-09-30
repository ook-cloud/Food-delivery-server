import mongoose from "mongoose";
const DishesSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Dishes = mongoose.model("Dishes", DishesSchema);
