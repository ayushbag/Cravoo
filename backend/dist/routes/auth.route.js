import { Router } from "express";
import { loginFoodPartner, loginUser, logoutFoodPartner, logoutUser, registerFoodPartner, registerUser } from "../controller/auth.controller.js";
export const authRouter = Router();
// user auth APIs
authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);
authRouter.get("/user/logout", logoutUser);
// food partner auth APIs
authRouter.post("/food-partner/register", registerFoodPartner);
authRouter.post("/food-partner/login", loginFoodPartner);
authRouter.get("/food-partner/logout", logoutFoodPartner);
//# sourceMappingURL=auth.route.js.map