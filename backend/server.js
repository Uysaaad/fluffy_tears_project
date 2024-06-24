import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import journalRoutes from "./routes/journal.js";
import emotionGalleryRoutes from "./routes/emotionGallery.js";
import predictionRoutes from "./routes/prediction.js"; // Import prediction routes

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Pre-flight requests for all routes

app.get("/", (req, res) => {
  res.send("Hi, it's me, server!");
});

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed:", err);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files for model and tokenizer
app.use("/model", express.static(path.join(__dirname, "tfjs_model")));
app.use("/tokenizer", express.static(path.join(__dirname, "tf_tokenizer")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/journals", journalRoutes);
app.use("/api/v1/emotion-gallery", emotionGalleryRoutes);
app.use("/api/v1/predict", predictionRoutes); // Use prediction routes

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
