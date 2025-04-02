import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import { connectDB } from "./config/db.js";
import { requestLogger, detailedLogger } from "./middleware/logger.js";

import productRoutes from "./routes/productRoutes.mjs";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5032;
const __dirname = path.resolve();
app.use(express.json()); // Allows us to accept JSON data in req.body

//mddleware
app.use(detailedLogger);

// ✅ Check if `MONGO_URI` is missing and prevent crashes
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in the .env file.");
  process.exit(1); // Stop the app if the database URI is missing
}

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.length("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Start Server & Connect to MongoDB
app.listen(PORT, async () => {
  await connectDB(process.env.MONGO_URI); // ✅ Pass the variable directly
  console.log("Server started at http://localhost:" + PORT);
});
