import { Router } from "express";
import { getFoodPartnerById } from "../controller/food-partner.controller.js";
import { allowRoles, verifyAuth } from "../middlewares/auth.middleware.js";
export const foodPartnerRouter = Router();
/* GET /api/food-provider/:profile [protected] */
foodPartnerRouter.get("/:id", verifyAuth, allowRoles("foodpartner", "user"), getFoodPartnerById);
//# sourceMappingURL=food-partner.route.js.map