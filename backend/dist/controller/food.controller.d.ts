import type { Request, Response } from "express";
import type { Types } from "mongoose";
export declare const createFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getFoodItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const likeFood: (req: Request<{}, {}, {
    foodId: Types.ObjectId;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const saveFood: (req: Request<{}, {}, {
    foodId: Types.ObjectId;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=food.controller.d.ts.map