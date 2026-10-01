import express from "express";
import {
  foodOrderControllerReadAll,
  foodOrderControllerCreate,
  foodOrderControllerDelete,
  foodOrderControllerUpdate,
} from "../../controllers/order/orderController.js";

const router = express.Router();

router.post("/post", foodOrderControllerCreate);
router.get("/get", foodOrderControllerReadAll);
router.put("/put", foodOrderControllerUpdate);
router.delete("/delete", foodOrderControllerDelete);

export default router;
