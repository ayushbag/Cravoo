import express from "express";
import { authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { foodRouter } from "./routes/food.routes.js";
const app = express();
// middlewares
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
export default app;
//# sourceMappingURL=app.js.map