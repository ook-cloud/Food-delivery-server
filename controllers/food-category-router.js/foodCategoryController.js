import express from "express";
import { FoodCategory } from "../../schemas/category-schema.js";
import { Dishes } from "../../schemas/dishes-schema.js";

export const foodCategoryControllerCreate = async (request, response) => {
  try {
    const { categoryName } = request.body;

    if (!categoryName) {
      return response
        .status(400)
        .json({ message: "Category name is required" });
    }

    const category = await FoodCategory.create({
      categoryName,
    });

    return response.status(201).json({ message: "Category Created", category });
  } catch (err) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message || err });
  }
};

export const foodCategoryControllerReadAll = async (request, response) => {
  try {
    const category = await FoodCategory.find();

    const dishesForEachCategory = await Promise.all(
      category.map(async (cat) => {
        const dishesCount = await Dishes.countDocuments({ category: cat._id });

        return {
          ...cat.toObject(),
          dishesCount,
        };
      }),
    );

    return response.status(200).json({
      message: "Food category read successfully",
      category: dishesForEachCategory,
    });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const foodCategoryControllerRead = async (request, response) => {
  try {
    const category = await FoodCategory.find();

    return response.status(200).json({
      message: "Food category read successfully",
      category: category, // Дата буцаах хэсгийг нэмэв
    });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message || err });
  }
};

export const foodCategoryControllerUpdate = async (request, response) => {
  try {
    // ID-г params эсвэл body-ийн алинаас ч авч болохоор тохируулав
    const id = request.params.id || request.body.id;
    const { categoryName } = request.body;

    if (!id) {
      return response.status(400).json({ message: "Category ID is required" });
    }

    const updatedCategory = await FoodCategory.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) {
      return response.status(404).json({ message: "Food category not found" });
    }

    // Давхардсан хариуг устгаж нэг болгов
    return response.status(200).json({
      message: "Food category updated successfully",
      category: updatedCategory,
    });
  } catch (err) {
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message || err });
  }
};

export const foodCategoryControllerDelete = async (request, response) => {
  try {
    // ID-г params эсвэл body-ийн алинаас ч авч болохоор тохируулав
    const id = request.params.id || request.body.id;

    if (!id) {
      return response.status(400).json({ message: "Category ID is required" });
    }

    const delCategory = await FoodCategory.findByIdAndDelete(id);

    if (!delCategory) {
      return response.status(404).json({ message: "Food category not found" });
    }

    return response.status(200).json({
      message: "Food category deleted successfully",
      category: delCategory,
    });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message || err });
  }
};
