import { model, Schema, Types } from "mongoose";
const likeSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    food: {
        type: Types.ObjectId,
        ref: "Food",
        required: true
    }
}, {
    timestamps: true
});
export const likeModel = model("Like", likeSchema);
//# sourceMappingURL=like.model.js.map