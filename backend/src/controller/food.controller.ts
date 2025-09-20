import type { Request, Response } from "express";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid"
import { foodModel } from "../models/food.model.js";
import z from "zod";

const foodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional()
}) 

export const createFood = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        const parsedBody = foodSchema.safeParse(req.body);

        if(!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid request body",
                errors: parsedBody.error.issues[0]?.message
            })
        }

        const fileUploadResult = await uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: parsedBody.data.name,
            description: parsedBody.data.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner?._id
        })

        return res.status(201).json({
            message: "Food created successfully",
            food: {
                id: foodItem._id,
                name: foodItem.name,
                description: foodItem.description,
                video: foodItem.video
            }
        })
    } catch (error) {
        console.error("Error creating food:", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getFoodItems = async (req: Request, res: Response) => {
    try {
        const foodItems = await foodModel.find({})

        return res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        })
    } catch (error) {
        console.error("error while fetching food items: ", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}