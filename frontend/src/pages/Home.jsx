import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="app">

            <nav className="navbar">

                <div className="logo">
                    <span className="logo-icon">N</span>
                    Nutri<span>Fit</span>
                </div>

                <div className="nav-links">
                    <Link to="/login">Login</Link>

                    <Link
                        to="/signup"
                        className="nav-button"
                    >
                        Get Started
                    </Link>
                </div>

            </nav>


            <main className="hero">

                <div className="hero-content">

                    <div className="badge">
                        ✦ Smart Nutrition Platform
                    </div>

                    <h1>
                        Eat Better.
                        <br />
                        <span>Live Stronger.</span>
                    </h1>

                    <p>
                        Your personalized nutrition companion for
                        weight loss, muscle gain and healthier eating.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/signup"
                            className="primary-button"
                        >
                            Start Your Journey
                            <span>→</span>
                        </Link>

                        <Link
                            to="/login"
                            className="secondary-button"
                        >
                            I Already Have an Account
                        </Link>

                    </div>

                    <div className="hero-stats">

                        <div>
                            <strong>100+</strong>
                            <span>Healthy Recipes</span>
                        </div>

                        <div>
                            <strong>2</strong>
                            <span>Fitness Goals</span>
                        </div>

                        <div>
                            <strong>24/7</strong>
                            <span>Food Ideas</span>
                        </div>

                    </div>

                </div>


                <div className="hero-visual">

                    <div className="glow"></div>

                    <div className="nutrition-card">

                        <div className="card-top">
                            <span>Today's Focus</span>
                            <span>✦</span>
                        </div>

                        <div className="nutrition-icon">
                            🥗
                        </div>

                        <h3>
                            Personalized Nutrition
                        </h3>

                        <p>
                            Recipes based on your goal,
                            body and food preference.
                        </p>

                        <div className="mini-progress">
                            <div></div>
                        </div>

                        <small>
                            Your healthy journey starts here
                        </small>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Home;