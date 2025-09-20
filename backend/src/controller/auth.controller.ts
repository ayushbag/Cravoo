import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import z from "zod";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { foodPartnerModel } from "../models/foodpartner.model.js";

// zod schema for register request body
const registerBodySchema = z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
        "Password must contain uppercase, lowercase, number, and special character"
    )
})

// interface RegisterBody {
//     fullName: string;
//     email: string;
//     password: string
// }

// infer types from zod schema
type UserRegisterBody = z.infer<typeof registerBodySchema>;

// zod schema for login request body
const loginBodySchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
})

// infer types from zod schema
type UserLoginBody = z.infer<typeof loginBodySchema>;

const foodPartnerRegisterSchema = z.object({
    name: z.string().min(1, "Name is required field"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters").regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
        "Password must contain uppercase, lowercase, number, and special character"
    )
})

export type FoodPartnerRegister = z.infer<typeof foodPartnerRegisterSchema>;

const foodPartnerLoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
})

type FoodPartnerLogin = z.infer<typeof foodPartnerLoginSchema>

export const registerUser = async (req: Request<{}, {}, UserRegisterBody>, res: Response) => {

    // zod validation of request body
    const parsedBody = registerBodySchema.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.issues[0]?.message
        })
    }

    const { fullName, email, password } = parsedBody.data;

    try {
        // check user already exists
        const isUserExists = await userModel.findOne({
            email
        })

        if (isUserExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // add the user to database
        const user = await userModel.create({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        const JWT_SECRET = process.env.JWT_SECRET as string;

        // generate jwt token
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, { expiresIn: "1d" });

        // set token as cookie
        res.cookie("token", token);

        // set user response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const loginUser = async (req: Request<{}, {}, UserLoginBody>, res: Response) => {

    // zod validation of request body
    const parsedBody = loginBodySchema.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            error: parsedBody.error.issues[0]?.message
        })
    }

    const { email, password } = parsedBody.data;

    try {
        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        return res.status(200).json({
            message: "User loggedin successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}

export const registerFoodPartner = async (req: Request<{}, {}, FoodPartnerRegister>, res: Response) => {
    
    const parsedBody = foodPartnerRegisterSchema.safeParse(req.body);

    if(!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.issues[0]?.message
        })
    }

    const { name, email, password } = parsedBody.data;

    try {
        const isAccountAlreadyExists = await foodPartnerModel.findOne({
            email
        })

        if(isAccountAlreadyExists) {
            return res.status(400).json({
                message: "Food partner already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword
        })

        const JWT_SECRET = process.env.JWT_SECRET as string;

        const token = await jwt.sign({
            id: foodPartner._id
        }, JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        return res.status(201).json({
            message: "Food partner register successfully",
            foodPartner: {
                id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const loginFoodPartner = async (req: Request<{}, {}, FoodPartnerLogin>, res: Response) => {

    const parsedBody = loginBodySchema.safeParse(req.body);

    if(!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: parsedBody.error.issues[0]?.message
        })
    }
 
    const { email, password } = parsedBody.data;

    try {
        const foodPartner = await foodPartnerModel.findOne({
            email
        })

        if(!foodPartner) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;

        const token = jwt.sign({
            id: foodPartner._id
        }, JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        return res.status(200).json({
            message: "User loggedin successfully",
            user: {
                _id: foodPartner._id,
                email: foodPartner.email,
                fullName: foodPartner.name
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const logoutFoodPartner = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Food partner logged out successfully"
    });
}