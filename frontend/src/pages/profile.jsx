import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        diet_type: "",
        goal: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_BASE_URL = `http://${window.location.hostname}:5000`;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        console.log("🔥 FETCH PROFILE STARTED");

        try {
            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/user/profile`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    cache: "no-store"
                }
            );

            const data = await response.json();

            console.log("🔥 Profile API Response:", data);
            console.log("🔥 Profile User Data:", data.user);

            if (!response.ok || !data.success || !data.user) {
                throw new Error(
                    data.message || "Failed to load profile"
                );
            }

            const user = data.user;

            setFormData({
                name: user.name ?? "",
                email: user.email ?? "",
                age: user.age ?? "",
                gender: user.gender ?? "",
                height: user.height ?? "",
                weight: user.weight ?? "",
                diet_type: user.diet_type ?? "",
                goal: user.goal ?? ""
            });

            console.log("🔥 Profile form data set successfully");

        } catch (err) {
            console.error("❌ Profile fetch error:", err);

            setError(
                err.message || "Profile load nahi ho pa rahi hai."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setMessage("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/user/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cache: "no-store",
                    body: JSON.stringify({
                        name: formData.name,
                        age: Number(formData.age),
                        gender: formData.gender,
                        height: Number(formData.height),
                        weight: Number(formData.weight),
                        diet_type: formData.diet_type,
                        goal: formData.goal
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to update profile"
                );
            }

            setMessage("Profile updated successfully! ✅");

            const savedUser =
                JSON.parse(
                    localStorage.getItem("nutrifit_user")
                ) || {};

            localStorage.setItem(
                "nutrifit_user",
                JSON.stringify({
                    ...savedUser,
                    name: formData.name,
                    email: formData.email,
                    age: Number(formData.age),
                    gender: formData.gender,
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    diet_type: formData.diet_type,
                    goal: formData.goal
                })
            );

        } catch (err) {
            console.error("❌ Profile update error:", err);

            setError(
                err.message || "Profile update nahi ho pa rahi hai."
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">
                    <div className="loader"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">

            {/* NAVBAR */}

            <nav className="profile-nav">

                <div
                    className="profile-brand"
                    onClick={() => navigate("/dashboard")}
                >
                    <span>🥗</span>
                    <strong>NutriFit</strong>
                </div>

                <button
                    className="back-dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </nav>


            {/* PROFILE CONTAINER */}

            <main className="profile-container">

                <div className="profile-header">

                    <div className="profile-avatar">
                        {formData.name
                            ? formData.name.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <div>
                        <p className="profile-label">
                            YOUR ACCOUNT
                        </p>

                        <h1>
                            Edit Profile
                        </h1>

                        <p>
                            Keep your health and nutrition information
                            up to date.
                        </p>
                    </div>

                </div>


                {/* MESSAGE */}

                {message && (
                    <div className="profile-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="profile-error">
                        ⚠️ {error}
                    </div>
                )}


                {/* FORM */}

                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >

                    {/* BASIC INFORMATION */}

                    <section className="profile-section">

                        <div className="profile-section-heading">
                            <span>👤</span>

                            <div>
                                <h2>Basic Information</h2>
                                <p>Your account details</p>
                            </div>
                        </div>


                        <div className="profile-form-grid">

                            <div className="profile-field">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>


                            <div className="profile-field">
                                <label>Email Address</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="readonly-input"
                                />

                                <small>
                                    Email cannot be changed here.
                                </small>
                            </div>

                        </div>

                    </section>


                    {/* HEALTH INFORMATION */}

                    <section className="profile-section">

                        <div className="profile-section-heading">
                            <span>❤️</span>

                            <div>
                                <h2>Health Information</h2>
                                <p>Your basic health details</p>
                            </div>
                        </div>


                        <div className="profile-form-grid">

                            <div className="profile-field">
                                <label>Age</label>

                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="1"
                                    max="120"
                                    placeholder="Enter your age"
                                    required
                                />
                            </div>


                            <div className="profile-field">
                                <label>Gender</label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select gender
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


                            <div className="profile-field">
                                <label>Height (cm)</label>

                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    min="50"
                                    max="250"
                                    step="0.1"
                                    placeholder="e.g. 175"
                                    required
                                />
                            </div>


                            <div className="profile-field">
                                <label>Weight (kg)</label>

                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    min="20"
                                    max="300"
                                    step="0.1"
                                    placeholder="e.g. 70"
                                    required
                                />
                            </div>

                        </div>

                    </section>


                    {/* NUTRITION PREFERENCES */}

                    <section className="profile-section">

                        <div className="profile-section-heading">
                            <span>🥗</span>

                            <div>
                                <h2>Nutrition Preferences</h2>
                                <p>Help us personalize your recipes</p>
                            </div>
                        </div>


                        <div className="profile-form-grid">

                            <div className="profile-field">
                                <label>Diet Preference</label>

                                <select
                                    name="diet_type"
                                    value={formData.diet_type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select diet
                                    </option>

                                    <option value="Veg">
                                        🟢 Vegetarian
                                    </option>

                                    <option value="Non-Veg">
                                        🔴 Non-Vegetarian
                                    </option>
                                </select>
                            </div>


                            <div className="profile-field">
                                <label>Fitness Goal</label>

                                <select
                                    name="goal"
                                    value={formData.goal}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select goal
                                    </option>

                                    <option value="Weight Loss">
                                        ⚖️ Weight Loss
                                    </option>

                                    <option value="Muscle Gain">
                                        💪 Muscle Gain
                                    </option>
                                </select>
                            </div>

                        </div>

                    </section>


                    {/* ACTIONS */}

                    <div className="profile-actions">

                        <button
                            type="button"
                            className="cancel-profile-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-profile-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "💾 Save Changes"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default Profile;