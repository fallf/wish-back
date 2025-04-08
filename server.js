import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { requestLogger, detailedLogger } from "./middleware/logger.js";
import productRoutes from "./routes/productRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5032;
const __dirname = path.resolve();

// ✅ Enable CORS BEFORE routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rainbow-kitten-1fba3f.netlify.app",
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json()); // Accept JSON in requests
app.use(detailedLogger); // Optional: request logging

// ✅ Check for required environment variable
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in the .env file.");
  process.exit(1); // Prevent server from running without DB
}

// ✅ API Routes
app.use("/api/products", productRoutes);

// ✅ Serve frontend if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Connect to DB and start server
app.listen(PORT, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
