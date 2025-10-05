import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';

// existing mock data preserved as fallback
export const MOCK_DATA = [
  {
      "id": 3,
      "icon": "🥛",
      "name": "Almond Milk",
      "description": "A creamy, nutty, dairy-free alternative for drinks and recipes.",
      "topic": "Ingredients",
      "category": "Dairy",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Dairy-Free"
      ],
      "severity": "Low",
      "details": {
          "ingredientsToAvoid": "Boiling, which can cause it to separate or scorch. Adding to highly acidic hot liquids (like coffee) can sometimes cause curdling.",
          "defrostingGuide": "Not typically frozen. If so, thaw in the refrigerator. Shake vigorously as separation will occur.",
          "cookingGuide": "Use as a 1:1 substitute for dairy milk in cooking and baking. Heats well but may not foam for lattes like dairy milk.",
          "pairingSuggestions": "Coffee, tea, smoothies, cereal, oatmeal, and in most vegan baking recipes.",
          "servingTips": "Use as a base for smoothies, with granola, or in a latte with syrup.",
          "healthBenefits": "Low in calories and saturated fat. Often fortified with Calcium and Vitamin D. A good source of Vitamin E.",
          "proTips": "Choose unsweetened versions for savory cooking to better control the final flavor of your dish.",
          "cautions": "People with tree nut allergies must avoid. Check labels for added sugars in sweetened versions.",
          "storageGuide": "Refrigerate after opening and check the expiration date. Unopened shelf-stable versions can be stored in the pantry for months."
      }
  },
  {
      "id": 6,
      "icon": "🍎",
      "name": "Apple",
      "description": "A versatile fruit for sweet and savory dishes, or a healthy snack.",
      "topic": "Ingredients",
      "category": "Fruits",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free"
      ],
      "severity": "Low",
      "details": {
          "ingredientsToAvoid": "Storing them with potatoes, which can cause the potatoes to sprout faster.",
          "servingTips": "Enjoyed raw as a snack, sliced thinly in salads, or baked into a warm dessert with a scoop of ice cream.",
          "defrostingGuide": "N/A for fresh apples. Thaw frozen slices in the refrigerator; they are best used for cooking or smoothies as their texture becomes soft.",
          "storageGuide": "Store in the crisper drawer of the refrigerator to keep them crisp for several weeks. Keep away from other produce as they release ethylene gas.",
          "proTips": "To prevent browning after slicing for a salad or fruit platter, toss the apple slices in a small amount of lemon juice.",
          "healthBenefits": "A great source of dietary fiber (especially pectin) and Vitamin C. Contains beneficial antioxidants.",
          "cautions": "The core and seeds should not be eaten, as the seeds contain small amounts of cyanide compounds.",
          "cookingGuide": "Excellent for baking in pies, crumbles, and cakes. Can be roasted alongside meats like pork or slow-cooked into applesauce.",
          "pairingSuggestions": "Cinnamon, caramel, sharp cheddar cheese, pork, and walnuts."
      }
  },
  {
      "id": 10,
      "icon": "🍃",
      "name": "Basil",
      "description": "A fragrant, sweet herb that is the star of pesto and many Italian dishes.",
      "topic": "Ingredients",
      "category": "Herbs",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Keto"
      ],
      "severity": "Low",
      "details": {
          "proTips": "To preserve a large harvest, blend the basil leaves with a small amount of olive oil and freeze the purée in ice cube trays for later use.",
          "storageGuide": "Do not refrigerate fresh basil, as the cold will turn the leaves black. Treat it like a bouquet of flowers: trim the stems and place it in a jar of water on your kitchen counter, away from direct sunlight.",
          "defrostingGuide": "N/A for fresh basil. Frozen basil cubes can be used directly in cooked dishes like soups and sauces.",
          "servingTips": "Tear the leaves instead of chopping to prevent bruising. Use it fresh over a margherita pizza, blended into pesto, or layered in a caprese salad.",
          "pairingSuggestions": "The classic partner for tomatoes. Also great with garlic, olive oil, mozzarella cheese, pasta, and strawberries.",
          "healthBenefits": "Contains antioxidants and has anti-inflammatory and antibacterial properties. It's also a good source of Vitamin K.",
          "cautions": "People on blood-thinning medication should be mindful of their Vitamin K intake from all sources, including basil.",
          "cookingGuide": "Add fresh basil at the very end of the cooking process. Heat destroys its delicate essential oils and flavor. For cold dishes, it can be used raw.",
          "ingredientsToAvoid": "Washing the leaves long before you are ready to use them. Adding it too early in the cooking process will kill its fresh flavor."
      }
  },
  {
      "id": 11,
      "icon": "🌶️",
      "name": "Black Pepper",
      "description": "The world's most traded spice, adding pungent heat to any dish.",
      "topic": "Ingredients",
      "category": "Spices",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Keto"
      ],
      "severity": "Low",
      "details": {
          "defrostingGuide": "N/A",
          "healthBenefits": "Contains piperine, a potent antioxidant that may improve the absorption of other nutrients (most famously, curcumin from turmeric) and offer anti-inflammatory benefits.",
          "proTips": "Invest in a good quality pepper mill. The difference in flavor between freshly ground peppercorns and pre-ground pepper is immense and will elevate your cooking.",
          "ingredientsToAvoid": "Using old, pre-ground pepper that has lost its aroma and tastes like dust.",
          "servingTips": "Always use freshly ground black pepper for the best flavor. It adds a final burst of aroma and complexity to a finished dish.",
          "cookingGuide": "Can be added during or after cooking. Adding it late in the process preserves more of its sharp, pungent flavor, while adding it early gives a milder, more blended flavor.",
          "cautions": "People with sensitive stomachs or severe acid reflux may find it irritating in very large amounts.",
          "storageGuide": "Store whole peppercorns in an airtight container away from heat and light. They will stay fresh and potent for years. Ground pepper loses its flavor much more quickly.",
          "pairingSuggestions": "Pairs with virtually all savory foods, including meats, fish, vegetables, soups, eggs, and salads."
      }
  },
  {
      "id": 25,
      "icon": "🥫",
      "name": "Botulism in Canned Goods",
      "description": "A rare but potentially fatal illness caused by a potent toxin from improperly preserved foods.",
      "topic": "Food Contamination",
      "category": "Condiments",
      "dietary": [
          "All"
      ],
      "severity": "High",
      "details": {
          "preventionAndTreatment": "Treatment requires immediate hospitalization and administration of an antitoxin. Prevention is critical: Never eat food from cans that are dented, bulging, rusted, or leaking. Follow strict, up-to-date procedures for home canning, as the toxin is destroyed by high heat.",
          "commonSymptoms": "Botulism is a neurotoxin. Symptoms include difficulty swallowing or speaking, facial weakness on both sides of the face, blurred or double vision, drooping eyelids, trouble breathing, and paralysis. It is a medical emergency that requires immediate care.",
          "causesAndRisks": "Caused by a toxin produced by the bacterium Clostridium botulinum. This bacterium is anaerobic (thrives in low-oxygen environments) and can produce the toxin in improperly canned, preserved, or fermented foods. Home-canned vegetables, cured pork, and smoked fish are common sources. Commercially, look out for damaged cans that are dented, bulging, or leaking."
      }
  },
  {
      "id": 9,
      "icon": "🌱",
      "name": "Chia Seeds",
      "description": "Tiny but mighty seeds that form a gel, perfect for puddings and smoothies.",
      "topic": "Ingredients",
      "category": "Seeds",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Keto"
      ],
      "severity": "Low",
      "details": {
          "storageGuide": "Store in an airtight container in a cool, dark, and dry place. They can last for several years.",
          "pairingSuggestions": "Excellent in smoothies, mixed into yogurt or oatmeal, and as a base for chia seed pudding with fruits and sweeteners.",
          "ingredientsToAvoid": "Eating large quantities of dry seeds followed by liquid, as they can expand rapidly and pose a choking hazard. Always mix them with liquid first.",
          "cookingGuide": "No cooking is required. Chia seeds are typically soaked in a liquid (like almond milk or water), where they absorb it and form a gel-like consistency. This is the basis for chia seed pudding.",
          "servingTips": "Use as a natural thickener for smoothies and sauces, or as the star ingredient in a vanilla or chocolate chia seed pudding.",
          "cautions": "People on blood pressure or blood sugar medication should consult a doctor, as chia seeds can have a lowering effect on both.",
          "defrostingGuide": "N/A",
          "healthBenefits": "An excellent source of fiber, Omega-3 fatty acids, and plant-based protein. Also rich in various minerals like calcium, manganese, and magnesium.",
          "proTips": "To create a vegan 'egg' for baking, mix 1 tablespoon of ground chia seeds with 2.5 tablespoons of water and let it sit for 5-10 minutes until it forms a gel."
      }
  },
  {
      "id": 4,
      "icon": "🥚",
      "name": "Free-Range Eggs",
      "description": "A versatile and complete protein source for any meal of the day.",
      "topic": "Ingredients",
      "category": "Eggs",
      "dietary": [
          "All"
      ],
      "severity": "Medium",
      "details": {
          "storageGuide": "Store in their original carton in the main part of the refrigerator (not the door). They will keep for 3-5 weeks.",
          "cookingGuide": "Cook until both the yolk and white are firm to prevent salmonella. Can be scrambled, fried, boiled, poached, or baked.",
          "proTips": "To check freshness, place an egg in a bowl of water. If it sinks and lays flat, it's very fresh. If it floats, it's old and should be discarded.",
          "pairingSuggestions": "Bacon, toast, cheese, spinach, mushrooms, and avocado.",
          "cautions": "People with egg allergies. Those monitoring cholesterol intake should consult their doctor.",
          "healthBenefits": "Excellent source of high-quality protein, Vitamin D, Vitamin B12, and choline for brain health.",
          "servingTips": "As a primary breakfast protein, in quiches, frittatas, or as a binder in meatballs and baked goods.",
          "ingredientsToAvoid": "Cracked or dirty eggs. Avoid consuming raw or undercooked, especially for high-risk individuals.",
          "defrostingGuide": "N/A. Eggs should not be frozen in their shells. Cracked eggs can be frozen in containers."
      }
  },
  {
      "id": 17,
      "icon": "🍹",
      "name": "Fruit Smoothie",
      "description": "A quick, refreshing, and highly customizable way to get your daily vitamins.",
      "topic": "Recipes",
      "category": "Fruits",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free"
      ],
      "severity": "Low",
      "details": {
          "preparationSteps": "Combine your choice of fruit (like bananas, berries, mango), a liquid (e.g., almond milk, water, coconut water), and any optional add-ins (e.g., spinach, protein powder, chia seeds, nut butter) in a high-speed blender. Blend until completely smooth.",
          "cautions": "Can be very high in sugar, even from natural sources. Be mindful of portion sizes and avoid adding extra sweeteners like honey or maple syrup if managing sugar intake.",
          "healthBenefits": "An easy and delicious way to consume multiple servings of fruits and vegetables. Can be high in vitamins, minerals, fiber, and antioxidants depending on the ingredients.",
          "proTips": "For a thick, creamy, ice-cream-like smoothie, always use at least one frozen ingredient, like a frozen banana or frozen berries. This eliminates the need for ice, which can water down the flavor.",
          "storageGuide": "Smoothies are best consumed immediately for maximum freshness and nutrient content. They can be stored in an airtight container in the refrigerator for up to 24 hours, but separation may occur and color may change. Shake well before drinking."
      }
  },
  {
      "id": 18,
      "icon": "🥖",
      "name": "Gluten-Free Bread",
      "description": "A delicious and essential bread alternative for those with celiac disease or gluten sensitivity.",
      "topic": "Recipes",
      "category": "Grains",
      "dietary": [
          "Gluten-Free",
          "Vegetarian"
      ],
      "severity": "Low",
      "details": {
          "healthBenefits": "Its primary benefit is allowing people with celiac disease or gluten intolerance to enjoy bread safely. The nutritional value varies widely based on the alternative flours used (e.g., rice, almond, tapioca).",
          "storageGuide": "Gluten-free bread can dry out or spoil faster than wheat-based bread. Store in an airtight container at room temperature for only 2-3 days. For long-term storage, freezing is highly recommended. You can toast slices directly from frozen.",
          "cautions": "Cross-contamination is a serious risk for people with celiac disease; ensure preparation surfaces and toasters are clean. Check labels, as some versions can be high in sugar, starches, or gums and low in fiber.",
          "proTips": "If you find your gluten-free bread is a bit dry or crumbly, lightly spraying it with water or brushing it with melted butter before toasting can help improve its texture.",
          "preparationSteps": "Typically purchased pre-made. For best results, gluten-free bread slices often have a better flavor and texture when toasted. It can be used for sandwiches, toast with toppings, or French toast just like regular bread."
      }
  },
  {
      "id": 15,
      "icon": "🍣",
      "name": "Grilled Fish",
      "description": "A light, healthy, and flavorful way to enjoy seafood with a smoky char.",
      "topic": "Recipes",
      "category": "Fish",
      "dietary": [
          "All"
      ],
      "severity": "Medium",
      "details": {
          "cautions": "Ensure fish is cooked to the proper internal temperature of 145°F to kill any harmful bacteria. Be aware of potential allergens if serving to others.",
          "preparationSteps": "Preheat grill to medium-high heat. Clean the grates thoroughly and oil them to prevent sticking. Pat fish fillets completely dry and season with salt, pepper, and herbs. Grill for 3-6 minutes per side, depending on thickness, flipping only once. Fish is done when it flakes easily with a fork and reaches 145°F.",
          "healthBenefits": "A great source of lean protein and heart-healthy Omega-3 fatty acids. Grilling is a low-fat cooking method that doesn't require much added oil.",
          "proTips": "For delicate fish like tilapia or flounder, use a fish basket or grill the fillets on a piece of foil to prevent them from breaking apart and falling through the grates.",
          "storageGuide": "Store cooked grilled fish in an airtight container in the refrigerator for up to 3 days. It's also great cold on top of a salad the next day."
      }
  },
  {
      "id": 20,
      "icon": "🍃",
      "name": "Herb Pesto",
      "description": "A vibrant, fresh, and versatile raw sauce to elevate pasta, sandwiches, and much more.",
      "topic": "Recipes",
      "category": "Herbs",
      "dietary": [
          "Vegetarian",
          "Gluten-Free"
      ],
      "severity": "Low",
      "details": {
          "preparationSteps": "Combine fresh basil leaves, garlic, toasted pine nuts, and grated Parmesan cheese in a food processor. Pulse until finely chopped. While the processor is running, slowly stream in high-quality extra virgin olive oil until the sauce is smooth. Season with salt and pepper.",
          "storageGuide": "Store in an airtight container in the refrigerator for up to a week. To prevent the top from browning due to oxidation, pour a thin layer of olive oil over the surface before sealing. Pesto also freezes very well for several months.",
          "proTips": "For a vegan version, substitute nutritional yeast for the Parmesan cheese to get a similar cheesy, umami flavor. You can also swap pine nuts for walnuts or almonds.",
          "healthBenefits": "Rich in antioxidants from basil and garlic. Olive oil provides healthy monounsaturated fats. Nuts add protein and healthy fats as well.",
          "cautions": "Traditional pesto contains nuts (pine nuts) and dairy (Parmesan cheese), which are common allergens. Can be high in calories and fat, so use in moderation."
      }
  },
  {
      "id": 16,
      "icon": "🥗",
      "name": "Keto Salad",
      "description": "A low-carb, high-fat salad packed with nutrients, fiber, and flavor.",
      "topic": "Recipes",
      "category": "Vegetables",
      "dietary": [
          "Keto",
          "Gluten-Free",
          "Vegetarian"
      ],
      "severity": "Low",
      "details": {
          "proTips": "Incorporate a variety of textures for a more satisfying salad: creamy avocado, crunchy nuts, crisp greens, and soft cheese.",
          "storageGuide": "Salads are best eaten fresh after dressing. If making ahead, store the dressing and other components separately from the leafy greens to prevent them from becoming wilted and soggy.",
          "cautions": "Ensure all added ingredients and dressings are genuinely low-carb and free of hidden sugars to maintain ketosis.",
          "healthBenefits": "Supports a ketogenic diet by being very low in net carbohydrates and high in healthy fats and fiber. Provides essential vitamins and minerals from the fresh vegetables.",
          "preparationSteps": "This is an assembly-only recipe. Combine a base of low-carb leafy greens (like spinach, arugula, or romaine) with high-fat ingredients like avocado, cheese (feta, goat cheese), nuts (almonds, walnuts), and seeds (chia, sunflower). Add a protein like grilled chicken or salmon. Dress with a high-fat, zero-sugar vinaigrette made from olive oil, lemon juice, or apple cider vinegar."
      }
  },
  {
      "id": 22,
      "icon": "🧀",
      "name": "Listeria in Soft Cheese",
      "description": "A dangerous bacterium that can grow in unpasteurized soft cheeses and at cold temperatures.",
      "topic": "Food Contamination",
      "category": "Dairy",
      "dietary": [
          "All"
      ],
      "severity": "High",
      "details": {
          "commonSymptoms": "Fever, muscle aches, nausea, and diarrhea. If the infection spreads to the nervous system, symptoms can include headache, stiff neck, confusion, loss of balance, and convulsions. It is especially dangerous for pregnant women (can cause miscarriage), newborns, the elderly, and the immunocompromised.",
          "causesAndRisks": "Listeria monocytogenes is a bacterium that can be found in soil, water, and some animals. It can contaminate soft cheeses (especially those made with unpasteurized milk like feta, brie, queso fresco), as well as other foods like deli meats, pâtés, and smoked seafood. Unlike many other bacteria, Listeria can grow and spread at refrigerator temperatures.",
          "preventionAndTreatment": "Treatment requires antibiotics. Prevention is crucial: high-risk groups should avoid unpasteurized soft cheeses, deli meats, and other high-risk foods. Always practice good food safety, including keeping the refrigerator at 40°F (4°C) or below and cleaning up spills promptly."
      }
  },
  {
      "id": 19,
      "icon": "🥜",
      "name": "Nut Bars",
      "description": "A convenient, homemade, and energy-boosting snack for on-the-go lifestyles.",
      "topic": "Recipes",
      "category": "Nuts",
      "dietary": [
          "Vegetarian",
          "Gluten-Free"
      ],
      "severity": "Low",
      "details": {
          "healthBenefits": "A good source of healthy fats, plant-based protein, and dietary fiber, which provides sustained energy rather than a quick sugar rush.",
          "storageGuide": "Store in an airtight container. They will last at room temperature for up to a week, or in the refrigerator for 2-3 weeks for better firmness.",
          "proTips": "Toasting the nuts and seeds for a few minutes in a dry pan before mixing them into the bars will significantly deepen their flavor and add extra crunch.",
          "preparationSteps": "Typically a no-bake recipe. In a bowl, mix your choice of nuts (almonds, walnuts), seeds (chia, sunflower), and a binder (like honey, maple syrup, or warmed nut butter). Add other ingredients like dried fruit or chocolate chips. Press the mixture firmly into a parchment-lined pan, chill in the refrigerator for at least an hour until firm, then slice into bars.",
          "cautions": "Must be avoided by people with nut allergies. Commercial versions can be high in hidden sugars and calories, so homemade is often a healthier option."
      }
  },
  {
      "id": 13,
      "icon": "🍊",
      "name": "Orange Juice",
      "description": "A classic breakfast beverage that's also a surprisingly useful ingredient in the kitchen.",
      "topic": "Ingredients",
      "category": "Beverages",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free"
      ],
      "severity": "Low",
      "details": {
          "cookingGuide": "The acidity and sweetness make it a great base for marinades, especially for pork and chicken, as it helps tenderize the meat. It can also be reduced down to create flavorful sauces and glazes for savory dishes.",
          "servingTips": "Best served chilled as a morning beverage or used as a liquid base for fruit smoothies.",
          "ingredientsToAvoid": "Using it in recipes with milk or cream without proper technique (tempering), as the acid can cause the dairy to curdle.",
          "proTips": "The zest of an orange (the outer peel) contains flavorful essential oils and can be added to recipes along with the juice for a more intense, complex citrus flavor.",
          "storageGuide": "Keep refrigerated at all times. Consume within 7-10 days of opening for store-bought juice. Freshly squeezed juice is best consumed within 2-3 days for maximum freshness and nutrient content.",
          "healthBenefits": "An excellent source of Vitamin C, a powerful antioxidant that supports the immune system. Also a good source of folate and potassium.",
          "pairingSuggestions": "A classic pairing with breakfast foods. In cooking, it pairs well with ginger, soy sauce, chicken, pork, and duck.",
          "defrostingGuide": "Thaw frozen concentrate or frozen juice in the refrigerator overnight.",
          "cautions": "It is high in natural sugar and calories. People with diabetes or those managing their weight should consume it in moderation. Always choose 100% juice with no added sugar."
      }
  },
  {
      "id": 24,
      "icon": "🥬",
      "name": "Pesticides in Spinach",
      "description": "Leafy greens can carry pesticide residues if not sourced or washed properly.",
      "topic": "Food Contamination",
      "category": "Vegetables",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Keto"
      ],
      "severity": "Medium",
      "details": {
          "causesAndRisks": "Pesticides are used in conventional farming to protect crops from insects and diseases. Leafy greens like spinach have a large surface area and a delicate structure that can retain these chemical residues. The Environmental Working Group (EWG) annually lists produce with the highest pesticide loads in its 'Dirty Dozen' guide, and spinach is frequently on that list.",
          "commonSymptoms": "Acute symptoms from pesticide residues on commercial produce are rare. The concern is primarily about long-term, chronic exposure to low levels of pesticides, which has been linked in some studies to various health issues. ",
          "preventionAndTreatment": "Prevention is the best approach. Wash spinach and other produce thoroughly under running water before eating. Peeling or trimming can also help for some fruits and vegetables. Buying certified organic produce can significantly reduce your exposure to synthetic pesticides."
      }
  },
  {
      "id": 7,
      "icon": "🥣",
      "name": "Quinoa",
      "description": "A nutritious, gluten-free seed that acts like a grain and is a complete protein.",
      "topic": "Ingredients",
      "category": "Grains",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free"
      ],
      "severity": "Low",
      "details": {
          "defrostingGuide": "N/A for dry quinoa. Cooked quinoa freezes well and can be thawed in the microwave or refrigerator.",
          "proTips": "For extra flavor, toast the rinsed quinoa in a dry pan for a few minutes until fragrant before adding the cooking liquid.",
          "storageGuide": "Store uncooked quinoa in an airtight container in a cool, dark place for up to a year. Cooked quinoa lasts for 3-5 days in the refrigerator.",
          "cookingGuide": "Always rinse thoroughly under cold water before cooking to remove natural saponins, which can cause a bitter taste. Use a 1:2 ratio of quinoa to liquid (water or broth). Bring to a boil, then simmer covered for about 15 minutes until the liquid is absorbed.",
          "cautions": "The high fiber content may be challenging for people with sensitive digestive systems if introduced too quickly.",
          "pairingSuggestions": "Excellent with roasted vegetables, black beans, corn, avocado, and a lemon vinaigrette.",
          "healthBenefits": "A complete protein, containing all nine essential amino acids. High in fiber, magnesium, B vitamins, iron, and potassium.",
          "servingTips": "Use as a base for grain bowls, a nutritious side dish instead of rice, or add to salads and soups for extra protein and texture.",
          "ingredientsToAvoid": "Forgetting to rinse before cooking is the most common mistake, leading to a bitter final product."
      }
  },
  {
      "id": 1,
      "icon": "🐔",
      "name": "Raw Chicken",
      "description": "A versatile protein staple—cook safely for a delicious meal.",
      "topic": "Ingredients",
      "category": "Meat",
      "dietary": [
          "All"
      ],
      "severity": "High",
      "details": {
          "proTips": "Pat chicken dry with paper towels before cooking for crispier skin. Brining for 30-60 minutes results in a juicier final product.",
          "pairingSuggestions": "Pairs well with rosemary, thyme, garlic, lemon, potatoes, and most vegetables.",
          "ingredientsToAvoid": "Cross-contamination is the biggest risk. Use separate cutting boards and utensils. Never wash raw chicken as it can splash bacteria.",
          "storageGuide": "Store in the refrigerator at or below 40°F (4°C) for 1-2 days on the lowest shelf. Freeze for up to 9 months in airtight packaging.",
          "healthBenefits": "Excellent source of lean protein for muscle growth and repair. Rich in niacin (Vitamin B3) and selenium.",
          "cautions": "The immunocompromised, elderly, and young children are more susceptible to Salmonella if undercooked.",
          "defrostingGuide": "Safest in the refrigerator (24 hours per 5 lbs). For a quick thaw, use a sealed bag in cold water, changing water every 30 mins. Cook immediately after microwave defrosting.",
          "servingTips": "Great with roasted vegetables, rice pilaf, mashed potatoes, or fresh salads.",
          "cookingGuide": "Must be cooked to a minimum internal temperature of 165°F (74°C). Use a meat thermometer for accuracy. Suitable for baking, grilling, frying, and roasting."
      }
  },
  {
      "id": 2,
      "icon": "🍣",
      "name": "Salmon Fillet",
      "description": "A heart-healthy fish, perfect for a quick and elegant meal.",
      "topic": "Ingredients",
      "category": "Fish",
      "dietary": [
          "All"
      ],
      "severity": "Medium",
      "details": {
          "storageGuide": "Store fresh salmon in the fridge for only 1-2 days. Cooked salmon lasts 3-4 days. Freeze for up to 3 months for best quality.",
          "servingTips": "Serve with steamed asparagus, roasted new potatoes, or a light cucumber and dill salad.",
          "ingredientsToAvoid": "Overcooking, which makes the fillet dry. Avoid heavy sauces that overpower its delicate flavor.",
          "cautions": "People with fish allergies. Pregnant women should choose low-mercury varieties.",
          "defrostingGuide": "Thaw in the refrigerator overnight. For a quick thaw, place in a sealed bag and submerge in cold water for 1-2 hours.",
          "healthBenefits": "Extremely rich in Omega-3 fatty acids for brain and heart health. High in protein and Vitamin D.",
          "cookingGuide": "Cook to an internal temperature of 145°F (63°C). The flesh should be opaque and flake easily. Ideal for grilling, baking, or pan-searing.",
          "proTips": "For crispy skin, sear skin-side down in a hot, oiled pan and press gently with a spatula. Do not flip until the skin releases easily.",
          "pairingSuggestions": "Lemon, dill, asparagus, broccoli, quinoa, and light white wines."
      }
  },
  {
      "id": 21,
      "icon": "🍣",
      "name": "Salmon Mercury Contamination",
      "description": "Understanding the risk of mercury contamination in a popular, healthy fish.",
      "topic": "Food Contamination",
      "category": "Fish",
      "dietary": [
          "All"
      ],
      "severity": "High",
      "details": {
          "commonSymptoms": "Mercury is a neurotoxin. Chronic high-level exposure can lead to neurological issues, including memory problems, tremors, numbness in hands and feet, and vision changes. It is particularly dangerous for the developing nervous systems of fetuses and young children.",
          "causesAndRisks": "Mercury is a naturally occurring heavy metal that is released into the environment through pollution. It accumulates in aquatic ecosystems and builds up in fish, a process called bioaccumulation. Larger, predatory fish that live longer (like shark, swordfish, and some types of tuna) have the highest levels. Salmon is generally considered a lower-mercury fish.",
          "preventionAndTreatment": "Prevention is key. Limit consumption of high-mercury fish. The FDA recommends that pregnant women, those who might become pregnant, and young children eat 2-3 servings of a variety of low-mercury fish (like salmon, shrimp, cod, and canned light tuna) per week. Treatment for severe mercury poisoning requires medical intervention."
      }
  },
  {
      "id": 23,
      "icon": "🥚",
      "name": "Salmonella in Eggs",
      "description": "A very common cause of food poisoning, often linked to raw or undercooked eggs.",
      "topic": "Food Contamination",
      "category": "Eggs",
      "dietary": [
          "All"
      ],
      "severity": "High",
      "details": {
          "causesAndRisks": "Salmonella bacteria can be found on the outside of eggshells or, less commonly, inside the egg itself if the hen was infected. Consuming raw or lightly cooked eggs is the primary risk. This includes foods like homemade mayonnaise, Caesar dressing, hollandaise sauce, tiramisu, or sunny-side-up eggs with runny yolks.",
          "commonSymptoms": "Symptoms typically start 6 hours to 6 days after infection and include diarrhea, fever, and stomach cramps. Most people recover within a week without specific treatment.",
          "preventionAndTreatment": "Most cases resolve on their own with rest and plenty of fluids. Severe cases may require medical attention or antibiotics. Prevention: Cook eggs until both yolks and whites are firm. Use pasteurized eggs for recipes that call for raw eggs. Keep eggs refrigerated and wash hands and surfaces after contact with raw eggs."
      }
  },
  {
      "id": 12,
      "icon": "🥫",
      "name": "Soy Sauce",
      "description": "A staple of East Asian cuisine, providing a distinct salty and umami flavor.",
      "topic": "Ingredients",
      "category": "Condiments",
      "dietary": [
          "Vegan",
          "Vegetarian"
      ],
      "severity": "Low",
      "details": {
          "pairingSuggestions": "Essential for rice, noodles, and sushi. A great base for marinades for tofu, chicken, or beef. Pairs well with ginger, garlic, and sesame oil.",
          "ingredientsToAvoid": "Adding too much at once, as its high sodium content can easily make a dish too salty. Taste as you go.",
          "servingTips": "Use as a dipping sauce for dumplings and sushi, or as the primary flavor base for a homemade teriyaki sauce.",
          "storageGuide": "Store in a cool, dark place like a pantry. While it is shelf-stable, refrigerating after opening is recommended to maintain the best quality and flavor over a longer period.",
          "cautions": "Extremely high in sodium, so it should be used in moderation by people with high blood pressure. Most soy sauces contain wheat; those with celiac disease or gluten intolerance must choose a specifically labeled gluten-free version (often called tamari).",
          "cookingGuide": "A versatile ingredient used in marinades, stir-fries, dipping sauces, glazes, and braising liquids.",
          "defrostingGuide": "N/A",
          "proTips": "There are many types: light soy sauce is saltier and used for seasoning, while dark soy sauce is less salty, thicker, and used for adding color and a richer flavor to dishes.",
          "healthBenefits": "Its main purpose is flavor, allowing you to use less plain salt. Fermented versions may have some trace probiotic benefits, but it's primarily a condiment."
      }
  },
  {
      "id": 5,
      "icon": "🥬",
      "name": "Spinach",
      "description": "A nutrient-dense leafy green for salads, smoothies, or sautés.",
      "topic": "Ingredients",
      "category": "Vegetables",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Keto"
      ],
      "severity": "Low",
      "details": {
          "ingredientsToAvoid": "Overcooking, which makes it slimy and diminishes nutrients. Storing it wet will cause it to spoil very quickly.",
          "defrostingGuide": "If frozen, thaw in microwave or colander. Squeeze out as much excess water as possible before using in recipes.",
          "pairingSuggestions": "Pairs well with garlic, lemon, feta cheese, eggs, strawberries, and nuts like almonds or pine nuts.",
          "cautions": "People on blood thinners (like Warfarin) should maintain consistent Vitamin K intake. Those prone to kidney stones should moderate intake due to oxalates.",
          "storageGuide": "Store unwashed in a bag in the crisper drawer for up to a week. Place a paper towel in the bag to absorb excess moisture and prolong freshness.",
          "cookingGuide": "Cooks very quickly. Sauté with garlic for 2-3 minutes until just wilted, steam for 3-4 minutes, or add to soups and stews at the end of cooking.",
          "proTips": "A huge volume of raw spinach cooks down to a very small amount. A good rule of thumb is a 10-to-1 ratio (10 cups raw becomes about 1 cup cooked).",
          "servingTips": "Excellent raw in salads, blended into green smoothies, or sautéed with garlic and olive oil as a simple side dish.",
          "healthBenefits": "A nutritional powerhouse, packed with vitamins K, A, and C, as well as iron, folate, and magnesium."
      }
  },
  {
      "id": 14,
      "icon": "🍔",
      "name": "Vegan Burger",
      "description": "A satisfying, plant-based alternative to a classic comfort food.",
      "topic": "Recipes",
      "category": "Meat",
      "dietary": [
          "Vegan",
          "Vegetarian"
      ],
      "severity": "Low",
      "details": {
          "proTips": "Do not press down on the patty while cooking, as this can squeeze out moisture and make it dry. Toasting the bun is essential for a great burger texture.",
          "healthBenefits": "Typically cholesterol-free and lower in saturated fat than beef burgers. Can be a good source of fiber and protein, depending on the base ingredients (e.g., soy, pea protein, black beans).",
          "cautions": "Check ingredients carefully for allergens like soy or gluten. Some commercial vegan burgers are highly processed and can be very high in sodium.",
          "storageGuide": "Store uncooked patties in the freezer according to package directions. Cooked leftover patties can be refrigerated for 3-4 days.",
          "preparationSteps": "Most vegan patties are best cooked from frozen. Pan-fry or grill over medium-high heat for 3-5 minutes per side until heated through and a good crust forms. Assemble on a toasted bun with your favorite toppings."
      }
  },
  {
      "id": 8,
      "icon": "🥜",
      "name": "Walnuts",
      "description": "A crunchy, brain-boosting nut for baking, salads, or snacks.",
      "topic": "Ingredients",
      "category": "Nuts",
      "dietary": [
          "Vegan",
          "Vegetarian",
          "Gluten-Free",
          "Keto"
      ],
      "severity": "Low",
      "details": {
          "ingredientsToAvoid": "Storing them in the pantry for long periods, which will cause them to develop a bitter, rancid taste.",
          "healthBenefits": "One of the best plant-based sources of Omega-3 fatty acids (ALA). Rich in antioxidants and a good source of protein and fiber. Known to support brain health.",
          "cookingGuide": "Toast in a dry pan over medium heat or in the oven at 350°F (175°C) for 5-10 minutes. This greatly enhances their flavor and aroma before adding them to recipes.",
          "storageGuide": "Due to their high oil content, walnuts can go rancid quickly at room temperature. Store them in an airtight container in the refrigerator for up to 6 months or in the freezer for up to a year to maintain freshness.",
          "defrostingGuide": "N/A",
          "pairingSuggestions": "Pairs well with apples, bananas, goat cheese, salads, yogurt, oatmeal, and dark chocolate.",
          "proTips": "The freezer is the best place to store walnuts to maintain maximum freshness and prevent them from becoming bitter.",
          "cautions": "Must be avoided by people with tree nut allergies.",
          "servingTips": "Sprinkle toasted walnuts over a salad, bake them into brownies or banana bread, or enjoy them as a simple, healthy snack."
      }
  }
];

// Try to fetch and map Firestore documents into the same shape as MOCK_DATA
export async function fetchFromFirestore(collectionName = "foods") {
  try {
    console.log("fetching from firestore");
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
        details: d.details ?? d.Details ?? "",
      };
    });
    console.log(items);
    if (items.length === 0) {
      console.warn(`⚠️ Firestore collection "${collectionName}" is empty. Using mock data.`);
    }
    return items;
  } catch (err) {
    console.error("❌ fetchFromFirestore error:", err.message);
    console.error("Full error:", err);
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
