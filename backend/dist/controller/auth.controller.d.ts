import type { Request, Response } from "express";
import z from "zod";
declare const registerBodySchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
type UserRegisterBody = z.infer<typeof registerBodySchema>;
declare const loginBodySchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
type UserLoginBody = z.infer<typeof loginBodySchema>;
declare const foodPartnerRegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export type FoodPartnerRegister = z.infer<typeof foodPartnerRegisterSchema>;
declare const foodPartnerLoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
type FoodPartnerLogin = z.infer<typeof foodPartnerLoginSchema>;
export declare const registerUser: (req: Request<{}, {}, UserRegisterBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginUser: (req: Request<{}, {}, UserLoginBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logoutUser: (req: Request, res: Response) => void;
export declare const registerFoodPartner: (req: Request<{}, {}, FoodPartnerRegister>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginFoodPartner: (req: Request<{}, {}, FoodPartnerLogin>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logoutFoodPartner: (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map