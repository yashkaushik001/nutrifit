import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    const API_BASE_URL = `http://${window.location.hostname}:5000`;

    useEffect(() => {
        fetchRecipe();
        checkFavorite();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/recipes/${id}`,
                {
                    cache: "no-store"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Recipe not found"
                );
            }

            if (data.success) {
                setRecipe(data.recipe);
            } else {
                throw new Error(
                    data.message || "Recipe not found"
                );
            }

        } catch (err) {
            console.error("Recipe error:", err);
            setError("Recipe load nahi ho pa rahi hai.");
        } finally {
            setLoading(false);
        }
    };

    const checkFavorite = async () => {
        try {
            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/favorites/check/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    cache: "no-store"
                }
            );

            const data = await response.json();

            if (data.success) {
                setIsFavorite(data.isFavorite);
            }

        } catch (error) {
            console.error(
                "Check favorite error:",
                error
            );
        }
    };

    const toggleFavorite = async () => {
        try {
            setFavoriteLoading(true);

            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const url =
                `${API_BASE_URL}/api/favorites/${id}`;

            const response = await fetch(url, {
                method: isFavorite
                    ? "DELETE"
                    : "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Something went wrong"
                );
            }

            if (data.success) {
                setIsFavorite(!isFavorite);
            }

        } catch (error) {
            console.error(
                "Favorite error:",
                error
            );

            alert(error.message);

        } finally {
            setFavoriteLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="recipe-details-message">
                <div className="loader"></div>
                <p>Loading recipe...</p>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="recipe-details-message">

                <div className="empty-icon">
                    🍽️
                </div>

                <h2>
                    Recipe Not Found
                </h2>

                <p>
                    {error}
                </p>

                <button
                    className="back-dashboard-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>
        );
    }

    const ingredients = recipe.ingredients
        ? recipe.ingredients
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item)
        : [];

    const instructions = recipe.instructions
        ? recipe.instructions
            .split(/\d+\.\s*/)
            .map((step) => step.trim())
            .filter((step) => step)
        : [];

    return (
        <div className="recipe-details-page">

            {/* TOP NAVIGATION */}

            <nav className="details-nav">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Back
                </button>

                <div className="details-brand">
                    🥗 NutriFit
                </div>

            </nav>


            {/* HERO */}

            <section className="recipe-details-hero">

                <div className="details-image-container">

                    <img
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="details-image"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.unsplash.com/photo-1498837167922-ddd27525d352";
                        }}
                    />

                    <div className="details-image-badges">

                        <span
                            className={
                                recipe.diet_type === "Veg"
                                    ? "detail-diet veg"
                                    : "detail-diet nonveg"
                            }
                        >
                            {recipe.diet_type === "Veg"
                                ? "🟢 Vegetarian"
                                : "🔴 Non-Vegetarian"}
                        </span>

                        {recipe.is_quick && (
                            <span className="detail-quick">
                                ⚡ Quick Recipe
                            </span>
                        )}

                    </div>

                </div>


                <div className="details-intro">

                    <div className="details-tags">

                        <span>
                            {recipe.category}
                        </span>

                        <span>
                            {recipe.meal_type}
                        </span>

                    </div>


                    <h1>
                        {recipe.name}
                    </h1>


                    <p className="details-description">
                        {recipe.description}
                    </p>


                    {/* FAVORITE */}

                    <button
                        className={`favorite-btn ${isFavorite
                                ? "favorite-active"
                                : ""
                            }`}
                        onClick={toggleFavorite}
                        disabled={favoriteLoading}
                    >
                        {favoriteLoading
                            ? "Saving..."
                            : isFavorite
                                ? "❤️ Remove from Favorites"
                                : "🤍 Add to Favorites"}
                    </button>


                    {/* TIME */}

                    <div className="time-info">

                        <div>
                            <span>⏱️</span>

                            <div>
                                <small>
                                    Preparation
                                </small>

                                <strong>
                                    {recipe.preparation_time} min
                                </strong>
                            </div>
                        </div>


                        <div>
                            <span>🔥</span>

                            <div>
                                <small>
                                    Cooking
                                </small>

                                <strong>
                                    {recipe.cooking_time} min
                                </strong>
                            </div>
                        </div>


                        <div>
                            <span>⏰</span>

                            <div>
                                <small>
                                    Total Time
                                </small>

                                <strong>
                                    {
                                        Number(
                                            recipe.preparation_time
                                        ) +
                                        Number(
                                            recipe.cooking_time
                                        )
                                    } min
                                </strong>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* NUTRITION */}

            <section className="nutrition-section">

                <div className="details-section-title">

                    <span>💪</span>

                    <div>
                        <p>
                            NUTRITION
                        </p>

                        <h2>
                            Nutrition Facts
                        </h2>
                    </div>

                </div>


                <div className="nutrition-cards">

                    <div className="nutrition-card">
                        <span>🔥</span>

                        <small>
                            Calories
                        </small>

                        <strong>
                            {recipe.calories}
                        </strong>

                        <em>
                            kcal
                        </em>
                    </div>


                    <div className="nutrition-card">
                        <span>💪</span>

                        <small>
                            Protein
                        </small>

                        <strong>
                            {recipe.protein}
                        </strong>

                        <em>
                            grams
                        </em>
                    </div>


                    <div className="nutrition-card">
                        <span>🍚</span>

                        <small>
                            Carbs
                        </small>

                        <strong>
                            {recipe.carbohydrates}
                        </strong>

                        <em>
                            grams
                        </em>
                    </div>


                    <div className="nutrition-card">
                        <span>🥑</span>

                        <small>
                            Fats
                        </small>

                        <strong>
                            {recipe.fats}
                        </strong>

                        <em>
                            grams
                        </em>
                    </div>

                </div>

            </section>


            {/* MAIN CONTENT */}

            <section className="recipe-main-content">

                {/* INGREDIENTS */}

                <div className="ingredients-section">

                    <div className="details-section-title">

                        <span>🧂</span>

                        <div>
                            <p>
                                WHAT YOU NEED
                            </p>

                            <h2>
                                Ingredients
                            </h2>
                        </div>

                    </div>


                    <div className="ingredients-list">

                        {ingredients.length > 0 ? (
                            ingredients.map(
                                (ingredient, index) => (

                                    <div
                                        className="ingredient-item"
                                        key={index}
                                    >

                                        <span>
                                            ✓
                                        </span>

                                        <p>
                                            {ingredient}
                                        </p>

                                    </div>

                                )
                            )
                        ) : (
                            <p>
                                Ingredients information
                                is not available.
                            </p>
                        )}

                    </div>

                </div>


                {/* INSTRUCTIONS */}

                <div className="instructions-section">

                    <div className="details-section-title">

                        <span>👨‍🍳</span>

                        <div>
                            <p>
                                COOKING METHOD
                            </p>

                            <h2>
                                How to Make It
                            </h2>
                        </div>

                    </div>


                    <div className="instructions-list">

                        {instructions.length > 0 ? (
                            instructions.map(
                                (step, index) => (

                                    <div
                                        className="instruction-step"
                                        key={index}
                                    >

                                        <div className="step-number">
                                            {index + 1}
                                        </div>

                                        <div>

                                            <h3>
                                                Step {index + 1}
                                            </h3>

                                            <p>
                                                {step}
                                            </p>

                                        </div>

                                    </div>

                                )
                            )
                        ) : (
                            <p>
                                Cooking instructions
                                are not available.
                            </p>
                        )}

                    </div>

                </div>

            </section>


            {/* BOTTOM */}

            <section className="recipe-bottom">

                <div>

                    <span>🥗</span>

                    <div>

                        <h3>
                            Eat healthy. Stay strong.
                        </h3>

                        <p>
                            Keep exploring healthy
                            recipes that match your
                            NutriFit goal.
                        </p>

                    </div>

                </div>


                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Explore More Recipes →
                </button>

            </section>

        </div>
    );
}

export default RecipeDetails;