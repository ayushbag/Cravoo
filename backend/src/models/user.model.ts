import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
}

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