import express from "express";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";
import { Dishes } from "../../schemas/dishes-schema.js";
import {
  dishesControllerCreate,
  dishesControllerReadAll,
  dishesControllerUpdate,
  dishesControllerDelete,
} from "../../controllers/dishes/dishesController.js";

const router = express.Router();

router.post("/post", requireToken, requireAdmin, dishesControllerCreate);
router.get("/get", dishesControllerReadAll);
router.put("/:id", requireToken, requireAdmin, dishesControllerUpdate);
router.delete("/:id", requireToken, requireAdmin, dishesControllerDelete);

export default router;
