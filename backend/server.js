const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const app = express();
// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());
// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "NutriFit API is running"
    });
});
// =========================
// API ROUTES
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes);
// =========================
// 404 ROUTE
// =========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`NutriFit server running on port ${PORT}`);
});