import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_BASE_URL = `http://${window.location.hostname}:5000`;

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/favorites`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    cache: "no-store"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load favorites"
                );
            }

            if (data.success) {
                setFavorites(data.favorites);
            }

        } catch (error) {
            console.error("Favorites error:", error);
            setError("Favorites load nahi ho pa rahe hain.");
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (recipeId) => {
        try {
            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/favorites/${recipeId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to remove favorite"
                );
            }

            if (data.success) {
                setFavorites((previousFavorites) =>
                    previousFavorites.filter(
                        (recipe) => recipe.id !== recipeId
                    )
                );
            }

        } catch (error) {
            console.error("Remove favorite error:", error);
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className="recipe-details-message">
                <div className="loader"></div>
                <p>Loading your favorites...</p>
            </div>
        );
    }

    return (
        <div className="favorites-page">

            {/* NAVBAR */}

            <nav className="favorites-nav">

                <button
                    className="back-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

                <div className="details-brand">
                    🥗 NutriFit
                </div>

            </nav>


            {/* HEADER */}

            <section className="favorites-header">

                <div>
                    <span className="favorites-icon">
                        ❤️
                    </span>

                    <p className="favorites-small-title">
                        YOUR COLLECTION
                    </p>

                    <h1>
                        My Favorite Recipes
                    </h1>

                    <p>
                        Your saved healthy recipes are all
                        in one place.
                    </p>
                </div>

                <div className="favorite-count">
                    <strong>
                        {favorites.length}
                    </strong>

                    <span>
                        Saved Recipes
                    </span>
                </div>

            </section>


            {/* ERROR */}

            {error && (
                <div className="favorites-error">
                    ⚠️ {error}
                </div>
            )}


            {/* EMPTY */}

            {!error && favorites.length === 0 && (
                <div className="favorites-empty">

                    <div className="empty-heart">
                        🤍
                    </div>

                    <h2>
                        No Favorites Yet
                    </h2>

                    <p>
                        Save recipes you love and they
                        will appear here.
                    </p>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Explore Recipes →
                    </button>

                </div>
            )}


            {/* FAVORITES GRID */}

            {favorites.length > 0 && (
                <section className="favorites-grid">

                    {favorites.map((recipe) => (

                        <div
                            className="favorite-card"
                            key={recipe.id}
                        >

                            <div className="favorite-image-container">

                                <img
                                    src={recipe.image_url}
                                    alt={recipe.name}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://images.unsplash.com/photo-1498837167922-ddd27525d352";
                                    }}
                                />

                                <span
                                    className={
                                        recipe.diet_type === "Veg"
                                            ? "recipe-diet-badge veg"
                                            : "recipe-diet-badge nonveg"
                                    }
                                >
                                    {recipe.diet_type === "Veg"
                                        ? "🟢 Veg"
                                        : "🔴 Non-Veg"}
                                </span>

                                {recipe.is_quick && (
                                    <span className="quick-badge">
                                        ⚡ Quick
                                    </span>
                                )}

                            </div>


                            <div className="favorite-card-content">

                                <div className="recipe-card-tags">

                                    <span>
                                        {recipe.category}
                                    </span>

                                    <span>
                                        {recipe.meal_type}
                                    </span>

                                </div>


                                <h2>
                                    {recipe.name}
                                </h2>


                                <p className="favorite-description">
                                    {recipe.description}
                                </p>


                                <div className="favorite-nutrition">

                                    <span>
                                        🔥 {recipe.calories} kcal
                                    </span>

                                    <span>
                                        💪 {recipe.protein}g protein
                                    </span>

                                    <span>
                                        ⏱️ {
                                            recipe.preparation_time +
                                            recipe.cooking_time
                                        } min
                                    </span>

                                </div>


                                <div className="favorite-actions">

                                    <button
                                        className="view-recipe-btn"
                                        onClick={() =>
                                            navigate(
                                                `/recipe/${recipe.id}`
                                            )
                                        }
                                    >
                                        View Recipe →
                                    </button>


                                    <button
                                        className="remove-favorite-btn"
                                        onClick={() =>
                                            removeFavorite(recipe.id)
                                        }
                                        title="Remove from favorites"
                                    >
                                        ❤️
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </section>
            )}

        </div>
    );
}

export default Favorites;