import { model, Schema, Types } from "mongoose";

export const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: Types.ObjectId,
        ref: "FoodPartner"
    },
    likeCount: {
        type: Number,
        default: 0
    },
    saveCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const foodModel = model('Food', foodSchema);