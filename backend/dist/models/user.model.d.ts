import { Document, Schema } from "mongoose";
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
}
export declare const userModel: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    email: string;
    password: string;
}, {}, {}, {}, Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    email: string;
    password: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    email: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    email: string;
    password: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    email: string;
    password: string;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    fullName: string;
    email: string;
    password: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=user.model.d.ts.map