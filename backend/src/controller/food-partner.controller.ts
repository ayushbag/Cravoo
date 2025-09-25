import type { Request, Response } from "express";
import { foodPartnerModel } from "../models/foodpartner.model.js";
import { foodModel } from "../models/food.model.js";

export const getFoodPartnerById = async (req: Request, res: Response) => {
    try {
        const foodPartnerId = req.params.id;

        const foodPartner = await foodPartnerModel.findById(foodPartnerId);

        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            })
        }

        const foodItemsByFoodPartner = await foodModel.find({
            foodPartner: foodPartnerId
        })

        return res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        })
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}