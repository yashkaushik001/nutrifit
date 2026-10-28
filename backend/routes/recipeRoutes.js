const express = require("express");

const {
    getAllRecipes,
    getRecipeById,
    getFilteredRecipes,
    getRecommendedRecipes,
    getMealPlan
} = require("../controllers/recipeController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// ALL RECIPES
// =========================

router.get("/", getAllRecipes);


// =========================
// FILTER RECIPES
// =========================

router.get("/filter", getFilteredRecipes);


// =========================
// RECOMMENDED RECIPES
// =========================

router.get(
    "/recommended",
    authenticateToken,
    getRecommendedRecipes
);
router.get(
    "/meal-plan",
    authenticateToken,
    getMealPlan
);

// =========================
// RECIPE BY ID
// =========================

router.get("/:id", getRecipeById);


module.exports = router;