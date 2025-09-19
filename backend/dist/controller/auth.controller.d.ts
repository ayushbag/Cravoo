import type { Request, Response } from "express";
import z from "zod";
declare const registerBodySchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
type RegisterBody = z.infer<typeof registerBodySchema>;
declare const loginBodySchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
type LoginBody = z.infer<typeof loginBodySchema>;
export declare const registerUser: (req: Request<{}, {}, RegisterBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginUser: (req: Request<{}, {}, LoginBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logoutUser: (req: Request, res: Response) => void;
export declare const registerFoodPartner: (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map