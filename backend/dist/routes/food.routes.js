import { Router } from "express";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import { createFood, getFoodItems, likeFood, saveFood } from "../controller/food.controller.js";
import multer from "multer";
export const foodRouter = Router();
// express server can't read video file coming from frontend
// so we used multer
const upload = multer({
    storage: multer.memoryStorage()
});
/* POST /api/food [protected] */
foodRouter.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);
/* GET /api/food */
foodRouter.get("/", getFoodItems);
/* POST /api/food/like [protected] */
foodRouter.post("/like", authUserMiddleware, likeFood);
/* POST /api/food/save [protected]*/
foodRouter.post("/save", authUserMiddleware, saveFood);
//# sourceMappingURL=food.routes.js.map