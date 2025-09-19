import { model, Schema } from "mongoose";
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
export const userModel = model("User", userSchema);
//# sourceMappingURL=user.model.js.map