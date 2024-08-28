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
// import emotionGalleryRoutes from "./routes/emotion.js";
import predictionRoutes from "./routes/prediction.js";
import emotionRoutes from "./routes/emotion.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
// Apply CORS middleware with the specified options
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
app.use(express.json({ limit: '50mb' })); // Increase the payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase the payload limit for URL-encoded data
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
app.use("/api/v1/emotion-gallery", emotionRoutes);
app.use("/api/v1/predict", predictionRoutes); 
app.use("/api/v1/emotions", emotionRoutes)

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});

