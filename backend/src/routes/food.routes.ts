import { Router } from "express";
import { createFood, getFoodItems, likeFood, saveFood } from "../controller/food.controller.js";
import multer from "multer";
import { allowRoles, verifyAuth } from "../middlewares/auth.middleware.js";

export const foodRouter = Router();

// express server can't read video file coming from frontend
// so we used multer
const upload = multer({
    storage: multer.memoryStorage()
})

/* POST /api/food [protected] */
foodRouter.post("/", verifyAuth, allowRoles("foodpartner"), upload.single("video"), createFood);

/* GET /api/food */
foodRouter.get("/", verifyAuth, allowRoles("foodpartner", "user"), getFoodItems)

/* POST /api/food/like [protected] */
foodRouter.post("/like", verifyAuth, allowRoles("user"), likeFood)

/* POST /api/food/save [protected]*/
foodRouter.post("/save", verifyAuth, allowRoles("user"), saveFood)