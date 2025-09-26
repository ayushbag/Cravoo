import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import { getFoodPartnerById } from "../controller/food-partner.controller.js";
export const foodPartnerRouter = Router();
/* GET /api/food-provider/:profile [protected] */
foodPartnerRouter.get("/:id", getFoodPartnerById);
//# sourceMappingURL=food-partner.route.js.map