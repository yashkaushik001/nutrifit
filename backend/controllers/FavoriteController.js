const pool = require("../config/db");

// Add recipe to favorites
const addFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.params;

        // Check recipe exists
        const [recipes] = await pool.query(
            "SELECT id FROM recipes WHERE id = ?",
            [recipeId]
        );

        if (recipes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        // Check already favorite
        const [existing] = await pool.query(
            "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?",
            [userId, recipeId]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Recipe already added to favorites"
            });
        }

        await pool.query(
            "INSERT INTO favorites (user_id, recipe_id) VALUES (?, ?)",
            [userId, recipeId]
        );

        res.status(201).json({
            success: true,
            message: "Recipe added to favorites"
        });

    } catch (error) {
        console.error("Add favorite error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add favorite"
        });
    }
};


// Get user's favorites
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;

        const [favorites] = await pool.query(
            `
            SELECT 
                recipes.*,
                favorites.created_at AS favorite_created_at
            FROM favorites
            INNER JOIN recipes
                ON favorites.recipe_id = recipes.id
            WHERE favorites.user_id = ?
            ORDER BY favorites.created_at DESC
            `,
            [userId]
        );

        res.json({
            success: true,
            count: favorites.length,
            favorites
        });

    } catch (error) {
        console.error("Get favorites error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch favorites"
        });
    }
};


// Remove recipe from favorites
const removeFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.params;

        const [result] = await pool.query(
            "DELETE FROM favorites WHERE user_id = ? AND recipe_id = ?",
            [userId, recipeId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Recipe is not in favorites"
            });
        }

        res.json({
            success: true,
            message: "Recipe removed from favorites"
        });

    } catch (error) {
        console.error("Remove favorite error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove favorite"
        });
    }
};


// Check whether recipe is favorite
const checkFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.params;

        const [favorites] = await pool.query(
            "SELECT id FROM favorites WHERE user_id = ? AND recipe_id = ?",
            [userId, recipeId]
        );

        res.json({
            success: true,
            isFavorite: favorites.length > 0
        });

    } catch (error) {
        console.error("Check favorite error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to check favorite"
        });
    }
};


module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite,
    checkFavorite
};