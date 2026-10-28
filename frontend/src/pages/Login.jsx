import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Automatically uses:
    // Laptop -> http://localhost:5000
    // Phone  -> http://192.168.x.x:5000
    const API_BASE_URL = `http://${window.location.hostname}:5000`;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            localStorage.setItem(
                "nutrifit_token",
                data.token
            );

            localStorage.setItem(
                "nutrifit_user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            console.error("Login Error:", error);

            setError(
                error.message === "Failed to fetch"
                    ? "Unable to connect to NutriFit server. Please make sure the backend is running."
                    : error.message
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                <Link to="/" className="auth-logo">
                    <span className="logo-icon">N</span>
                    Nutri<span>Fit</span>
                </Link>

                <div className="auth-card">

                    <div className="auth-heading">

                        <div className="auth-symbol">
                            ♡
                        </div>

                        <h1>
                            Welcome Back
                        </h1>

                        <p>
                            Continue your healthy journey.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="primary-button full-width"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In →"
                            }
                        </button>

                    </form>

                    <p className="auth-footer">

                        Don't have an account?

                        <Link to="/signup">
                            Create one
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;