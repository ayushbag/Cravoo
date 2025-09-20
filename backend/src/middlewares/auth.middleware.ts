import type { NextFunction, Request, Response } from "express";
import jwt, { decode, type JwtPayload } from "jsonwebtoken";
import { foodPartnerModel } from "../models/foodpartner.model.js";
import { userModel } from "../models/user.model.js";

interface DecodedToken extends JwtPayload {
    id: string;
}

export const authFoodPartnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const JWT_SECRET = process.env.JWT_SECRET as string

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        const foodPartner = await foodPartnerModel.findById(decoded.id).select("-password");

        if (!foodPartner) {
            return res.status(401).json({ 
                message: "Food partner not found" 
            });
        }

        req.foodPartner = foodPartner;

        next();
    } catch (error) {
        console.error("Error in authFoodPartnerMiddleware: ", error)
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

export const authUserMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const JWT_SECRET = process.env.JWT_SECRET as string

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        const user = await userModel.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user;

        next()
    } catch (error) {
        console.error("Error in authUserMiddleware:", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}