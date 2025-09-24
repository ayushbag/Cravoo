import express from "express";
import { authRouter } from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { foodRouter } from "./routes/food.routes.js";
import cors from "cors"

const app = express();

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter)
app.use("/api/food", foodRouter)

export default app;