import express from "express";
import { FoodOrder } from "../../schemas/orders-schema.js";

const orderRouter = express.Router();

orderRouter.post("/post", async (req, res) => {
  try {
    const { user, totalPrice, foodOrderItems } = req.body;

    const newOrder = await FoodOrder.create({
      user,
      totalPrice,
      foodOrderItems,
    });

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

orderRouter.get("/get", async (req, res) => {
  try {
    const orders = await FoodOrder.find()
      .populate("user", "email phoneNumber")
      .populate("foodOrderItems.food", "name price");

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

export default orderRouter;
