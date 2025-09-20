import type { Request } from "express";
import type { IFoodPartner } from "../models/foodpartner.model.js";
export interface AuthRequest extends Request {
    foodPartner?: IFoodPartner;
}
//# sourceMappingURL=authRequest.d.ts.map