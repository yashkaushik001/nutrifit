import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mealPlan, setMealPlan] = useState(null);
    const [mealPlanLoading, setMealPlanLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [diet, setDiet] = useState("All");
    const [meal, setMeal] = useState("All");
    const [quickOnly, setQuickOnly] = useState(false);

    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const [recommendationLoading, setRecommendationLoading] = useState(true);
    const [recommendationError, setRecommendationError] = useState("");

    // Automatically uses:
    // Laptop -> http://localhost:5000
    // Phone  -> http://192.168.x.x:5000
    const API_BASE_URL = `http://${window.location.hostname}:5000`;

    useEffect(() => {
        const savedUser = localStorage.getItem("nutrifit_user");

        if (!savedUser) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(savedUser));

        fetchRecipes();
        fetchRecommendedRecipes();
        fetchMealPlan();
    }, [navigate]);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/recipes`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch recipes");
            }

            const data = await response.json();

            if (data.success) {
                setRecipes(data.recipes);
            } else {
                throw new Error(
                    data.message || "Failed to load recipes"
                );
            }

        } catch (err) {
            console.error("Recipes error:", err);
            setError("Recipes load nahi ho pa rahi hain.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMealPlan = async () => {
        try {
            setMealPlanLoading(true);

            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/recipes/meal-plan`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    cache: "no-store"
                }
            );

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to load meal plan"
                );
            }

            setMealPlan(data.mealPlan);

        } catch (error) {
            console.error("Meal plan error:", error);
        } finally {
            setMealPlanLoading(false);
        }
    };

    const fetchRecommendedRecipes = async () => {
        try {
            setRecommendationLoading(true);
            setRecommendationError("");

            const token = localStorage.getItem("nutrifit_token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/api/recipes/recommended`,
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
                    data.message || "Failed to load recommendations"
                );
            }

            if (data.success) {
                setRecommendedRecipes(data.recipes);
            }

        } catch (error) {
            console.error(
                "Recommendation error:",
                error
            );

            setRecommendationError(
                "Recommendations load nahi ho pa rahi hain."
            );
        } finally {
            setRecommendationLoading(false);
        }
    };

    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {

            const matchesSearch =
                recipe.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                recipe.description
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                recipe.category === category;

            const matchesDiet =
                diet === "All" ||
                recipe.diet_type === diet;

            const matchesMeal =
                meal === "All" ||
                recipe.meal_type === meal;

            const matchesQuick =
                !quickOnly ||
                Boolean(recipe.is_quick);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDiet &&
                matchesMeal &&
                matchesQuick
            );
        });
    }, [recipes, search, category, diet, meal, quickOnly]);

    const logout = () => {
        localStorage.removeItem("nutrifit_token");
        localStorage.removeItem("nutrifit_user");

        navigate("/login");
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-page">

            {/* NAVBAR */}
            <nav className="dashboard-nav">

                <div className="brand">
                    <span className="brand-icon">🥗</span>
                    <span>NutriFit</span>
                </div>

                <div className="nav-right">

                    <span className="welcome-small">
                        Hi, {user.name}
                    </span>

                    <button
                        className="favorites-nav-btn"
                        onClick={() => navigate("/favorites")}
                    >
                        ❤️ Favorites
                    </button>

                    <button
                        className="profile-nav-btn"
                        onClick={() => navigate("/profile")}
                    >
                        👤 Profile
                    </button>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* HERO */}
            <section className="dashboard-hero">

                <div>

                    <p className="hero-label">
                        YOUR PERSONAL NUTRITION DASHBOARD
                    </p>

                    <h1>
                        Welcome back,{" "}
                        <span>{user.name}</span> 👋
                    </h1>

                    <p>
                        Discover meals selected according to your
                        health goals and food preferences.
                    </p>

                </div>

                <div className="goal-badge">
                    🎯 {user.goal}
                </div>

            </section>


            {/* HEALTH STATS */}
            <section className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        ⚖️
                    </div>

                    <div>
                        <span>Weight</span>
                        <strong>{user.weight} kg</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        📏
                    </div>

                    <div>
                        <span>Height</span>
                        <strong>{user.height} cm</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🎂
                    </div>

                    <div>
                        <span>Age</span>
                        <strong>{user.age} years</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🥗
                    </div>

                    <div>
                        <span>Diet</span>
                        <strong>{user.diet_type}</strong>
                    </div>

                </div>

            </section>


            {/* BMI */}
            <section className="bmi-section">

                <div className="bmi-header">

                    <div>

                        <p className="bmi-label">
                            YOUR HEALTH
                        </p>

                        <h2>
                            BMI Analysis
                        </h2>

                        <p>
                            Based on your current height and weight
                        </p>

                    </div>

                    <div className="bmi-icon">
                        ⚖️
                    </div>

                </div>

                {user && user.height && user.weight && (
                    (() => {

                        const heightInMeters =
                            Number(user.height) / 100;

                        const bmi =
                            Number(user.weight) /
                            (heightInMeters * heightInMeters);

                        let bmiCategory = "";
                        let bmiMessage = "";

                        if (bmi < 18.5) {

                            bmiCategory = "Underweight";
                            bmiMessage =
                                "Consider a balanced calorie-rich diet.";

                        } else if (bmi < 25) {

                            bmiCategory = "Healthy";
                            bmiMessage =
                                "Great! Your BMI is in the healthy range.";

                        } else if (bmi < 30) {

                            bmiCategory = "Overweight";
                            bmiMessage =
                                "Focus on a balanced diet and regular activity.";

                        } else {

                            bmiCategory = "Obese";
                            bmiMessage =
                                "A balanced diet and regular activity are recommended.";

                        }

                        return (

                            <div className="bmi-content">

                                <div className="bmi-score-box">

                                    <span>
                                        Your BMI
                                    </span>

                                    <strong>
                                        {bmi.toFixed(1)}
                                    </strong>

                                    <small>
                                        {bmiCategory}
                                    </small>

                                </div>


                                <div className="bmi-details">

                                    <div className="bmi-detail-item">

                                        <span>
                                            Height
                                        </span>

                                        <strong>
                                            {user.height} cm
                                        </strong>

                                    </div>


                                    <div className="bmi-detail-item">

                                        <span>
                                            Weight
                                        </span>

                                        <strong>
                                            {user.weight} kg
                                        </strong>

                                    </div>


                                    <div className="bmi-detail-item">

                                        <span>
                                            Goal
                                        </span>

                                        <strong>
                                            {user.goal}
                                        </strong>

                                    </div>


                                    <p className="bmi-message">
                                        {bmiMessage}
                                    </p>

                                </div>

                            </div>

                        );

                    })()
                )}

            </section>


            {/* MEAL PLAN */}
            <section className="meal-plan-section">

                <div className="meal-plan-header">

                    <div>

                        <p className="meal-plan-label">
                            PERSONALIZED FOR YOU
                        </p>

                        <h2>
                            🍽️ Today's Meal Plan
                        </h2>

                        <p>
                            Meals selected according to your diet and fitness goal.
                        </p>

                    </div>

                </div>


                {mealPlanLoading ? (

                    <div className="meal-plan-loading">
                        Loading your meal plan...
                    </div>

                ) : mealPlan ? (

                    <div className="meal-plan-grid">

                        {/* BREAKFAST */}
                        <div className="meal-plan-card">

                            <div className="meal-plan-card-header">
                                <span>🌅</span>
                                <h3>Breakfast</h3>
                            </div>

                            {mealPlan.breakfast?.map((recipe) => (

                                <div
                                    className="meal-plan-recipe"
                                    key={recipe.id}
                                    onClick={() =>
                                        navigate(`/recipe/${recipe.id}`)
                                    }
                                >

                                    <img
                                        src={recipe.image_url}
                                        alt={recipe.name}
                                    />

                                    <div>

                                        <h4>
                                            {recipe.name}
                                        </h4>

                                        <p>
                                            {recipe.calories} kcal •{" "}
                                            {recipe.protein}g protein
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* LUNCH */}
                        <div className="meal-plan-card">

                            <div className="meal-plan-card-header">
                                <span>☀️</span>
                                <h3>Lunch</h3>
                            </div>

                            {mealPlan.lunch?.map((recipe) => (

                                <div
                                    className="meal-plan-recipe"
                                    key={recipe.id}
                                    onClick={() =>
                                        navigate(`/recipe/${recipe.id}`)
                                    }
                                >

                                    <img
                                        src={recipe.image_url}
                                        alt={recipe.name}
                                    />

                                    <div>

                                        <h4>
                                            {recipe.name}
                                        </h4>

                                        <p>
                                            {recipe.calories} kcal •{" "}
                                            {recipe.protein}g protein
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* DINNER */}
                        <div className="meal-plan-card">

                            <div className="meal-plan-card-header">
                                <span>🌙</span>
                                <h3>Dinner</h3>
                            </div>

                            {mealPlan.dinner?.map((recipe) => (

                                <div
                                    className="meal-plan-recipe"
                                    key={recipe.id}
                                    onClick={() =>
                                        navigate(`/recipe/${recipe.id}`)
                                    }
                                >

                                    <img
                                        src={recipe.image_url}
                                        alt={recipe.name}
                                    />

                                    <div>

                                        <h4>
                                            {recipe.name}
                                        </h4>

                                        <p>
                                            {recipe.calories} kcal •{" "}
                                            {recipe.protein}g protein
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>


                        {/* SNACKS */}
                        <div className="meal-plan-card">

                            <div className="meal-plan-card-header">
                                <span>🍎</span>
                                <h3>Snacks</h3>
                            </div>

                            {mealPlan.snacks?.map((recipe) => (

                                <div
                                    className="meal-plan-recipe"
                                    key={recipe.id}
                                    onClick={() =>
                                        navigate(`/recipe/${recipe.id}`)
                                    }
                                >

                                    <img
                                        src={recipe.image_url}
                                        alt={recipe.name}
                                    />

                                    <div>

                                        <h4>
                                            {recipe.name}
                                        </h4>

                                        <p>
                                            {recipe.calories} kcal •{" "}
                                            {recipe.protein}g protein
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                ) : (

                    <div className="meal-plan-loading">
                        Meal plan is not available right now.
                    </div>

                )}

            </section>


            {/* RECOMMENDED FOR YOU */}
            <section className="recommended-section">

                <div className="recommended-heading">

                    <div className="recommended-title">

                        <span className="recommended-icon">
                            ⭐
                        </span>

                        <div>

                            <p>
                                PERSONALIZED FOR YOU
                            </p>

                            <h2>
                                Recommended For You
                            </h2>

                            <span>
                                Recipes selected according to your diet and fitness goal.
                            </span>

                        </div>

                    </div>


                    <button
                        className="see-all-btn"
                        onClick={() => {

                            document
                                .getElementById("all-recipes")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                });

                        }}
                    >
                        See All Recipes →
                    </button>

                </div>


                {/* LOADING */}
                {recommendationLoading && (

                    <div className="recommendation-loading">

                        <div className="loader"></div>

                        <p>
                            Finding recipes for you...
                        </p>

                    </div>

                )}


                {/* ERROR */}
                {!recommendationLoading &&
                    recommendationError && (

                        <div className="recommendation-error">

                            ⚠️ {recommendationError}

                        </div>

                    )}


                {/* RECOMMENDED RECIPES */}
                {!recommendationLoading &&
                    !recommendationError &&
                    recommendedRecipes.length > 0 && (

                        <div className="recommended-grid">

                            {recommendedRecipes.map((recipe) => (

                                <div
                                    className="recommended-card"
                                    key={recipe.id}
                                >

                                    <div className="recommended-image">

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


                                    <div className="recommended-content">

                                        <div className="recipe-card-tags">

                                            <span>
                                                {recipe.category}
                                            </span>

                                            <span>
                                                {recipe.meal_type}
                                            </span>

                                        </div>


                                        <h3>
                                            {recipe.name}
                                        </h3>


                                        <p>
                                            {recipe.description}
                                        </p>


                                        <div className="recommended-info">

                                            <span>
                                                🔥 {recipe.calories} kcal
                                            </span>

                                            <span>
                                                💪 {recipe.protein}g protein
                                            </span>

                                            <span>
                                                ⏱️{" "}
                                                {recipe.preparation_time +
                                                    recipe.cooking_time}{" "}
                                                min
                                            </span>

                                        </div>


                                        <button
                                            className="recommended-view-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/recipe/${recipe.id}`
                                                )
                                            }
                                        >
                                            View Recipe →
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}


                {/* NO RECOMMENDATIONS */}
                {!recommendationLoading &&
                    !recommendationError &&
                    recommendedRecipes.length === 0 && (

                        <div className="recommendation-empty">

                            No matching recipes found for your current preferences.

                        </div>

                    )}

            </section>


            {/* ALL RECIPES */}
            <section
                className="recipe-section"
                id="all-recipes"
            >

                <div className="section-heading">

                    <div>

                        <p className="section-label">
                            EXPLORE YOUR FOOD
                        </p>

                        <h2>
                            Healthy Recipes 🍳
                        </h2>

                        <p>
                            Find delicious meals matching your
                            nutrition goals.
                        </p>

                    </div>

                    <div className="recipe-count">
                        {filteredRecipes.length} recipes
                    </div>

                </div>


                {/* SEARCH */}
                <div className="recipe-search">

                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {/* FILTERS */}
                <div className="recipe-filters">

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >

                        <option value="All">
                            All Goals
                        </option>

                        <option value="Weight Loss">
                            Weight Loss
                        </option>

                        <option value="Muscle Gain">
                            Muscle Gain
                        </option>

                    </select>


                    <select
                        value={diet}
                        onChange={(e) =>
                            setDiet(e.target.value)
                        }
                    >

                        <option value="All">
                            All Diets
                        </option>

                        <option value="Veg">
                            Veg
                        </option>

                        <option value="Non-Veg">
                            Non-Veg
                        </option>

                    </select>


                    <select
                        value={meal}
                        onChange={(e) =>
                            setMeal(e.target.value)
                        }
                    >

                        <option value="All">
                            All Meals
                        </option>

                        <option value="Breakfast">
                            Breakfast
                        </option>

                        <option value="Lunch">
                            Lunch
                        </option>

                        <option value="Dinner">
                            Dinner
                        </option>

                        <option value="Snack">
                            Snack
                        </option>

                    </select>


                    <button
                        className={
                            quickOnly
                                ? "quick-filter active"
                                : "quick-filter"
                        }
                        onClick={() =>
                            setQuickOnly(!quickOnly)
                        }
                    >
                        ⚡ Quick Recipes
                    </button>

                </div>


                {/* LOADING */}
                {loading && (

                    <div className="recipe-message">

                        <div className="loader"></div>

                        <p>
                            Loading delicious recipes...
                        </p>

                    </div>

                )}


                {/* ERROR */}
                {!loading && error && (

                    <div className="recipe-message error-message">

                        <p>
                            ❌ {error}
                        </p>

                        <button onClick={fetchRecipes}>
                            Try Again
                        </button>

                    </div>

                )}


                {/* NO RESULTS */}
                {!loading &&
                    !error &&
                    filteredRecipes.length === 0 && (

                        <div className="recipe-message">

                            <div className="empty-icon">
                                🍽️
                            </div>

                            <h3>
                                No recipes found
                            </h3>

                            <p>
                                Try changing your search or filters.
                            </p>

                        </div>

                    )}


                {/* RECIPE CARDS */}
                {!loading &&
                    !error &&
                    filteredRecipes.length > 0 && (

                        <div className="recipe-grid">

                            {filteredRecipes.map((recipe) => (

                                <article
                                    className="recipe-card"
                                    key={recipe.id}
                                >

                                    <div className="recipe-image-wrapper">

                                        <img
                                            src={recipe.image_url}
                                            alt={recipe.name}
                                            className="recipe-image"
                                            onError={(e) => {

                                                e.currentTarget.src =
                                                    "https://images.unsplash.com/photo-1498837167922-ddd27525d352";

                                            }}
                                        />

                                        <span
                                            className={
                                                recipe.diet_type === "Veg"
                                                    ? "diet-badge veg"
                                                    : "diet-badge nonveg"
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


                                    <div className="recipe-content">

                                        <div className="recipe-tags">

                                            <span>
                                                {recipe.category}
                                            </span>

                                            <span>
                                                {recipe.meal_type}
                                            </span>

                                        </div>


                                        <h3>
                                            {recipe.name}
                                        </h3>


                                        <p className="recipe-description">
                                            {recipe.description}
                                        </p>


                                        <div className="nutrition-row">

                                            <div>

                                                <strong>
                                                    {recipe.calories}
                                                </strong>

                                                <span>
                                                    {" "}kcal
                                                </span>

                                            </div>


                                            <div>

                                                <strong>
                                                    {recipe.protein}
                                                </strong>

                                                <span>
                                                    g protein
                                                </span>

                                            </div>


                                            <div>

                                                <strong>
                                                    {recipe.preparation_time +
                                                        recipe.cooking_time}
                                                </strong>

                                                <span>
                                                    {" "}min
                                                </span>

                                            </div>

                                        </div>


                                        <button
                                            className="view-recipe-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/recipe/${recipe.id}`
                                                )
                                            }
                                        >
                                            View Full Recipe →
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

            </section>

        </div>
    );
}

export default Dashboard;