import jwt, { decode } from "jsonwebtoken";
import { foodPartnerModel } from "../models/foodpartner.model.js";
import { userModel } from "../models/user.model.js";
export const authFoodPartnerMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id).select("-password");
        if (!foodPartner) {
            return res.status(401).json({
                message: "Food partner not found"
            });
        }
        req.foodPartner = foodPartner;
        next();
    }
    catch (error) {
        console.error("Error in authFoodPartnerMiddleware: ", error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};
export const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in authUserMiddleware:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map