import mongoose from "mongoose";

const { Schema } = mongoose;

// 1. Захиалга доторх хоол тус бүрийн Schema (Нэрийг нь OrderItemSchema болгож засав)
const OrderItemSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Dishes",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false },
);

// 2. Үндсэн Захиалгын Schema
const FoodOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    foodOrderItems: {
      // Frontend дээрх нэртэйгээ тохируулж foodOrderItems гэж засав
      type: [OrderItemSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELED", "DELIVERED"],
      default: "PENDING",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const FoodOrder =
  mongoose.models.FoodOrder || mongoose.model("FoodOrder", FoodOrderSchema);
