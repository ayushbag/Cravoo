import bcrypt from "bcryptjs";
import z from "zod";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { foodPartnerModel } from "../models/foodpartner.model.js";
// zod schema for register request body
const userRegisterBodySchema = z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, "Password must contain uppercase, lowercase, number, and special character"),
});
// zod schema for login request body
const userLoginBodySchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string(),
});
const foodPartnerRegisterSchema = z.object({
    name: z.string().min(1, "Name is required field"),
    contactName: z.string().min(1, "Contact name is required field"),
    phone: z.string().min(1, "Phone number is required field"),
    address: z.string().min(1, "Address is required field"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, "Password must contain uppercase, lowercase, number, and special character"),
});
const foodPartnerLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string(),
});
export const registerUser = async (req, res) => {
    // zod validation of request body
    const parsedBody = userRegisterBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.issues[0]?.message,
        });
    }
    const { fullName, email, password } = parsedBody.data;
    try {
        // check user already exists
        const isUserExists = await userModel.findOne({
            email,
        });
        if (isUserExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        // hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);
        // add the user to database
        const user = await userModel.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });
        const JWT_SECRET = process.env.JWT_SECRET;
        // generate jwt token
        const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, {
            expiresIn: "7d",
        });
        // set token as cookie
        res.cookie("token", token);
        // set user response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
export const loginUser = async (req, res) => {
    // zod validation of request body
    const parsedBody = userLoginBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            error: parsedBody.error.issues[0]?.message,
        });
    }
    const { email, password } = parsedBody.data;
    try {
        const user = await userModel.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({
            id: user._id,
            role: "user"
        }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token);
        return res.status(200).json({
            message: "User loggedin successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};
export const registerFoodPartner = async (req, res) => {
    const parsedBody = foodPartnerRegisterSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.issues[0]?.message,
        });
    }
    const { name, email, password, phone, address, contactName } = parsedBody.data;
    try {
        const isAccountAlreadyExists = await foodPartnerModel.findOne({
            email,
        });
        if (isAccountAlreadyExists) {
            return res.status(400).json({
                message: "Food partner already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            contactName,
        });
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = await jwt.sign({
            id: foodPartner._id,
            role: "foodpartner"
        }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token);
        return res.status(201).json({
            message: "Food partner register successfully",
            foodPartner: {
                id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                address: foodPartner.address,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
export const loginFoodPartner = async (req, res) => {
    const parsedBody = foodPartnerLoginSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.issues[0]?.message,
        });
    }
    const { email, password } = parsedBody.data;
    try {
        const foodPartner = await foodPartnerModel.findOne({
            email,
        });
        if (!foodPartner) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const token = jwt.sign({
            id: foodPartner._id,
            role: "foodpartner"
        }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token);
        return res.status(200).json({
            message: "User loggedin successfully",
            user: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
export const logoutFoodPartner = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Food partner logged out successfully",
    });
};
export const getCurrentUser = async (req, res) => {
    res.json({
        user: req.user,
        role: req.role
    });
};
//# sourceMappingURL=auth.controller.js.map