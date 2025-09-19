import { model, Schema } from "mongoose";

const foodPartnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

export const foodPartnerModel = model("FoodPartner", foodPartnerSchema);