import { Router } from "express";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import { createFood, getFoodItems } from "../controller/food.controller.js";
import multer from "multer";

export const foodRouter = Router();

// express server can't read video file coming from frontend
// so we used multer
const upload = multer({
    storage: multer.memoryStorage()
})

/* POST /api/food [protected] */
foodRouter.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);


/* GET /api/food */
foodRouter.get("/", getFoodItems)