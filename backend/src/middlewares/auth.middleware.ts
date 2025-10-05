import type { NextFunction, Request, Response } from "express";
import jwt, { decode, type JwtPayload } from "jsonwebtoken";
import { foodPartnerModel, type IFoodPartner } from "../models/foodpartner.model.js";
import { userModel, type IUser } from "../models/user.model.js";

declare global {
    namespace Express {
        interface Request {
            user?: IUser | IFoodPartner;
            role?: "user" | "foodpartner";
        }
    }
}

interface DecodedToken extends JwtPayload {
    id: string;
    role: "user" | "foodpartner"
}

// export const authFoodPartnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Unauthorized access"
//         })
//     }

//     const JWT_SECRET = process.env.JWT_SECRET as string

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

//         const foodPartner = await foodPartnerModel.findById(decoded.id).select("-password");

//         if (!foodPartner) {
//             return res.status(401).json({ 
//                 message: "Food partner not found" 
//             });
//         }

//         req.foodPartner = foodPartner;

//         next();
//     } catch (error) {
//         console.error("Error in authFoodPartnerMiddleware: ", error)
//         return res.status(401).json({
//             message: "Invalid token"
//         })
//     }
// }

// export const authUserMiddleware = async(req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.token;

//     if(!token) {
//         return res.status(401).json({
//             message: "Unauthorized access"
//         })
//     }

//     const JWT_SECRET = process.env.JWT_SECRET as string

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

//         const user = await userModel.findById(decoded.id).select("-password");

//         if(!user) {
//             return res.status(401).json({
//                 message: "User not found"
//             })
//         }

//         req.user = user;

//         next()
//     } catch (error) {
//         console.error("Error in authUserMiddleware:", error)
//         return res.status(500).json({
//             message: "Internal server error"
//         })
//     }
// }

export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        message: "Not authenticated"
    })

    const JWT_SECRET = process.env.JWT_SECRET as string;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        if(decoded.role === "user") {
            req.user = await userModel.findById(decoded.id).select("-password") as IUser;
        } else if (decoded.role === "foodpartner") {
            req.user = await foodPartnerModel.findById(decoded.id).select("-password") as IFoodPartner;
        }

        req.role = decoded.role
        next();
    } catch (error) {
        console.error(error)
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

// helper function for role based authentication
export const allowRoles = (...allowed: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.role || !allowed.includes(req.role)) {
            return res.status(403).json({ message: "Access denied" })
        }
        next()
    }
}