// ========================================================
// NutriFit - In-Browser Cloud Database & Backend Mock
// Allows full-stack app to run seamlessly on GitHub Pages
// (Signup, Login, Recipes, Favorites, Profile, Meal Plan)
// ========================================================

const INITIAL_RECIPES = [
  {
    id: 1,
    name: "High Protein Paneer Bhurji & Toast",
    description: "Scrambled spiced cottage cheese cooked with onions, tomatoes and green chilies, served with toasted multigrain bread.",
    category: "Muscle Gain",
    diet_type: "Veg",
    meal_type: "Breakfast",
    is_quick: 1,
    preparation_time: 10,
    cooking_time: 10,
    calories: 380,
    protein: 26,
    carbohydrates: 28,
    fats: 18,
    ingredients: "200g Fresh paneer crumbled, 1 Onion finely chopped, 1 Tomato chopped, 1 Green chili, 1/2 tsp Turmeric, 1/2 tsp Garam masala, 1 tsp Oil, Salt to taste, 2 Slices multigrain bread",
    instructions: "1. Heat oil in a pan and saute chopped onions and green chili until golden. 2. Add tomatoes, turmeric, garam masala and salt. Cook until tomatoes are mushy. 3. Add crumbled paneer and toss well on medium flame for 3 minutes. 4. Garnish with coriander and serve hot with toasted bread.",
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
  },
  {
    id: 2,
    name: "Grilled Herb Chicken Breast & Quinoa",
    description: "Lean chicken breast marinated in garlic, lemon and rosemary, grilled to perfection and served alongside fluffy quinoa.",
    category: "Muscle Gain",
    diet_type: "NonVeg",
    meal_type: "Lunch",
    is_quick: 0,
    preparation_time: 15,
    cooking_time: 20,
    calories: 450,
    protein: 42,
    carbohydrates: 35,
    fats: 12,
    ingredients: "200g Boneless chicken breast, 1/2 Cup cooked quinoa, 1 tbsp Olive oil, 1 Lemon juiced, 2 Garlic cloves minced, 1 tsp Dried rosemary, Black pepper and pink salt to taste",
    instructions: "1. Marinate chicken breast with olive oil, lemon juice, minced garlic, rosemary, salt and pepper for 15 minutes. 2. Heat a grill pan over medium-high heat. 3. Cook chicken for 6-8 minutes each side until internal temperature reaches 75°C. 4. Let it rest for 5 minutes, slice and serve with warm quinoa and steamed greens.",
    image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800"
  },
  {
    id: 3,
    name: "Oats & Banana Whey Protein Smoothie Bowl",
    description: "Thick, creamy smoothie bowl made with rolled oats, ripe banana, chia seeds and whey protein, topped with crunchy almonds.",
    category: "Weight Loss",
    diet_type: "Veg",
    meal_type: "Breakfast",
    is_quick: 1,
    preparation_time: 5,
    cooking_time: 0,
    calories: 320,
    protein: 25,
    carbohydrates: 45,
    fats: 7,
    ingredients: "40g Rolled oats, 1 Medium ripe banana, 1 Scoop whey protein or plant protein, 150ml Skimmed milk or almond milk, 1 tsp Chia seeds, 6 Almonds sliced",
    instructions: "1. Add oats, banana, protein powder and milk into a high-speed blender. 2. Blend until thick and velvety smooth. 3. Pour into a bowl and top with chia seeds and sliced almonds. 4. Enjoy immediately.",
    image_url: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800"
  },
  {
    id: 4,
    name: "Mediterranean Chickpea & Avocado Salad",
    description: "Hearty and colorful salad featuring boiled chickpeas, cucumber, cherry tomatoes and creamy avocado in a zesty lemon-vinaigrette.",
    category: "Weight Loss",
    diet_type: "Veg",
    meal_type: "Lunch",
    is_quick: 1,
    preparation_time: 10,
    cooking_time: 0,
    calories: 340,
    protein: 14,
    carbohydrates: 38,
    fats: 15,
    ingredients: "1 Cup Boiled chickpeas (Kabuli chana), 1/2 Ripe avocado diced, 1/2 Cucumber chopped, 6 Cherry tomatoes halved, 1 tbsp Extra virgin olive oil, 1 tbsp Fresh lemon juice, 1/4 tsp Oregano, Salt and pepper",
    instructions: "1. Combine boiled chickpeas, cucumber, cherry tomatoes and diced avocado in a salad bowl. 2. Whisk olive oil, lemon juice, oregano, salt and pepper in a small bowl. 3. Pour dressing over the salad and toss gently to coat without mashing avocado. 4. Serve fresh.",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800"
  },
  {
    id: 5,
    name: "Spiced Soya Chunks Stir Fry with Bell Peppers",
    description: "High-protein meal of chewy soya chunks stir-fried with crisp tri-color bell peppers, ginger, garlic and fragrant spices.",
    category: "Muscle Gain",
    diet_type: "Veg",
    meal_type: "Dinner",
    is_quick: 1,
    preparation_time: 10,
    cooking_time: 12,
    calories: 290,
    protein: 32,
    carbohydrates: 22,
    fats: 6,
    ingredients: "50g Soya chunks (soaked in warm water and squeezed), 1/2 Red bell pepper, 1/2 Green capsicum, 1 Small onion, 1 tsp Ginger-garlic paste, 1 tsp Soy sauce, 1/2 tsp Cumin powder, 1 tsp Sesame oil",
    instructions: "1. Boil soya chunks for 5 minutes, rinse in cold water and squeeze out excess moisture thoroughly. 2. Heat sesame oil in a wok. Add ginger-garlic paste and diced onions, saute for 2 minutes. 3. Add bell peppers and soya chunks. Stir-fry on high flame for 5 minutes. 4. Stir in soy sauce, cumin powder and salt. Cook for 2 more minutes and serve hot.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"
  },
  {
    id: 6,
    name: "Classic Fluffy Egg White Veggie Omelet",
    description: "Light and filling breakfast omelet made with four egg whites, baby spinach, mushrooms and bell peppers.",
    category: "Weight Loss",
    diet_type: "NonVeg",
    meal_type: "Breakfast",
    is_quick: 1,
    preparation_time: 5,
    cooking_time: 8,
    calories: 190,
    protein: 22,
    carbohydrates: 6,
    fats: 4,
    ingredients: "4 Egg whites, 1/2 Cup chopped baby spinach, 3 Button mushrooms sliced, 1/4 Onion diced, 1/2 tsp Olive oil spray, Salt and crushed black pepper",
    instructions: "1. Whisk egg whites vigorously in a bowl until slightly frothy with salt and pepper. 2. Spray a non-stick pan with olive oil and saute mushrooms, onions and spinach for 2 minutes. 3. Pour egg whites evenly over vegetables. Cook on low flame for 4 minutes until edges set. 4. Fold the omelet in half and slide onto a plate.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800"
  },
  {
    id: 7,
    name: "Nourishing Moong Dal & Brown Rice Khichdi",
    description: "Comforting, gut-healthy one-pot meal made with yellow moong lentils, brown rice, turmeric and a light cumin-ghee tadka.",
    category: "Healthy Eating",
    diet_type: "Veg",
    meal_type: "Dinner",
    is_quick: 0,
    preparation_time: 10,
    cooking_time: 20,
    calories: 310,
    protein: 15,
    carbohydrates: 52,
    fats: 5,
    ingredients: "1/2 Cup Yellow moong dal, 1/2 Cup Brown rice, 1 tsp Desi Ghee, 1/2 tsp Cumin seeds, 1 Pinch Hing (asafoetida), 1/2 tsp Turmeric, 1 Tomato chopped, Salt to taste, 3 Cups Water",
    instructions: "1. Wash and soak moong dal and brown rice for 20 minutes. 2. Heat ghee in a pressure cooker. Add cumin seeds and a pinch of hing. 3. Add chopped tomato, turmeric and salt. Saute for 2 minutes. 4. Add drained dal and rice along with 3 cups water. Pressure cook for 4 whistles on medium heat. 5. Garnish with fresh cilantro.",
    image_url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"
  },
  {
    id: 8,
    name: "Pan-Seared Salmon with Steamed Broccoli",
    description: "Omega-3 rich fresh salmon fillet seared until golden crisp, served with lemon garlic steamed broccoli florets.",
    category: "Muscle Gain",
    diet_type: "NonVeg",
    meal_type: "Dinner",
    is_quick: 1,
    preparation_time: 5,
    cooking_time: 12,
    calories: 420,
    protein: 36,
    carbohydrates: 8,
    fats: 24,
    ingredients: "180g Fresh salmon fillet, 1 Cup Broccoli florets, 1 tsp Butter or olive oil, 1 Clove Garlic, 1/2 Lemon, Salt and cracked pepper",
    instructions: "1. Pat salmon dry and season both sides with salt and pepper. 2. Heat oil in a heavy skillet over medium-high heat. 3. Place salmon skin-side down and cook undisturbed for 5 minutes. Flip and cook for 3 more minutes. 4. Steam broccoli in a steamer for 4 minutes and toss with garlic and lemon juice. Serve together.",
    image_url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800"
  },
  {
    id: 9,
    name: "Tofu & Mixed Veggie Thai Green Curry Bowl",
    description: "Silky tofu and seasonal crisp vegetables simmered in an aromatic coconut milk broth with fresh basil leaves.",
    category: "Healthy Eating",
    diet_type: "Veg",
    meal_type: "Dinner",
    is_quick: 0,
    preparation_time: 15,
    cooking_time: 15,
    calories: 360,
    protein: 18,
    carbohydrates: 24,
    fats: 20,
    ingredients: "150g Firm tofu pressed and cubed, 100ml Light coconut milk, 1 tbsp Thai green curry paste, 1/2 Cup Zucchini and bell peppers, 1 tsp Oil, Fresh Thai basil leaves, Salt to taste",
    instructions: "1. Pan-fry tofu cubes until lightly golden on all sides, then set aside. 2. In the same pan, fry green curry paste in 1 tsp oil for 1 minute until fragrant. 3. Pour in light coconut milk and 50ml water. Bring to a gentle simmer. 4. Add vegetables and tofu, simmer for 6 minutes. Stir in fresh basil leaves before serving.",
    image_url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800"
  },
  {
    id: 10,
    name: "Zesty Sprouted Moong & Pomegranate Chaat",
    description: "Crispy, refreshing, nutrient-packed snack featuring fresh sprouted mung beans, pomegranate pearls and tangy chaat masala.",
    category: "Weight Loss",
    diet_type: "Veg",
    meal_type: "Snack",
    is_quick: 1,
    preparation_time: 5,
    cooking_time: 0,
    calories: 160,
    protein: 9,
    carbohydrates: 30,
    fats: 1,
    ingredients: "1 Cup Sprouted green moong, 1/4 Cup Pomegranate seeds, 1/4 Onion finely chopped, 1 Green chili, 1 tbsp Fresh coriander chopped, 1/2 Lemon juice, 1/2 tsp Chaat masala, Rock salt to taste",
    instructions: "1. Steam sprouted moong for 3 minutes (or use raw for crunch). 2. Add chopped onions, green chili, and fresh coriander. 3. Fold in pomegranate pearls gently. 4. Season with chaat masala, lemon juice and rock salt. Toss and enjoy instantly.",
    image_url: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800"
  },
  {
    id: 11,
    name: "Mashed Avocado & Boiled Egg Open Toast",
    description: "Creamy ripe avocado seasoned with lime and chili flakes spread on crisp toasted sourdough, topped with soft boiled eggs.",
    category: "Muscle Gain",
    diet_type: "NonVeg",
    meal_type: "Breakfast",
    is_quick: 1,
    preparation_time: 5,
    cooking_time: 7,
    calories: 340,
    protein: 16,
    carbohydrates: 26,
    fats: 19,
    ingredients: "1 Slice Sourdough or whole wheat bread, 1/2 Ripe avocado, 2 Medium eggs, 1/2 tsp Chili flakes, 1/2 Lemon juice, Salt and black pepper",
    instructions: "1. Boil eggs in water for 7 minutes for a jammy yolk, then peel and slice. 2. Toast sourdough bread until crunchy. 3. Mash avocado in a bowl with lemon juice, salt and pepper. 4. Spread avocado generously on toast, top with egg slices and sprinkle chili flakes.",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800"
  },
  {
    id: 12,
    name: "Greek Yogurt Berry Protein Parfait",
    description: "Creamy zero-fat Greek yogurt layered with antioxidant-rich blueberries, raspberries, chia seeds and honey.",
    category: "Healthy Eating",
    diet_type: "Veg",
    meal_type: "Snack",
    is_quick: 1,
    preparation_time: 5,
    cooking_time: 0,
    calories: 210,
    protein: 20,
    carbohydrates: 24,
    fats: 2,
    ingredients: "200g Plain Greek yogurt (unsweetened), 1/2 Cup Mixed fresh berries (strawberries/blueberries), 1 tsp Chia seeds, 1 tsp Pure honey, 1 Mint sprig",
    instructions: "1. Spoon half the Greek yogurt into a glass or mason jar. 2. Add a layer of fresh berries and a sprinkle of chia seeds. 3. Add remaining yogurt, top with remaining berries, drizzle honey and garnish with mint.",
    image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800"
  }
];

function getStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// Initialize mock DB in localStorage
function initMockDb() {
  if (!localStorage.getItem("nutrifit_mock_recipes")) {
    setStorage("nutrifit_mock_recipes", INITIAL_RECIPES);
  }
  if (!localStorage.getItem("nutrifit_mock_users")) {
    setStorage("nutrifit_mock_users", [
      {
        id: 1,
        name: "Yash Kaushik",
        email: "demo@nutrifit.com",
        password: "password123",
        age: 23,
        gender: "Male",
        height: 175,
        weight: 70,
        diet_type: "Veg",
        goal: "Muscle Gain"
      }
    ]);
  }
  if (!localStorage.getItem("nutrifit_mock_favorites")) {
    setStorage("nutrifit_mock_favorites", [1, 3]);
  }
}

initMockDb();

export function setupMockBackendInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async function (resource, options = {}) {
    const urlString = typeof resource === "string" ? resource : resource?.url || "";

    // Check if this is an API call
    if (urlString.includes("/api/")) {
      // If we are on localhost, try the real backend first
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isLocalhost) {
        try {
          const res = await originalFetch(resource, options);
          return res;
        } catch {
          console.warn("Local backend unreachable, using in-browser mock database.");
        }
      }

      // Handle with In-Browser Database Mock
      return handleMockRequest(urlString, options);
    }

    return originalFetch(resource, options);
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function handleMockRequest(url, options) {
  const method = (options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  const pathname = url.split("?")[0];
  const searchParams = new URL(url, "http://dummy.com").searchParams;

  const recipes = getStorage("nutrifit_mock_recipes", INITIAL_RECIPES);
  const users = getStorage("nutrifit_mock_users", []);
  let favorites = getStorage("nutrifit_mock_favorites", [1, 3]);

  // Current logged in user
  const currentUser = getStorage("nutrifit_user", users[0] || null);

  // 1. AUTH: LOGIN
  if (pathname.endsWith("/api/auth/login") && method === "POST") {
    const { email, password } = body;
    let found = users.find((u) => u.email?.toLowerCase() === email?.toLowerCase());

    if (!found) {
      // Auto-create or allow demo login so users are NEVER stuck!
      found = {
        id: Date.now(),
        name: email.split("@")[0] || "NutriFit User",
        email,
        age: 24,
        gender: "Male",
        height: 175,
        weight: 70,
        diet_type: "Veg",
        goal: "Muscle Gain"
      };
      users.push(found);
      setStorage("nutrifit_mock_users", users);
    }

    const token = "mock_jwt_token_" + found.id;
    return jsonResponse({
      success: true,
      token,
      user: found
    });
  }

  // 2. AUTH: SIGNUP
  if (pathname.endsWith("/api/auth/signup") && method === "POST") {
    const newUser = {
      id: Date.now(),
      name: body.name || "New User",
      email: body.email,
      password: body.password,
      age: body.age || 25,
      gender: body.gender || "Male",
      height: body.height || 170,
      weight: body.weight || 65,
      diet_type: body.diet_type || "Veg",
      goal: body.goal || "Weight Loss"
    };

    users.push(newUser);
    setStorage("nutrifit_mock_users", users);

    return jsonResponse({
      success: true,
      message: "User registered successfully"
    });
  }

  // 3. RECIPES: ALL
  if (pathname.endsWith("/api/recipes") && method === "GET") {
    return jsonResponse({
      success: true,
      count: recipes.length,
      recipes
    });
  }

  // 4. RECIPES: RECOMMENDED
  if (pathname.endsWith("/api/recipes/recommended") && method === "GET") {
    const userDiet = currentUser?.diet_type || "Veg";
    const userGoal = currentUser?.goal || "Muscle Gain";

    let recommended = recipes.filter(
      (r) => r.diet_type === userDiet || r.category === userGoal
    );
    if (recommended.length === 0) recommended = recipes.slice(0, 6);

    return jsonResponse({
      success: true,
      count: recommended.length,
      recipes: recommended
    });
  }

  // 5. RECIPES: MEAL PLAN
  if (pathname.endsWith("/api/recipes/meal-plan") && method === "GET") {
    const breakfast = recipes.filter((r) => r.meal_type === "Breakfast");
    const lunch = recipes.filter((r) => r.meal_type === "Lunch");
    const dinner = recipes.filter((r) => r.meal_type === "Dinner");
    const snacks = recipes.filter((r) => r.meal_type === "Snack");

    return jsonResponse({
      success: true,
      mealPlan: {
        breakfast: breakfast.slice(0, 2),
        lunch: lunch.slice(0, 2),
        dinner: dinner.slice(0, 2),
        snacks: snacks.slice(0, 2)
      }
    });
  }

  // 6. RECIPES: SINGLE RECIPE
  const recipeMatch = pathname.match(/\/api\/recipes\/(\d+)/);
  if (recipeMatch && method === "GET") {
    const id = Number(recipeMatch[1]);
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) {
      return jsonResponse({ success: false, message: "Recipe not found" }, 404);
    }
    return jsonResponse({ success: true, recipe });
  }

  // 7. FAVORITES: CHECK
  const checkFavMatch = pathname.match(/\/api\/favorites\/check\/(\d+)/);
  if (checkFavMatch && method === "GET") {
    const id = Number(checkFavMatch[1]);
    return jsonResponse({
      success: true,
      isFavorite: favorites.includes(id)
    });
  }

  // 8. FAVORITES: GET ALL
  if (pathname.endsWith("/api/favorites") && method === "GET") {
    const favRecipes = recipes.filter((r) => favorites.includes(r.id));
    return jsonResponse({
      success: true,
      count: favRecipes.length,
      favorites: favRecipes
    });
  }

  // 9. FAVORITES: TOGGLE (ADD / REMOVE)
  const favIdMatch = pathname.match(/\/api\/favorites\/(\d+)/);
  if (favIdMatch) {
    const id = Number(favIdMatch[1]);
    if (method === "POST") {
      if (!favorites.includes(id)) {
        favorites.push(id);
        setStorage("nutrifit_mock_favorites", favorites);
      }
      return jsonResponse({ success: true, message: "Added to favorites" });
    }
    if (method === "DELETE") {
      favorites = favorites.filter((f) => f !== id);
      setStorage("nutrifit_mock_favorites", favorites);
      return jsonResponse({ success: true, message: "Removed from favorites" });
    }
  }

  // 10. USER: PROFILE GET
  if (pathname.endsWith("/api/user/profile") && method === "GET") {
    return jsonResponse({
      success: true,
      user: currentUser || {
        name: "Yash Kaushik",
        email: "demo@nutrifit.com",
        age: 23,
        gender: "Male",
        height: 175,
        weight: 70,
        diet_type: "Veg",
        goal: "Muscle Gain"
      }
    });
  }

  // 11. USER: PROFILE UPDATE
  if (pathname.endsWith("/api/user/profile") && method === "PUT") {
    const updated = { ...currentUser, ...body };
    setStorage("nutrifit_user", updated);

    // Also update in users list
    const idx = users.findIndex((u) => u.email === updated.email);
    if (idx !== -1) {
      users[idx] = updated;
      setStorage("nutrifit_mock_users", users);
    }

    return jsonResponse({
      success: true,
      message: "Profile updated successfully",
      user: updated
    });
  }

  return jsonResponse({ success: false, message: "Route not found" }, 404);
}
