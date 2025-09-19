import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./db/db.js";

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

// connectDB logic
connectDb();