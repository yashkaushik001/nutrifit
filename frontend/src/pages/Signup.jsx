import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        diet_type: "",
        goal: ""
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

    const nextStep = () => {
        if (step === 1) {
            if (
                !formData.name ||
                !formData.email ||
                !formData.password
            ) {
                setError("Please complete all account details.");
                return;
            }
        }

        if (step === 2) {
            if (
                !formData.age ||
                !formData.gender ||
                !formData.height ||
                !formData.weight
            ) {
                setError("Please complete all health details.");
                return;
            }
        }

        setError("");
        setStep(step + 1);
    };

    const previousStep = () => {
        setError("");

        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.diet_type || !formData.goal) {
            setError("Please select your diet and goal.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/auth/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        ...formData,
                        age: Number(formData.age),
                        height: Number(formData.height),
                        weight: Number(formData.weight)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Signup failed"
                );
            }

            navigate("/login");

        } catch (error) {
            console.error("Signup Error:", error);

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

            <div className="signup-container">

                <Link to="/" className="auth-logo">
                    <span className="logo-icon">N</span>
                    Nutri<span>Fit</span>
                </Link>

                <div className="signup-card">

                    <div className="signup-header">

                        <div>

                            <span className="step-label">
                                STEP {step} OF 3
                            </span>

                            <h1>
                                Build Your Health Profile
                            </h1>

                            <p>
                                Help us personalize your nutrition journey.
                            </p>

                        </div>

                    </div>

                    <div className="step-progress">

                        <div
                            className={
                                step >= 1
                                    ? "step active"
                                    : "step"
                            }
                        >
                            1
                        </div>

                        <div
                            className={
                                step >= 2
                                    ? "line active"
                                    : "line"
                            }
                        ></div>

                        <div
                            className={
                                step >= 2
                                    ? "step active"
                                    : "step"
                            }
                        >
                            2
                        </div>

                        <div
                            className={
                                step >= 3
                                    ? "line active"
                                    : "line"
                            }
                        ></div>

                        <div
                            className={
                                step >= 3
                                    ? "step active"
                                    : "step"
                            }
                        >
                            3
                        </div>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* STEP 1 */}

                        {step === 1 && (

                            <div className="form-section">

                                <h2>
                                    Create your account
                                </h2>

                                <p className="section-description">
                                    Your basic account information.
                                </p>

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
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
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength="6"
                                    required
                                />

                            </div>

                        )}

                        {/* STEP 2 */}

                        {step === 2 && (

                            <div className="form-section">

                                <h2>
                                    Tell us about yourself
                                </h2>

                                <p className="section-description">
                                    This helps us personalize your nutrition recommendations.
                                </p>

                                <div className="two-column">

                                    <div>

                                        <label>
                                            Age
                                        </label>

                                        <input
                                            type="number"
                                            name="age"
                                            placeholder="e.g. 21"
                                            min="13"
                                            max="100"
                                            value={formData.age}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div>

                                        <label>
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="two-column">

                                    <div>

                                        <label>
                                            Height (cm)
                                        </label>

                                        <input
                                            type="number"
                                            name="height"
                                            placeholder="e.g. 175"
                                            min="50"
                                            max="250"
                                            step="0.1"
                                            value={formData.height}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div>

                                        <label>
                                            Weight (kg)
                                        </label>

                                        <input
                                            type="number"
                                            name="weight"
                                            placeholder="e.g. 70"
                                            min="20"
                                            max="300"
                                            step="0.1"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>

                            </div>

                        )}

                        {/* STEP 3 */}

                        {step === 3 && (

                            <div className="form-section">

                                <h2>
                                    Choose your nutrition goal
                                </h2>

                                <p className="section-description">
                                    We'll use this to personalize your recipes.
                                </p>

                                <label>
                                    Food Preference
                                </label>

                                <div className="choice-grid">

                                    <button
                                        type="button"
                                        className={
                                            formData.diet_type === "Veg"
                                                ? "choice selected"
                                                : "choice"
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                diet_type: "Veg"
                                            })
                                        }
                                    >

                                        <span>🥗</span>

                                        <strong>
                                            Vegetarian
                                        </strong>

                                        <small>
                                            Plant-based recipes
                                        </small>

                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            formData.diet_type === "Non-Veg"
                                                ? "choice selected"
                                                : "choice"
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                diet_type: "Non-Veg"
                                            })
                                        }
                                    >

                                        <span>🍗</span>

                                        <strong>
                                            Non-Vegetarian
                                        </strong>

                                        <small>
                                            Includes meat & eggs
                                        </small>

                                    </button>

                                </div>

                                <label>
                                    Your Main Goal
                                </label>

                                <div className="goal-grid">

                                    <button
                                        type="button"
                                        className={
                                            formData.goal === "Weight Loss"
                                                ? "goal selected"
                                                : "goal"
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                goal: "Weight Loss"
                                            })
                                        }
                                    >

                                        <span>🔥</span>

                                        <strong>
                                            Weight Loss
                                        </strong>

                                        <small>
                                            Healthy calorie-controlled meals
                                        </small>

                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            formData.goal === "Muscle Gain"
                                                ? "goal selected"
                                                : "goal"
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                goal: "Muscle Gain"
                                            })
                                        }
                                    >

                                        <span>💪</span>

                                        <strong>
                                            Muscle Gain
                                        </strong>

                                        <small>
                                            Protein-rich balanced meals
                                        </small>

                                    </button>

                                </div>

                            </div>

                        )}

                        <div className="form-actions">

                            {step > 1 && (

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={previousStep}
                                >
                                    ← Back
                                </button>

                            )}

                            {step < 3 ? (

                                <button
                                    type="button"
                                    className="primary-button"
                                    onClick={nextStep}
                                >
                                    Continue →
                                </button>

                            ) : (

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating Account..."
                                        : "Create My Account →"
                                    }
                                </button>

                            )}

                        </div>

                    </form>

                    <p className="auth-footer">

                        Already have an account?

                        <Link to="/login">
                            Sign in
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Signup;