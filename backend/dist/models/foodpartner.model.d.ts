import { Document, Schema } from "mongoose";
export interface IFoodPartner extends Document {
    name: string;
    email: string;
    password: string;
}
export declare const foodPartnerModel: import("mongoose").Model<{
    name: string;
    email: string;
    password: string;
}, {}, {}, {}, Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    name: string;
    email: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    password: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=foodpartner.model.d.ts.map