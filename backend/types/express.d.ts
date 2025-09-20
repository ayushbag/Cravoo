import { IFoodPartner } from "../src/models/foodPartner.model.ts";
import type { IUser } from "../src/models/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      foodPartner?: IFoodPartner | null;
      user?: IUser
    }
  }
}
