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
    }
})

export const foodModel = model('Food', foodSchema)