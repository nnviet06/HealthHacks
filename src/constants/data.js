import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';

// existing mock data preserved as fallback
export const MOCK_DATA = [
  { id: 1, icon: "🐔", name: "Raw Chicken", description: "Tender chicken ready for your next delicious dish—but handle with care!", topic: "Ingredients", category: "Meat", dietary: ["All"], severity: "High" },
  { id: 2, icon: "🍣", name: "Salmon Fillet", description: "Fresh, juicy salmon perfect for grilling or pan-searing.", topic: "Ingredients", category: "Fish", dietary: ["All"], severity: "Medium" },
  { id: 3, icon: "🥛", name: "Almond Milk", description: "Creamy, nutty almond milk for your smoothies or morning coffee.", topic: "Ingredients", category: "Dairy", dietary: ["Vegan", "Vegetarian", "Dairy-Free"], severity: "Low" },
  { id: 4, icon: "🥚", name: "Free-Range Eggs", description: "Golden yolks ready for omelets, baking, or a sunny-side-up breakfast.", topic: "Ingredients", category: "Eggs", dietary: ["All"], severity: "Medium" },
  { id: 5, icon: "🥬", name: "Spinach", description: "Crisp, fresh spinach for salads, smoothies, or sautés.", topic: "Ingredients", category: "Vegetables", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 6, icon: "🍎", name: "Apple", description: "Sweet and crunchy apples for snacks, pies, or juice.", topic: "Ingredients", category: "Fruits", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 7, icon: "🥣", name: "Quinoa", description: "Nutty, fluffy quinoa for hearty bowls and healthy meals.", topic: "Ingredients", category: "Grains", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 8, icon: "🥜", name: "Walnuts", description: "Crunchy walnuts perfect for baking, salads, or a healthy snack.", topic: "Ingredients", category: "Nuts", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 9, icon: "🌱", name: "Chia Seeds", description: "Tiny seeds packed with power—perfect for puddings and smoothies.", topic: "Ingredients", category: "Seeds", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 10, icon: "🍃", name: "Basil", description: "Fresh basil leaves to brighten pasta, pizza, and sauces.", topic: "Ingredients", category: "Herbs", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 11, icon: "🌶️", name: "Black Pepper", description: "A pinch of pepper adds bold flavor to any dish.", topic: "Ingredients", category: "Spices", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 12, icon: "🥫", name: "Soy Sauce", description: "Savory soy sauce to elevate stir-fries, sushi, and marinades.", topic: "Ingredients", category: "Condiments", dietary: ["Vegan", "Vegetarian", "Gluten-Free"], severity: "Low" },
  { id: 13, icon: "🍊", name: "Orange Juice", description: "Freshly squeezed goodness for breakfast or a refreshing sip.", topic: "Ingredients", category: "Beverages", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Low" },
  { id: 14, icon: "🍔", name: "Vegan Burger", description: "Juicy, plant-based burger to satisfy your cravings guilt-free.", topic: "Recipes", category: "Meat", dietary: ["Vegan", "Vegetarian"], severity: "Low" },
  { id: 15, icon: "🍣", name: "Grilled Fish", description: "Perfectly grilled fish with a smoky, flavorful crust.", topic: "Recipes", category: "Fish", dietary: ["All"], severity: "Medium" },
  { id: 16, icon: "🥗", name: "Keto Salad", description: "Fresh, low-carb salad bursting with crunch and flavor.", topic: "Recipes", category: "Vegetables", dietary: ["Keto", "Gluten-Free", "Vegetarian"], severity: "Low" },
  { id: 17, icon: "🍹", name: "Fruit Smoothie", description: "Sweet, refreshing smoothies packed with vitamins and flavor.", topic: "Recipes", category: "Fruits", dietary: ["Vegan", "Vegetarian", "Gluten-Free"], severity: "Low" },
  { id: 18, icon: "🥖", name: "Gluten-Free Bread", description: "Soft, fluffy bread that’s perfect for sandwiches and toast.", topic: "Recipes", category: "Grains", dietary: ["Gluten-Free", "Vegetarian"], severity: "Low" },
  { id: 19, icon: "🥜", name: "Nut Bars", description: "Crunchy, energy-packed bars for snacks or post-workout fuel.", topic: "Recipes", category: "Nuts", dietary: ["Vegetarian", "Gluten-Free"], severity: "Low" },
  { id: 20, icon: "🍃", name: "Herb Pesto", description: "Aromatic basil pesto to drizzle over pasta, pizza, or sandwiches.", topic: "Recipes", category: "Herbs", dietary: ["Vegetarian", "Gluten-Free"], severity: "Low" },
  { id: 21, icon: "🍣", name: "Salmon Mercury", description: "Delicious salmon—but choose wisely to avoid mercury risk.", topic: "Food Contamination", category: "Fish", dietary: ["All"], severity: "High" },
  { id: 22, icon: "🧀", name: "Listeria in Cheese", description: "Cheese is tasty, but store it properly to stay safe.", topic: "Food Contamination", category: "Dairy", dietary: ["All"], severity: "High" },
  { id: 23, icon: "🥚", name: "Salmonella Eggs", description: "Eggs are breakfast staples—cook them thoroughly for safety.", topic: "Food Contamination", category: "Eggs", dietary: ["All"], severity: "High" },
  { id: 24, icon: "🥬", name: "Pesticides in Spinach", description: "Fresh spinach is delicious—wash well to keep it safe.", topic: "Food Contamination", category: "Vegetables", dietary: ["Vegan", "Vegetarian", "Gluten-Free", "Keto"], severity: "Medium" },
  { id: 25, icon: "🥫", name: "Botulism in Condiments", description: "Condiments add flavor—keep them sealed and stored properly.", topic: "Food Contamination", category: "Condiments", dietary: ["All"], severity: "High" },
];

// Try to fetch and map Firestore documents into the same shape as MOCK_DATA
export async function fetchFromFirestore(collectionName = "foods") {
  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    const items = snap.docs.map(doc => {
      const d = doc.data() || {};
      // map common field names into the shape your app expects
      return {
        id: d.id ?? d.Id ?? doc.id,
        icon: d.icon ?? d.Icon ?? "🍽️",
        name: d.name ?? d.Name ?? d.title ?? "Unknown",
        description: d.description ?? d.Description ?? d.summary ?? d.Facts?.cooking ?? "",
        topic: d.topic ?? d.Topic ?? "Ingredients",
        category: d.category ?? d.Category ?? "Other",
        dietary: Array.isArray(d.dietary) ? d.dietary : (d.dietary ? [d.dietary] : ["All"]),
        severity: d.severity ?? d.Severity ?? "Low",
      };
    });
    return items;
  } catch (err) {
    console.error("fetchFromFirestore error:", err);
    return [];
  }
}

// Public helper: return Firestore data when available, otherwise fallback to MOCK_DATA
export async function getAllData(options = { collectionName: "foods" }) {
  const firestoreItems = await fetchFromFirestore(options.collectionName);
  if (Array.isArray(firestoreItems) && firestoreItems.length > 0) {
    return firestoreItems;
  }
  return MOCK_DATA;
}

// Export DATA: prefer Firestore result, fallback to MOCK_DATA
// Note: this uses top-level await — make sure your build (Vite) supports it.
const _firestoreItems = await fetchFromFirestore("foods");
export const DATA = Array.isArray(_firestoreItems) && _firestoreItems.length ? _firestoreItems : MOCK_DATA;


