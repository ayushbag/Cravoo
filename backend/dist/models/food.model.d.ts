import { Schema, Types } from "mongoose";
export declare const foodSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const foodModel: import("mongoose").Model<{
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    createdAt: NativeDate;
    video: string;
    likeCount: number;
    saveCount: number;
    description?: string | null;
    foodPartner?: {
        prototype?: Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    } | null;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=food.model.d.ts.map