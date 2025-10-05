import type { NextFunction, Request, Response } from "express";
import { type IFoodPartner } from "../models/foodpartner.model.js";
import { type IUser } from "../models/user.model.js";
declare global {
    namespace Express {
        interface Request {
            user?: IUser | IFoodPartner;
            role?: "user" | "foodpartner";
        }
    }
}
export declare const verifyAuth: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const allowRoles: (...allowed: any) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map