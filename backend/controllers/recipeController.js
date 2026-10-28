const pool = require("../config/db");

// Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const [recipes] = await pool.query(
            "SELECT * FROM recipes ORDER BY created_at DESC"
        );

        res.json({
            success: true,
            count: recipes.length,
            recipes
        });

    } catch (error) {
        console.error("Get recipes error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch recipes"
        });
    }
};


// Get single recipe
const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;

        const [recipes] = await pool.query(
            "SELECT * FROM recipes WHERE id = ?",
            [id]
        );

        if (recipes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        res.json({
            success: true,
            recipe: recipes[0]
        });

    } catch (error) {
        console.error("Get recipe error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch recipe"
        });
    }
};


// Filter recipes
const getFilteredRecipes = async (req, res) => {
    try {
        const { category, diet_type, meal_type, quick } = req.query;

        let query = "SELECT * FROM recipes WHERE 1=1";
        const values = [];

        if (category) {
            query += " AND category = ?";
            values.push(category);
        }

        if (diet_type) {
            query += " AND diet_type = ?";
            values.push(diet_type);
        }

        if (meal_type) {
            query += " AND meal_type = ?";
            values.push(meal_type);
        }

        if (quick === "true") {
            query += " AND is_quick = TRUE";
        }

        query += " ORDER BY created_at DESC";

        const [recipes] = await pool.query(query, values);

        res.json({
            success: true,
            count: recipes.length,
            recipes
        });

    } catch (error) {
        console.error("Filter recipes error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to filter recipes"
        });
    }
};
const getRecommendedRecipes = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's diet and goal
        const [users] = await pool.query(
            `
            SELECT diet_type, goal
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { diet_type, goal } = users[0];

        // Find recipes matching user's diet and goal
        const [recipes] = await pool.query(
            `
            SELECT *
            FROM recipes
            WHERE diet_type = ?
            AND category = ?
            ORDER BY created_at DESC
            LIMIT 8
            `,
            [diet_type, goal]
        );

        res.json({
            success: true,
            userPreference: {
                diet_type,
                goal
            },
            count: recipes.length,
            recipes
        });

    } catch (error) {
        console.error("Recommendation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get recommendations"
        });
    }
};
const getMealPlan = async (req, res) => {
    try {
        const userId = req.user.id;

        const [users] = await pool.query(
            `
            SELECT diet_type, goal
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { diet_type, goal } = users[0];

        const [breakfast] = await pool.query(
            `
            SELECT *
            FROM recipes
            WHERE diet_type = ?
            AND category = ?
            AND meal_type = 'Breakfast'
            ORDER BY RAND()
            LIMIT 2
            `,
            [diet_type, goal]
        );

        const [lunch] = await pool.query(
            `
            SELECT *
            FROM recipes
            WHERE diet_type = ?
            AND category = ?
            AND meal_type = 'Lunch'
            ORDER BY RAND()
            LIMIT 2
            `,
            [diet_type, goal]
        );

        const [dinner] = await pool.query(
            `
            SELECT *
            FROM recipes
            WHERE diet_type = ?
            AND category = ?
            AND meal_type = 'Dinner'
            ORDER BY RAND()
            LIMIT 2
            `,
            [diet_type, goal]
        );

        const [snacks] = await pool.query(
            `
            SELECT *
            FROM recipes
            WHERE diet_type = ?
            AND category = ?
            AND meal_type = 'Snack'
            ORDER BY RAND()
            LIMIT 2
            `,
            [diet_type, goal]
        );

        res.json({
            success: true,
            userPreference: {
                diet_type,
                goal
            },
            mealPlan: {
                breakfast,
                lunch,
                dinner,
                snacks
            }
        });

    } catch (error) {
        console.error("Meal plan error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate meal plan"
        });
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    getFilteredRecipes,
    getRecommendedRecipes,
    getMealPlan
};