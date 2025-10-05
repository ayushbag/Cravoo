import { Router } from "express";
import { getCurrentUser, loginFoodPartner, loginUser, logoutFoodPartner, logoutUser, registerFoodPartner, registerUser } from "../controller/auth.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// user auth APIs
authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);
authRouter.get("/user/logout", logoutUser);

// food partner auth APIs
authRouter.post("/food-partner/register", registerFoodPartner);
authRouter.post("/food-partner/login", loginFoodPartner);
authRouter.get("/food-partner/logout", logoutFoodPartner);

// verify session from backend route
authRouter.get("/me", verifyAuth, getCurrentUser)