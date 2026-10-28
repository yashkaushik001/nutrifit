const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// =========================
// SIGNUP
// =========================
const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            age,
            gender,
            height,
            weight,
            diet_type,
            goal
        } = req.body;

        // Required fields
        if (
            !name ||
            !email ||
            !password ||
            !age ||
            !gender ||
            !height ||
            !weight ||
            !diet_type ||
            !goal
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check email
        const [existingUser] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.query(
            `INSERT INTO users
            (name, email, password, age, gender, height, weight, diet_type, goal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                email,
                hashedPassword,
                age,
                gender,
                height,
                weight,
                diet_type,
                goal
            ]
        );

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            userId: result.insertId
        });

    } catch (error) {
        console.error("Signup Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during signup"
        });
    }
};


// =========================
// LOGIN
// =========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const [users] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                height: user.height,
                weight: user.weight,
                diet_type: user.diet_type,
                goal: user.goal
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};


module.exports = {
    signup,
    login
};