const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log("MongoDB Connection Failed:", err));

// Import category routes
const categoryRoutes = require("./routes/categoryRoutes"); // Ensure correct path
app.use("/api/categories", categoryRoutes); // Base path for category routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
