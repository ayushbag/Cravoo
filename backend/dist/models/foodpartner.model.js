import { Document, model, Schema } from "mongoose";
const foodPartnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
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
});
export const foodPartnerModel = model("FoodPartner", foodPartnerSchema);
//# sourceMappingURL=foodpartner.model.js.map