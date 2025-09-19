import mongoose from "mongoose";
export const connectDb = () => {
    const MONGO_DB_URI = process.env.MONGO_URI;
    if (!MONGO_DB_URI) {
        console.error("mongodb uri not found in env variables");
        process.exit(1);
    }
    mongoose.connect(MONGO_DB_URI)
        .then(() => console.log("mongodb connected"))
        .catch((err) => console.log(`mongodb connection error:, ${err}`));
};
//# sourceMappingURL=db.js.map