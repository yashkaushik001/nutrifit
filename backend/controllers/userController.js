const pool = require("../config/db");

// =========================
// GET PROFILE
// =========================
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [users] = await pool.query(
            `SELECT
                id,
                name,
                email,
                age,
                gender,
                height,
                weight,
                diet_type,
                goal,
                created_at
             FROM users
             WHERE id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        console.error("Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =========================
// UPDATE PROFILE
// =========================
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            name,
            age,
            gender,
            height,
            weight,
            diet_type,
            goal
        } = req.body;

        if (
            !name ||
            !age ||
            !gender ||
            !height ||
            !weight ||
            !diet_type ||
            !goal
        ) {
            return res.status(400).json({
                success: false,
                message: "All profile fields are required"
            });
        }

        await pool.query(
            `UPDATE users
             SET
                name = ?,
                age = ?,
                gender = ?,
                height = ?,
                weight = ?,
                diet_type = ?,
                goal = ?
             WHERE id = ?`,
            [
                name,
                age,
                gender,
                height,
                weight,
                diet_type,
                goal,
                userId
            ]
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};