import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import { foodModel } from "../models/food.model.js";
import z from "zod";
import { likeModel } from "../models/like.model.js";
import { saveModel } from "../models/save.model.js";
const foodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});
export const createFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "File is required",
            });
        }
        const parsedBody = foodSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid request body",
                errors: parsedBody.error.issues[0]?.message,
            });
        }
        const fileUploadResult = await uploadFile(req.file.buffer, uuid());
        const foodItem = await foodModel.create({
            name: parsedBody.data.name,
            description: parsedBody.data.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner?._id,
        });
        return res.status(201).json({
            message: "Food created successfully",
            food: {
                id: foodItem._id,
                name: foodItem.name,
                description: foodItem.description,
                video: foodItem.video,
            },
        });
    }
    catch (error) {
        console.error("Error creating food:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
export const getFoodItems = async (req, res) => {
    try {
        const foodItems = await foodModel.find({});
        return res.status(200).json({
            message: "Food items fetched successfully",
            foodItems,
        });
    }
    catch (error) {
        console.error("error while fetching food items: ", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
export const likeFood = async (req, res) => {
    try {
        const { foodId } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                message: "Unauthorized",
            });
        }
        const alreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId,
        });
        if (alreadyLiked) {
            await likeModel.deleteOne({
                user: user._id,
                food: foodId,
            });
            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            });
            return res.status(201).json({
                message: "Unliked!",
            });
        }
        const like = await likeModel.create({
            user: user._id,
            food: foodId,
        });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        });
        return res.status(201).json({
            message: "Liked!",
            like,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(201).json({
            message: "Internal Server Error",
        });
    }
};
export const saveFood = async (req, res) => {
    try {
        const { foodId } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                message: "Unauthorized"
            });
        }
        const alreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        });
        if (alreadySaved) {
            await saveModel.deleteOne({
                user: user._id,
                food: foodId
            });
            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { saveCount: -1 }
            });
            return res.status(201).json({
                message: "Unsaved"
            });
        }
        const save = await saveModel.create({
            user: user._id,
            food: foodId
        });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: 1 }
        });
        return res.status(201).json({
            message: "Saved"
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
//# sourceMappingURL=food.controller.js.map