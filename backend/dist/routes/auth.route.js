import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/auth.controller.js";
export const authRouter = Router();
authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);
authRouter.get("/user/logout", logoutUser);
//# sourceMappingURL=auth.route.js.map