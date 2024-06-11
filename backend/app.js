// Import required modules
const express = require("express"); // Express framework
const mongoose = require("mongoose"); // MongoDB ODM
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const cors = require("cors"); // Middleware to enable CORS
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const journalRoutes = require("./routes/journalRoutes"); // Import journal routes
const dbConfig = require("./config/db"); // Import database configuration

// Initialize express application
const app = express();

// Connect to MongoDB using Mongoose
mongoose
  .connect(dbConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Define routes for authentication and journals
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);

// Export the app module
module.exports = app;
