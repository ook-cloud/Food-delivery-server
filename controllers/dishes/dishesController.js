import { Dishes } from "../../schemas/dishes-schema.js";

export const dishesControllerCreate = async (request, response) => {
  try {
    const { foodName, price, image, ingredients, category } = request.body;
    const dishes = await Dishes.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });
    return response.status(201).json({ message: "Dish Created", dishes });
  } catch (err) {
    if (err.name === "ValidationError") {
      return response.status(400).json({ message: err.message });
    }
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const dishesControllerReadAll = async (request, response) => {
  try {
    const dishes = await Dishes.find().populate("category");
    return response.status(200).json({
      message: "Dishes read successfully",
      dishes,
    });
  } catch (err) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const dishesControllerUpdate = async (request, response) => {
  try {
    const { id } = request.params;
    const { foodName, price, image, ingredients, category } = request.body;

    const dishes = await Dishes.findByIdAndUpdate(
      id,
      { foodName, price, image, ingredients, category },
      { new: true, runValidators: true },
    );

    if (!dishes) {
      return response.status(404).json({ message: "Dish not found" });
    }
    return response.status(200).json({ message: "Updated", dishes });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return response.status(400).json({ message: err.message });
    }
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const dishesControllerDelete = async (request, response) => {
  try {
    const { id } = request.params;
    const dishes = await Dishes.findByIdAndDelete(id);

    if (!dishes) {
      return response.status(404).json({ message: "Dish not found" });
    }
    return response
      .status(200)
      .json({ message: "Dish deleted successfully", dishes });
  } catch (err) {
    if (err.name === "CastError") {
      return response.status(400).json({ message: "Invalid ID format" });
    }
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
