const express = require("express");

const {
    addFavorite,
    getFavorites,
    removeFavorite,
    checkFavorite
} = require("../controllers/FavoriteController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// Add favorite
router.post(
    "/:recipeId",
    authenticateToken,
    addFavorite
);


// Get all favorites
router.get(
    "/",
    authenticateToken,
    getFavorites
);


// Check favorite
router.get(
    "/check/:recipeId",
    authenticateToken,
    checkFavorite
);


// Remove favorite
router.delete(
    "/:recipeId",
    authenticateToken,
    removeFavorite
);


module.exports = router;