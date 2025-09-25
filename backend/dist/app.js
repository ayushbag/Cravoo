import express from "express";
import { authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { foodRouter } from "./routes/food.routes.js";
import cors from "cors";
import { foodPartnerRouter } from "./routes/food-partner.route.js";
const app = express();
// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/food-partner", foodPartnerRouter);
export default app;
//# sourceMappingURL=app.js.map