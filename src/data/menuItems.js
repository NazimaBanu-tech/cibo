// =============================================
// CIBO – Mock Menu Items Data
// =============================================

const DEFAULT_MENU_ITEMS = {
  "burger-king": [
    {
      "id": "bk-1",
      "restaurantSlug": "burger-king",
      "name": "Whopper Burger",
      "description": "Flame-grilled burger with fresh veggies and signature sauces.",
      "price": 219,
      "category": "nonveg",
      "image": "/food-items/burger-king/whopper-burger.jpg",
      "available": true
    },
    {
      "id": "bk-2",
      "restaurantSlug": "burger-king",
      "name": "Crispy Veg Burger",
      "description": "Crunchy veg patty with lettuce and creamy sauce.",
      "price": 169,
      "category": "veg",
      "image": "/food-items/burger-king/crispy-veg-burger.jpg",
      "available": true
    },
    {
      "id": "bk-3",
      "restaurantSlug": "burger-king",
      "name": "Chicken Royale Burger",
      "description": "Juicy chicken patty burger with soft bun and mayo.",
      "price": 229,
      "category": "nonveg",
      "image": "/food-items/burger-king/chicken-royale-burger.jpg",
      "available": true
    },
    {
      "id": "bk-4",
      "restaurantSlug": "burger-king",
      "name": "Peri Peri Fries",
      "description": "Crispy fries tossed in spicy peri peri seasoning.",
      "price": 119,
      "category": "veg",
      "image": "/food-items/burger-king/peri-peri-fries.jpg",
      "available": true
    },
    {
      "id": "bk-5",
      "restaurantSlug": "burger-king",
      "name": "Cheesy Loaded Fries",
      "description": "Golden fries loaded with cheese sauce and jalapeños.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/burger-king/cheesy-loaded-fries.jpg",
      "available": true
    },
    {
      "id": "bk-6",
      "restaurantSlug": "burger-king",
      "name": "Veggie Nuggets",
      "description": "Crispy bite-sized veggie nuggets with dipping sauce.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/burger-king/veggie-nuggets.jpg",
      "available": true
    },
    {
      "id": "bk-7",
      "restaurantSlug": "burger-king",
      "name": "Chocolate Sundae",
      "description": "Rich chocolate ice cream sundae with chocolate drizzle.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/burger-king/chocolate-sundae.jpg",
      "available": true
    },
    {
      "id": "bk-8",
      "restaurantSlug": "burger-king",
      "name": "Mojito Lime Cooler",
      "description": "Refreshing lime mojito cooler to beat the heat.",
      "price": 99,
      "category": "veg",
      "image": "/food-items/burger-king/mojito-lime-cooler.jpg",
      "available": true
    }
  ],
  "mcdonalds": [
    {
      "id": "mc-1",
      "restaurantSlug": "mcdonalds",
      "name": "McAloo Tikki",
      "description": "Classic spiced potato burger with tangy chutney.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/mcdonalds/mcaloo.jpg",
      "available": true
    },
    {
      "id": "mc-2",
      "restaurantSlug": "mcdonalds",
      "name": "McChicken Burger",
      "description": "Crispy chicken with lettuce and mayo sauce.",
      "price": 169,
      "category": "nonveg",
      "image": "/food-items/mcdonalds/burger.jpg",
      "available": true
    },
    {
      "id": "mc-3",
      "restaurantSlug": "mcdonalds",
      "name": "McSaver Meal Combo",
      "description": "A satisfying chicken burger meal combo with fries and a drink.",
      "price": 249,
      "category": "nonveg",
      "image": "/food-items/mcdonalds/combo.jpg",
      "available": true
    },
    {
      "id": "mc-4",
      "restaurantSlug": "mcdonalds",
      "name": "McVeggie Wrap",
      "description": "Grilled veggies wrapped in soft tortilla.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/mcdonalds/wrap.jpg",
      "available": true
    },
    {
      "id": "mc-5",
      "restaurantSlug": "mcdonalds",
      "name": "French Fries",
      "description": "Crispy golden fries — the classic McDonald's way.",
      "price": 109,
      "category": "veg",
      "image": "/food-items/mcdonalds/fries.jpg",
      "available": true
    },
    {
      "id": "mc-6",
      "restaurantSlug": "mcdonalds",
      "name": "Oreo McFlurry",
      "description": "Creamy soft serve swirled with chocolate and Oreo cookies.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/mcdonalds/mcflurry.jpg",
      "available": true
    },
    {
      "id": "mc-7",
      "restaurantSlug": "mcdonalds",
      "name": "Chicken Nuggets",
      "description": "Crispy golden chicken nuggets served with dipping sauce.",
      "price": 159,
      "category": "nonveg",
      "image": "/food-items/mcdonalds/nuggets.jpg",
      "available": true
    },
    {
      "id": "mc-8",
      "restaurantSlug": "mcdonalds",
      "name": "Coca Cola",
      "description": "Chilled refreshing Coca Cola drink.",
      "price": 69,
      "category": "veg",
      "image": "/food-items/mcdonalds/coke.jpg",
      "available": true
    }
  ],
  "dominos": [
    {
      "id": "dom-1",
      "restaurantSlug": "dominos",
      "name": "Farmhouse Pizza",
      "description": "Loaded with fresh veggies and mozzarella cheese.",
      "price": 349,
      "category": "veg",
      "image": "/food-items/dominos/farmhouse.jpg",
      "available": true
    },
    {
      "id": "dom-2",
      "restaurantSlug": "dominos",
      "name": "Pepper BBQ Chicken Pizza",
      "description": "Smoky BBQ chicken with mozzarella cheese.",
      "price": 399,
      "category": "nonveg",
      "image": "/food-items/dominos/pepper-bbq-chicken.jpg",
      "available": true
    },
    {
      "id": "dom-3",
      "restaurantSlug": "dominos",
      "name": "Veg Extravaganza",
      "description": "All veggie toppings on thick crust pizza.",
      "price": 379,
      "category": "veg",
      "image": "/food-items/dominos/veg-extravaganza.jpg",
      "available": true
    },
    {
      "id": "dom-4",
      "restaurantSlug": "dominos",
      "name": "Margherita Pizza",
      "description": "Classic cheese pizza with herb-infused tomato sauce.",
      "price": 199,
      "category": "veg",
      "image": "/food-items/dominos/margherita.jpg",
      "available": true
    },
    {
      "id": "dom-5",
      "restaurantSlug": "dominos",
      "name": "Garlic Breadsticks",
      "description": "Toasty breadsticks with garlic butter dip.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/dominos/garlic-breadsticks.jpg",
      "available": true
    },
    {
      "id": "dom-6",
      "restaurantSlug": "dominos",
      "name": "Choco Lava Cake",
      "description": "Warm chocolate cake with gooey molten center.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/dominos/choco-lava-cake.jpg",
      "available": true
    },
    {
      "id": "dom-7",
      "restaurantSlug": "dominos",
      "name": "Stuffed Garlic Bread",
      "description": "Freshly baked garlic bread stuffed with cheese and sweet corn.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/dominos/stuffed-garlic-bread.jpg",
      "available": true
    },
    {
      "id": "dom-8",
      "restaurantSlug": "dominos",
      "name": "Pepsi Cola",
      "description": "Chilled Pepsi beverage.",
      "price": 60,
      "category": "veg",
      "image": "/food-items/dominos/pepsi.jpg",
      "available": true
    }
  ],
  "pizza-hut": [
    {
      "id": "ph-1",
      "restaurantSlug": "pizza-hut",
      "name": "Margherita Pizza",
      "description": "Classic cheese pizza with fresh tomato sauce.",
      "price": 299,
      "category": "veg",
      "image": "/food-items/pizza-hut/Margherita Pizza.jpg",
      "available": true
    },
    {
      "id": "ph-2",
      "restaurantSlug": "pizza-hut",
      "name": "Chicken Supreme Pizza",
      "description": "Supreme chicken toppings with melted mozzarella.",
      "price": 449,
      "category": "nonveg",
      "image": "/food-items/pizza-hut/Chicken Supreme pizza.jpg",
      "available": true
    },
    {
      "id": "ph-3",
      "restaurantSlug": "pizza-hut",
      "name": "Tandoori Paneer Pizza",
      "description": "Marinated paneer, onions, and capsicum on herbed base.",
      "price": 389,
      "category": "veg",
      "image": "/food-items/pizza-hut/Tandoori Paneer Pizza.jpg",
      "available": true
    },
    {
      "id": "ph-4",
      "restaurantSlug": "pizza-hut",
      "name": "Veggie Supreme Pizza",
      "description": "Pizza loaded with mushroom, olives, corn, and capsicum.",
      "price": 399,
      "category": "veg",
      "image": "/food-items/pizza-hut/Veggie Supreme Pizza.jpg",
      "available": true
    },
    {
      "id": "ph-5",
      "restaurantSlug": "pizza-hut",
      "name": "Chicken Tikka Pizza",
      "description": "Spicy chicken tikka pieces with red onions.",
      "price": 419,
      "category": "nonveg",
      "image": "/food-items/pizza-hut/Chicken Tikka pizza.jpg",
      "available": true
    },
    {
      "id": "ph-6",
      "restaurantSlug": "pizza-hut",
      "name": "Garlic Bread with Cheese",
      "description": "Toasty garlic bread topped with melted cheese.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/pizza-hut/garlic-bread-cheese.jpg",
      "available": true
    },
    {
      "id": "ph-7",
      "restaurantSlug": "pizza-hut",
      "name": "Choco Chip Cookie",
      "description": "Warm and chewy chocolate chip cookie.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/pizza-hut/choco-chip-cookie.jpg",
      "available": true
    },
    {
      "id": "ph-8",
      "restaurantSlug": "pizza-hut",
      "name": "Lemon Iced Tea",
      "description": "Refreshing chilled lemon iced tea.",
      "price": 79,
      "category": "veg",
      "image": "/food-items/pizza-hut/iced-tea.jpg",
      "available": true
    }
  ],
  "meghana": [
    {
      "id": "mg-1",
      "restaurantSlug": "meghana",
      "name": "Chicken Fry Piece Biryani",
      "description": "Aromatic basmati rice with tender chicken fry pieces.",
      "price": 280,
      "category": "nonveg",
      "image": "/food-items/meghana/chicken-fry-piece-biryani.jpg",
      "available": true
    },
    {
      "id": "mg-2",
      "restaurantSlug": "meghana",
      "name": "Paneer Biryani",
      "description": "Fragrant biryani with spiced paneer cubes.",
      "price": 200,
      "category": "veg",
      "image": "/food-items/meghana/paneer-biryani.jpg",
      "available": true
    },
    {
      "id": "mg-3",
      "restaurantSlug": "meghana",
      "name": "Andhra Chicken Curry",
      "description": "Slow-cooked spicy Andhra-style chicken curry.",
      "price": 250,
      "category": "nonveg",
      "image": "/food-items/meghana/andhra-chicken-curry.jpg",
      "available": true
    },
    {
      "id": "mg-4",
      "restaurantSlug": "meghana",
      "name": "Apollo Fish",
      "description": "Crispy fried fish fillets tossed in spicy yogurt curd sauce.",
      "price": 320,
      "category": "nonveg",
      "image": "/food-items/meghana/apollo-fish.jpg",
      "available": true
    },
    {
      "id": "mg-5",
      "restaurantSlug": "meghana",
      "name": "Masala Buttermilk",
      "description": "Chilled yogurt drink with ginger and green chillies.",
      "price": 60,
      "category": "veg",
      "image": "/food-items/meghana/buttermilk.jpg",
      "available": true
    },
    {
      "id": "mg-6",
      "restaurantSlug": "meghana",
      "name": "Chicken 65",
      "description": "Spicy deep-fried chicken appetizer.",
      "price": 220,
      "category": "nonveg",
      "image": "/food-items/meghana/chicken-65.jpg",
      "available": true
    },
    {
      "id": "mg-7",
      "restaurantSlug": "meghana",
      "name": "Special Veg Meals",
      "description": "Traditional Andhra style unlimited veg meals.",
      "price": 180,
      "category": "veg",
      "image": "/food-items/meghana/veg-meals.jpg",
      "available": true
    },
    {
      "id": "mg-8",
      "restaurantSlug": "meghana",
      "name": "Double Ka Meetha",
      "description": "Bread pudding dessert flavored with saffron and cardamom.",
      "price": 90,
      "category": "veg",
      "image": "/food-items/meghana/double-ka-meetha.jpg",
      "available": true
    }
  ],
  "paradise": [
    {
      "id": "par-1",
      "restaurantSlug": "paradise",
      "name": "Hyderabadi Chicken Dum Biryani",
      "description": "Authentic Hyderabadi chicken biryani cooked in dum style.",
      "price": 320,
      "category": "nonveg",
      "image": "/food-items/paradise/hyderabadi-chicken-dum-biryani.jpg",
      "available": true
    },
    {
      "id": "par-2",
      "restaurantSlug": "paradise",
      "name": "Mutton Dum Biryani",
      "description": "Fragrant basmati rice slow-cooked with tender mutton pieces.",
      "price": 400,
      "category": "nonveg",
      "image": "/food-items/paradise/mutton-haleem.jpg",
      "available": true
    },
    {
      "id": "par-3",
      "restaurantSlug": "paradise",
      "name": "Veg Fried Rice",
      "description": "Fluffy rice tossed with seasonal vegetables.",
      "price": 180,
      "category": "veg",
      "image": "/food-items/paradise/veg-fried-rice.jpg",
      "available": true
    },
    {
      "id": "par-4",
      "restaurantSlug": "paradise",
      "name": "Egg Biryani",
      "description": "Hyderabadi style egg biryani cooked in dum style.",
      "price": 240,
      "category": "nonveg",
      "image": "/food-items/paradise/egg-biryani.jpg",
      "available": true
    },
    {
      "id": "par-5",
      "restaurantSlug": "paradise",
      "name": "Paneer Butter Masala",
      "description": "Creamy sweet paneer dish in buttery tomato gravy.",
      "price": 220,
      "category": "veg",
      "image": "/food-items/paradise/paneer-butter-masala.jpg",
      "available": true
    },
    {
      "id": "par-6",
      "restaurantSlug": "paradise",
      "name": "Chicken Korma",
      "description": "Rich chicken curry cooked in almond and cashew paste.",
      "price": 260,
      "category": "nonveg",
      "image": "/food-items/paradise/chicken-korma.jpg",
      "available": true
    },
    {
      "id": "par-7",
      "restaurantSlug": "paradise",
      "name": "Sweet Lassi",
      "description": "Chilled sweet lassi topped with malai.",
      "price": 80,
      "category": "veg",
      "image": "/food-items/paradise/sweet-lassi.jpg",
      "available": true
    },
    {
      "id": "par-8",
      "restaurantSlug": "paradise",
      "name": "Qubani Ka Meetha",
      "description": "Traditional apricot dessert served with vanilla scoop.",
      "price": 110,
      "category": "veg",
      "image": "/food-items/paradise/qubani-ka-meetha.jpg",
      "available": true
    }
  ],
  "chinese-wok": [
    {
      "id": "cw-1",
      "restaurantSlug": "chinese-wok",
      "name": "Chicken Hakka Noodles",
      "description": "Stir-fried noodles with chicken and vegetables in soy sauce.",
      "price": 199,
      "category": "nonveg",
      "image": "/food-items/chinese-wok/chicken-hakka-noodles.jpg",
      "available": true
    },
    {
      "id": "cw-2",
      "restaurantSlug": "chinese-wok",
      "name": "Veg Fried Rice",
      "description": "Wok-tossed rice with seasonal vegetables.",
      "price": 169,
      "category": "veg",
      "image": "/food-items/chinese-wok/veg-fried-rice.jpg",
      "available": true
    },
    {
      "id": "cw-3",
      "restaurantSlug": "chinese-wok",
      "name": "Paneer Manchurian Gravy",
      "description": "Crispy paneer balls in spicy Manchurian sauce.",
      "price": 189,
      "category": "veg",
      "image": "/food-items/chinese-wok/paneer-manchurian.jpg",
      "available": true
    },
    {
      "id": "cw-4",
      "restaurantSlug": "chinese-wok",
      "name": "Chicken Spring Rolls",
      "description": "Crispy rolls filled with seasoned minced chicken.",
      "price": 169,
      "category": "nonveg",
      "image": "/food-items/chinese-wok/chicken-spring-roll.jpg",
      "available": true
    },
    {
      "id": "cw-5",
      "restaurantSlug": "chinese-wok",
      "name": "Veg Steamed Momos",
      "description": "Delicate steamed dumplings stuffed with vegetables.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/chinese-wok/veg-momos.jpg",
      "available": true
    },
    {
      "id": "cw-6",
      "restaurantSlug": "chinese-wok",
      "name": "Chilli Chicken",
      "description": "Spicy chicken stir-fry with bell peppers and green chillies.",
      "price": 210,
      "category": "nonveg",
      "image": "/food-items/chinese-wok/chilli-chicken.jpg",
      "available": true
    },
    {
      "id": "cw-7",
      "restaurantSlug": "chinese-wok",
      "name": "Peach Iced Tea",
      "description": "Chilled iced tea flavored with sweet peach.",
      "price": 99,
      "category": "veg",
      "image": "/food-items/chinese-wok/peach-iced-tea.jpg",
      "available": true
    },
    {
      "id": "cw-8",
      "restaurantSlug": "chinese-wok",
      "name": "Chocolate Brownie",
      "description": "Rich and gooey chocolate fudge brownie.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/chinese-wok/chocolate-brownie.jpg",
      "available": true
    }
  ],
  "mainland-china": [
    {
      "id": "mc2-1",
      "restaurantSlug": "mainland-china",
      "name": "Schezwan Noodles",
      "description": "Spicy stir-fried noodles in Schezwan sauce.",
      "price": 249,
      "category": "veg",
      "image": "/food-items/mainland-china/schezwan-noodles.jpg",
      "available": true
    },
    {
      "id": "mc2-2",
      "restaurantSlug": "mainland-china",
      "name": "Kung Pao Chicken",
      "description": "Stir-fried chicken with peanuts and dry red chillies.",
      "price": 299,
      "category": "nonveg",
      "image": "/food-items/mainland-china/kung-pao-chicken.jpg",
      "available": true
    },
    {
      "id": "mc2-3",
      "restaurantSlug": "mainland-china",
      "name": "Veg Fried Rice",
      "description": "Wok-tossed rice with carrot, peas, and spring onions.",
      "price": 219,
      "category": "veg",
      "image": "/food-items/mainland-china/veg-fried-rice.jpg",
      "available": true
    },
    {
      "id": "mc2-4",
      "restaurantSlug": "mainland-china",
      "name": "Chili Garlic Prawns",
      "description": "Tender prawns tossed in hot garlic sauce with red chillies.",
      "price": 389,
      "category": "nonveg",
      "image": "/food-items/mainland-china/chili-garlic-prawns.jpg",
      "available": true
    },
    {
      "id": "mc2-5",
      "restaurantSlug": "mainland-china",
      "name": "Chicken Manchow Soup",
      "description": "Spicy Chinese soup topped with crispy fried noodles.",
      "price": 169,
      "category": "nonveg",
      "image": "/food-items/mainland-china/chicken-manchow-soup.jpg",
      "available": true
    },
    {
      "id": "mc2-6",
      "restaurantSlug": "mainland-china",
      "name": "Veg Spring Rolls",
      "description": "Crispy rolls filled with shredded seasonal vegetables.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/mainland-china/veg-spring-rolls.jpg",
      "available": true
    },
    {
      "id": "mc2-7",
      "restaurantSlug": "mainland-china",
      "name": "Fried Sesame Balls",
      "description": "Sweet fried sesame balls filled with red bean paste.",
      "price": 119,
      "category": "veg",
      "image": "/food-items/mainland-china/sesame-balls.jpg",
      "available": true
    },
    {
      "id": "mc2-8",
      "restaurantSlug": "mainland-china",
      "name": "Hot Jasmine Tea",
      "description": "Traditional hot Chinese jasmine tea.",
      "price": 79,
      "category": "veg",
      "image": "/food-items/mainland-china/jasmine-tea.jpg",
      "available": true
    }
  ],
  "empire": [
    {
      "id": "emp-1",
      "restaurantSlug": "empire",
      "name": "Empire Chicken Kebab",
      "description": "Tender deep-fried chicken kebab spiced with Empire special spices.",
      "price": 220,
      "category": "nonveg",
      "image": "/food-items/empire/chicken-kebab.jpg",
      "available": true
    },
    {
      "id": "emp-2",
      "restaurantSlug": "empire",
      "name": "Butter Chicken Curry",
      "description": "Rich and creamy butter chicken gravy cooked in tomato sauce.",
      "price": 260,
      "category": "nonveg",
      "image": "/food-items/empire/butter-chicken.jpg",
      "available": true
    },
    {
      "id": "emp-3",
      "restaurantSlug": "empire",
      "name": "Empire Mutton Biryani",
      "description": "Traditional slow-cooked mutton biryani served with raita.",
      "price": 340,
      "category": "nonveg",
      "image": "/food-items/empire/mutton-biryani.jpg",
      "available": true
    },
    {
      "id": "emp-4",
      "restaurantSlug": "empire",
      "name": "Chicken Shawarma Roll",
      "description": "Spiced shaved chicken wrapped in soft kubboos with garlic mayo.",
      "price": 120,
      "category": "nonveg",
      "image": "/food-items/empire/chicken-shawarma.jpg",
      "available": true
    },
    {
      "id": "emp-5",
      "restaurantSlug": "empire",
      "name": "Empire Chicken Biryani",
      "description": "Spicy and aromatic Empire style chicken dum biryani.",
      "price": 240,
      "category": "nonveg",
      "image": "/food-items/empire/chicken-biryani.jpg",
      "available": true
    },
    {
      "id": "emp-6",
      "restaurantSlug": "empire",
      "name": "Tandoori Chicken Half",
      "description": "Smoky tandoori chicken roasted in clay oven.",
      "price": 280,
      "category": "nonveg",
      "image": "/food-items/empire/tandoori-chicken.jpg",
      "available": true
    },
    {
      "id": "emp-7",
      "restaurantSlug": "empire",
      "name": "Sweet Lassi",
      "description": "Thick sweet yogurt beverage served chilled.",
      "price": 70,
      "category": "veg",
      "image": "/food-items/empire/lassi.jpg",
      "available": true
    },
    {
      "id": "emp-8",
      "restaurantSlug": "empire",
      "name": "Gulab Jamun (2 pcs)",
      "description": "Sweet milk dumplings soaked in cardamom sugar syrup.",
      "price": 60,
      "category": "veg",
      "image": "/food-items/empire/gulab-jamun.jpg",
      "available": true
    }
  ],
  "udupi": [
    {
      "id": "ud-1",
      "restaurantSlug": "udupi",
      "name": "Special Masala Dosa",
      "description": "Crispy dosa with spiced potato filling served with chutney and sambar.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/udupi/masala-dosa.jpg",
      "available": true
    },
    {
      "id": "ud-2",
      "restaurantSlug": "udupi",
      "name": "Steamed Idli & Vada Combo",
      "description": "Two soft idlis and one crispy medu vada combo.",
      "price": 79,
      "category": "veg",
      "image": "/food-items/udupi/idli-vada.jpg",
      "available": true
    },
    {
      "id": "ud-3",
      "restaurantSlug": "udupi",
      "name": "Bisibele Bath",
      "description": "Hot lentil rice dish with spices, ghee, and cashews.",
      "price": 80,
      "category": "veg",
      "image": "/food-items/udupi/bisibele-bath.jpg",
      "available": true
    },
    {
      "id": "ud-4",
      "restaurantSlug": "udupi",
      "name": "Filter Coffee",
      "description": "Strong South Indian filter coffee brewed with fresh milk.",
      "price": 45,
      "category": "veg",
      "image": "/food-items/udupi/filter-coffee.jpg",
      "available": true
    },
    {
      "id": "ud-5",
      "restaurantSlug": "udupi",
      "name": "Poori Saagu (3 pcs)",
      "description": "Fluffy fried pooris served with spiced potato sagu.",
      "price": 90,
      "category": "veg",
      "image": "/food-items/udupi/poori-saagu.jpg",
      "available": true
    },
    {
      "id": "ud-6",
      "restaurantSlug": "udupi",
      "name": "Khara Bath",
      "description": "Savory semolina porridge cooked with mixed vegetables.",
      "price": 50,
      "category": "veg",
      "image": "/food-items/udupi/khara-bath.jpg",
      "available": true
    },
    {
      "id": "ud-7",
      "restaurantSlug": "udupi",
      "name": "Kesari Bath",
      "description": "Sweet semolina dessert with dry fruits and saffron.",
      "price": 50,
      "category": "veg",
      "image": "/food-items/udupi/kesari-bath.jpg",
      "available": true
    },
    {
      "id": "ud-8",
      "restaurantSlug": "udupi",
      "name": "Curd Rice",
      "description": "Soothing rice mixed with fresh curd and tempered with mustard seeds.",
      "price": 65,
      "category": "veg",
      "image": "/food-items/udupi/curd-rice.jpg",
      "available": true
    }
  ],
  "vidyarthi": [
    {
      "id": "vb-1",
      "restaurantSlug": "vidyarthi",
      "name": "Benne Masala Dosa",
      "description": "Butter dosa with crispy edges served with coconut chutney.",
      "price": 70,
      "category": "veg",
      "image": "/food-items/vidyarthi/butter-masala-dosa.jpg",
      "available": true
    },
    {
      "id": "vb-2",
      "restaurantSlug": "vidyarthi",
      "name": "Plain Dosa",
      "description": "Golden plain dosa roasted with ghee.",
      "price": 55,
      "category": "veg",
      "image": "/food-items/vidyarthi/plain-dosa.jpg",
      "available": true
    },
    {
      "id": "vb-3",
      "restaurantSlug": "vidyarthi",
      "name": "Crispy Rava Vada",
      "description": "Deep-fried crispy semolina snack.",
      "price": 50,
      "category": "veg",
      "image": "/food-items/vidyarthi/rava-vada.jpg",
      "available": true
    },
    {
      "id": "vb-4",
      "restaurantSlug": "vidyarthi",
      "name": "Set Dosa (3 pcs)",
      "description": "Soft spongy dosas served with chutney and sagu.",
      "price": 75,
      "category": "veg",
      "image": "/food-items/vidyarthi/set-dosa.jpg",
      "available": true
    },
    {
      "id": "vb-5",
      "restaurantSlug": "vidyarthi",
      "name": "Khara Pongal",
      "description": "Soft rice and lentil porridge tempered with black pepper and cumin.",
      "price": 65,
      "category": "veg",
      "image": "/food-items/vidyarthi/pongal.jpg",
      "available": true
    },
    {
      "id": "vb-6",
      "restaurantSlug": "vidyarthi",
      "name": "Chow Chow Bath",
      "description": "Delicious combination of Khara Bath and Kesari Bath.",
      "price": 90,
      "category": "veg",
      "image": "/food-items/vidyarthi/chow-chow-bath.jpg",
      "available": true
    },
    {
      "id": "vb-7",
      "restaurantSlug": "vidyarthi",
      "name": "Lemon Rice",
      "description": "Tangy rice flavored with lemon juice, peanuts, and turmeric.",
      "price": 60,
      "category": "veg",
      "image": "/food-items/vidyarthi/lemon-rice.jpg",
      "available": true
    },
    {
      "id": "vb-8",
      "restaurantSlug": "vidyarthi",
      "name": "Badam Milk",
      "description": "Warm milk infused with almond paste and cardamom.",
      "price": 60,
      "category": "veg",
      "image": "/food-items/vidyarthi/badam-milk.jpg",
      "available": true
    }
  ],
  "punjab-grill": [
    {
      "id": "pg-1",
      "restaurantSlug": "punjab-grill",
      "name": "Amritsari Fish Tikka",
      "description": "Spicy river fish fillets grilled in clay oven.",
      "price": 349,
      "category": "nonveg",
      "image": "/food-items/punjab-grill/amritsari-fish-tikka.jpg",
      "available": true
    },
    {
      "id": "pg-2",
      "restaurantSlug": "punjab-grill",
      "name": "Chicken Tikka Masala",
      "description": "Tandoori chicken pieces cooked in rich tomato gravy.",
      "price": 299,
      "category": "nonveg",
      "image": "/food-items/punjab-grill/chicken-tikka-masala.jpg",
      "available": true
    },
    {
      "id": "pg-3",
      "restaurantSlug": "punjab-grill",
      "name": "Paneer Tikka",
      "description": "Charcoal grilled paneer cubes marinated in spices.",
      "price": 249,
      "category": "veg",
      "image": "/food-items/punjab-grill/paneer-tikka.jpg",
      "available": true
    },
    {
      "id": "pg-4",
      "restaurantSlug": "punjab-grill",
      "name": "Dal Makhani",
      "description": "Classic slow-cooked black lentils with cream and butter.",
      "price": 199,
      "category": "veg",
      "image": "/food-items/punjab-grill/dal-makhani.jpg",
      "available": true
    },
    {
      "id": "pg-5",
      "restaurantSlug": "punjab-grill",
      "name": "Butter Naan",
      "description": "Leavened flatbread roasted in tandoor with butter.",
      "price": 59,
      "category": "veg",
      "image": "/food-items/punjab-grill/butter-naan.jpg",
      "available": true
    },
    {
      "id": "pg-6",
      "restaurantSlug": "punjab-grill",
      "name": "Jeera Rice",
      "description": "Fragrant basmati rice seasoned with toasted cumin seeds.",
      "price": 119,
      "category": "veg",
      "image": "/food-items/punjab-grill/jeera-rice.jpg",
      "available": true
    },
    {
      "id": "pg-7",
      "restaurantSlug": "punjab-grill",
      "name": "Fresh Lime Soda",
      "description": "Refreshing fizzy soda with fresh lime juice.",
      "price": 79,
      "category": "veg",
      "image": "/food-items/punjab-grill/sweet-lime-soda.jpg",
      "available": true
    },
    {
      "id": "pg-8",
      "restaurantSlug": "punjab-grill",
      "name": "Amritsari Phirni",
      "description": "Sweet ground rice pudding flavored with saffron.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/punjab-grill/phirni.jpg",
      "available": true
    }
  ],
  "eatfit": [
    {
      "id": "ef-1",
      "restaurantSlug": "eatfit",
      "name": "Quinoa Veggie Power Bowl",
      "description": "High-protein bowl with quinoa, broccoli, corn, and paneer.",
      "price": 249,
      "category": "veg",
      "image": "/food-items/eatfit/veg-quinoa-bowl.jpg",
      "available": true
    },
    {
      "id": "ef-2",
      "restaurantSlug": "eatfit",
      "name": "Paneer Protein Salad Bowl",
      "description": "Healthy salad bowl with paneer, greens, and yogurt dressing.",
      "price": 229,
      "category": "veg",
      "image": "/food-items/eatfit/paneer-protein-bowl.jpg",
      "available": true
    },
    {
      "id": "ef-3",
      "restaurantSlug": "eatfit",
      "name": "Grilled Chicken Brown Rice Bowl",
      "description": "Lean grilled chicken served over brown rice with steamed veggies.",
      "price": 299,
      "category": "nonveg",
      "image": "/food-items/eatfit/chicken-brown-rice.jpg",
      "available": true
    },
    {
      "id": "ef-4",
      "restaurantSlug": "eatfit",
      "name": "Healthy Grilled Chicken Salad",
      "description": "Juicy grilled chicken slices with crisp garden greens.",
      "price": 259,
      "category": "nonveg",
      "image": "/food-items/eatfit/grilled-chicken-salad.jpg",
      "available": true
    },
    {
      "id": "ef-5",
      "restaurantSlug": "eatfit",
      "name": "High Protein Veg Wrap",
      "description": "Healthy wheat wrap filled with high-protein veggies.",
      "price": 159,
      "category": "veg",
      "image": "/food-items/eatfit/veg-wrap.jpg",
      "available": true
    },
    {
      "id": "ef-6",
      "restaurantSlug": "eatfit",
      "name": "Fresh Fruit Yogurt Bowl",
      "description": "Creamy yogurt bowl topped with freshly cut seasonal fruits.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/eatfit/fruit-yogurt-bowl.jpg",
      "available": true
    },
    {
      "id": "ef-7",
      "restaurantSlug": "eatfit",
      "name": "Berry Chia Seed Pudding",
      "description": "Chia seed pudding topped with mixed berry compote.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/eatfit/chia-seed-pudding.jpg",
      "available": true
    },
    {
      "id": "ef-8",
      "restaurantSlug": "eatfit",
      "name": "Organic Green Tea",
      "description": "Antioxidant rich organic green tea.",
      "price": 59,
      "category": "veg",
      "image": "/food-items/eatfit/green-tea.jpg",
      "available": true
    }
  ],
  "freshmenu": [
    {
      "id": "fm-1",
      "restaurantSlug": "freshmenu",
      "name": "Pesto Grilled Paneer Sandwich",
      "description": "Herbed paneer sandwich toasted in basil pesto spread.",
      "price": 199,
      "category": "veg",
      "image": "/food-items/freshmenu/pesto-paneer-sandwich.jpg",
      "available": true
    },
    {
      "id": "fm-2",
      "restaurantSlug": "freshmenu",
      "name": "Mediterranean Veg Salad",
      "description": "Tossed greens, feta cheese, and olives in lemon vinaigrette.",
      "price": 229,
      "category": "veg",
      "image": "/food-items/freshmenu/mediterranean-veg-salad.jpg",
      "available": true
    },
    {
      "id": "fm-3",
      "restaurantSlug": "freshmenu",
      "name": "Warm Roasted Veggie Bowl",
      "description": "Healthy bowl loaded with roasted sweet potatoes, zucchini, and corn.",
      "price": 219,
      "category": "veg",
      "image": "/food-items/freshmenu/roasted-veggie-bowl.jpg",
      "available": true
    },
    {
      "id": "fm-4",
      "restaurantSlug": "freshmenu",
      "name": "Smoked Chicken Tortilla Wrap",
      "description": "Seasoned smoked chicken wrapped in flour tortilla.",
      "price": 239,
      "category": "nonveg",
      "image": "/food-items/freshmenu/smoked-chicken-wrap.jpg",
      "available": true
    },
    {
      "id": "fm-5",
      "restaurantSlug": "freshmenu",
      "name": "Caesar Chicken Bowl",
      "description": "Grilled chicken strips, parmesan cheese, and romaine lettuce.",
      "price": 249,
      "category": "nonveg",
      "image": "/food-items/freshmenu/caesar-chicken-bowl.jpg",
      "available": true
    },
    {
      "id": "fm-6",
      "restaurantSlug": "freshmenu",
      "name": "Chicken Avocado Salad",
      "description": "Creamy avocado, grilled chicken, and greens.",
      "price": 269,
      "category": "nonveg",
      "image": "/food-items/freshmenu/chicken-avocado-salad.jpg",
      "available": true
    },
    {
      "id": "fm-7",
      "restaurantSlug": "freshmenu",
      "name": "Watermelon Mint Cooler",
      "description": "Fresh watermelon juice cooler with mint.",
      "price": 99,
      "category": "veg",
      "image": "/food-items/freshmenu/watermelon-cooler.jpg",
      "available": true
    },
    {
      "id": "fm-8",
      "restaurantSlug": "freshmenu",
      "name": "Mango Yogurt Parfait",
      "description": "Low fat yogurt topped with mango puree and granola.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/freshmenu/mango-yogurt-parfait.jpg",
      "available": true
    }
  ],
  "corner-house": [
    {
      "id": "ch-1",
      "restaurantSlug": "corner-house",
      "name": "Death by Chocolate",
      "description": "Legendary layered chocolate ice cream sundae.",
      "price": 299,
      "category": "veg",
      "image": "/food-items/corner-house/death-by-chocolate.jpg",
      "available": true
    },
    {
      "id": "ch-2",
      "restaurantSlug": "corner-house",
      "name": "Hot Chocolate Fudge",
      "description": "Warm fudge sauce over vanilla ice cream.",
      "price": 219,
      "category": "veg",
      "image": "/food-items/corner-house/hot-chocolate-fudge.jpg",
      "available": true
    },
    {
      "id": "ch-3",
      "restaurantSlug": "corner-house",
      "name": "Classic Cold Coffee",
      "description": "Refreshing cold coffee with chocolate sauce.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/corner-house/cold-coffee.jpg",
      "available": true
    },
    {
      "id": "ch-4",
      "restaurantSlug": "corner-house",
      "name": "Thick Chocolate Milkshake",
      "description": "Thick creamy chocolate milkshake.",
      "price": 159,
      "category": "veg",
      "image": "/food-items/corner-house/chocolate-milkshake.jpg",
      "available": true
    },
    {
      "id": "ch-5",
      "restaurantSlug": "corner-house",
      "name": "Butterscotch Caramel Sundae",
      "description": "Scoops of butterscotch topped with caramel and nuts.",
      "price": 169,
      "category": "veg",
      "image": "/food-items/corner-house/caramel-sundae.jpg",
      "available": true
    },
    {
      "id": "ch-6",
      "restaurantSlug": "corner-house",
      "name": "Hot Brownie with Ice Cream",
      "description": "Warm fudge brownie served with vanilla scoop.",
      "price": 189,
      "category": "veg",
      "image": "/food-items/corner-house/brownie-with-ice-cream.jpg",
      "available": true
    },
    {
      "id": "ch-7",
      "restaurantSlug": "corner-house",
      "name": "Strawberry Milkshake",
      "description": "Creamy thick strawberry milkshake.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/corner-house/strawberry-milkshake.jpg",
      "available": true
    },
    {
      "id": "ch-8",
      "restaurantSlug": "corner-house",
      "name": "Vanilla Scoop",
      "description": "Single scoop of premium vanilla ice cream.",
      "price": 89,
      "category": "veg",
      "image": "/food-items/corner-house/vanilla-ice-cream.jpg",
      "available": true
    }
  ],
  "polar-bear": [
    {
      "id": "pb-1",
      "restaurantSlug": "polar-bear",
      "name": "Butterscotch Sundae",
      "description": "Butterscotch ice cream topped with caramel sauce.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/polar-bear/butterscotch-ice-cream.jpg",
      "available": true
    },
    {
      "id": "pb-2",
      "restaurantSlug": "polar-bear",
      "name": "Strawberry Ice Cream",
      "description": "Single scoop of creamy strawberry ice cream.",
      "price": 99,
      "category": "veg",
      "image": "/food-items/polar-bear/strawberry-ice-cream.jpg",
      "available": true
    },
    {
      "id": "pb-3",
      "restaurantSlug": "polar-bear",
      "name": "Mango Ice Cream",
      "description": "Rich mango pulp flavored ice cream scoop.",
      "price": 99,
      "category": "veg",
      "image": "/food-items/polar-bear/mango-ice-cream.jpg",
      "available": true
    },
    {
      "id": "pb-4",
      "restaurantSlug": "polar-bear",
      "name": "Chocolate Ice Cream",
      "description": "Single scoop of rich Belgian chocolate ice cream.",
      "price": 99,
      "category": "veg",
      "image": "/food-items/polar-bear/chocolate-ice-cream.jpg",
      "available": true
    },
    {
      "id": "pb-5",
      "restaurantSlug": "polar-bear",
      "name": "Chocolate Fudge Sundae",
      "description": "Vanilla and chocolate scoop topped with hot fudge and nuts.",
      "price": 169,
      "category": "veg",
      "image": "/food-items/polar-bear/chocolate-sundae.jpg",
      "available": true
    },
    {
      "id": "pb-6",
      "restaurantSlug": "polar-bear",
      "name": "Classic Banana Split",
      "description": "Three scoops served with split banana and toppings.",
      "price": 199,
      "category": "veg",
      "image": "/food-items/polar-bear/banana-split.jpg",
      "available": true
    },
    {
      "id": "pb-7",
      "restaurantSlug": "polar-bear",
      "name": "Sizzling Brownie with Ice Cream",
      "description": "Hot sizzling brownie served with vanilla ice cream on a hot plate.",
      "price": 189,
      "category": "veg",
      "image": "/food-items/polar-bear/brownie-with-ice-cream.jpg",
      "available": true
    },
    {
      "id": "pb-8",
      "restaurantSlug": "polar-bear",
      "name": "Cold Coffee with Ice Cream",
      "description": "Thick cold coffee topped with vanilla scoop.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/polar-bear/cold-coffee.jpg",
      "available": true
    }
  ],
  "hae-kum-gang": [
    {
      "id": "hkg-1",
      "restaurantSlug": "hae-kum-gang",
      "name": "Korean Fried Chicken",
      "description": "Crispy double-fried chicken tossed in sweet spicy gochujang sauce.",
      "price": 399,
      "category": "nonveg",
      "image": "/food-items/hae-kum-gang/korean-fried-chicken.jpg",
      "available": true
    },
    {
      "id": "hkg-2",
      "restaurantSlug": "hae-kum-gang",
      "name": "Veg Bibimbap Bowl",
      "description": "Korean mixed rice with vegetables and spicy chili paste.",
      "price": 349,
      "category": "veg",
      "image": "/food-items/hae-kum-gang/bibimbap.jpg",
      "available": true
    },
    {
      "id": "hkg-3",
      "restaurantSlug": "hae-kum-gang",
      "name": "Chicken Bulgogi",
      "description": "Thinly sliced chicken marinated in sweet soy sauce and grilled.",
      "price": 429,
      "category": "nonveg",
      "image": "/food-items/hae-kum-gang/chicken-bulgogi.jpg",
      "available": true
    },
    {
      "id": "hkg-4",
      "restaurantSlug": "hae-kum-gang",
      "name": "Kimchi Fried Rice",
      "description": "Spicy rice fried with mature cabbage kimchi.",
      "price": 299,
      "category": "veg",
      "image": "/food-items/hae-kum-gang/kimchi-fried-rice.jpg",
      "available": true
    },
    {
      "id": "hkg-5",
      "restaurantSlug": "hae-kum-gang",
      "name": "Veg Kimbap Rolls",
      "description": "Traditional rice rolls stuffed with pickled radish, carrots, and spinach.",
      "price": 249,
      "category": "veg",
      "image": "/food-items/hae-kum-gang/veg-kimbap.jpg",
      "available": true
    },
    {
      "id": "hkg-6",
      "restaurantSlug": "hae-kum-gang",
      "name": "Korean Ramen Bowl",
      "description": "Spicy ramen noodles served with egg, scallions, and broth.",
      "price": 319,
      "category": "nonveg",
      "image": "/food-items/hae-kum-gang/korean-ramen-bowl.jpg",
      "available": true
    },
    {
      "id": "hkg-7",
      "restaurantSlug": "hae-kum-gang",
      "name": "Korean Lemon Ade",
      "description": "Refreshing sweet fizzy Korean styled lemon ade.",
      "price": 149,
      "category": "veg",
      "image": "/food-items/hae-kum-gang/lemon-ade.jpg",
      "available": true
    },
    {
      "id": "hkg-8",
      "restaurantSlug": "hae-kum-gang",
      "name": "Chocolate Mochi Ice Cream",
      "description": "Traditional sweet glutinous rice cake filled with chocolate ice cream.",
      "price": 129,
      "category": "veg",
      "image": "/food-items/hae-kum-gang/chocolate-mochi.jpg",
      "available": true
    }
  ]
};

const sanitizeMenuItems = (itemsObj) => {
  const sanitized = {};
  for (const slug in itemsObj) {
    if (Array.isArray(itemsObj[slug])) {
      sanitized[slug] = itemsObj[slug].map((item) => {
        let cat = item.category;
        if (cat !== 'veg' && cat !== 'nonveg') {
          cat = 'veg';
        }
        return { ...item, category: cat };
      });
    } else {
      sanitized[slug] = [];
    }
  }
  return sanitized;
};

if (!localStorage.getItem('cibo_menu_items')) {
  localStorage.setItem('cibo_menu_items', JSON.stringify(sanitizeMenuItems(DEFAULT_MENU_ITEMS)));
}

const getLocalStorageMenuItems = () => {
  try {
    const data = localStorage.getItem('cibo_menu_items');
    const parsed = data ? JSON.parse(data) : DEFAULT_MENU_ITEMS;
    return sanitizeMenuItems(parsed);
  } catch (e) {
    console.error("Failed to read cibo_menu_items from localStorage", e);
    return sanitizeMenuItems(DEFAULT_MENU_ITEMS);
  }
};

export const MENU_ITEMS = getLocalStorageMenuItems();

export const saveMenuItemsToStorage = (menuItems) => {
  try {
    const sanitized = sanitizeMenuItems(menuItems);
    localStorage.setItem('cibo_menu_items', JSON.stringify(sanitized));
    for (const key in MENU_ITEMS) {
      delete MENU_ITEMS[key];
    }
    Object.assign(MENU_ITEMS, sanitized);
  } catch (e) {
    console.error("Failed to save cibo_menu_items to localStorage", e);
  }
};

export const getMenuByRestaurant = (slug) => MENU_ITEMS[slug] || [];

export const filterMenuByCategory = (items, category) => {
  if (!category || category === "all") return items;
  return items.filter((item) => item.category === category);
};

// All unique image paths for admin image picker
export const ALL_RESTAURANT_IMAGES = [
  { label: "McDonald's", value: "/restaurants/mcd.jpg" },
  { label: "Burger King", value: "/restaurants/burger-king.jpg" },
  { label: "Domino's", value: "/restaurants/dominos.jpg" },
  { label: "Pizza Hut", value: "/restaurants/pizza-hut.jpg" },
  { label: "Meghana", value: "/restaurants/meghana.jpg" },
  { label: "Paradise", value: "/restaurants/paradise.jpg" },
  { label: "Chinese Wok", value: "/restaurants/chinese-wok.jpg" },
  { label: "Mainland China", value: "/restaurants/mainland-china.jpg" },
  { label: "Empire", value: "/restaurants/empire.jpg" },
  { label: "Udupi", value: "/restaurants/udupi.jpg" },
  { label: "Vidyarthi", value: "/restaurants/vidyarthi.jpg" },
  { label: "Punjab Grill", value: "/restaurants/punjab-grill.jpg" },
  { label: "EatFit", value: "/restaurants/eatfit.jpg" },
  { label: "FreshMenu", value: "/restaurants/freshmenu.jpg" },
  { label: "Corner House", value: "/restaurants/corner-house.jpg" },
  { label: "Polar Bear", value: "/restaurants/polar-bear.jpg" },
  { label: "Hae Kum Gang", value: "/restaurants/hae-kum-gang.jpg" },
];

export const ALL_HERO_IMAGES = [
  { label: "McDonald's Hero", value: "/restaurant-heroes/mcd-hero.jpg" },
  { label: "Burger King Hero", value: "/restaurant-heroes/burger-king-hero.jpg" },
  { label: "Domino's Hero", value: "/restaurant-heroes/dominos-hero.jpg" },
  { label: "Pizza Hut Hero", value: "/restaurant-heroes/pizza-hut-hero.jpg" },
  { label: "Meghana Hero", value: "/restaurant-heroes/meghana-hero.jpg" },
  { label: "Paradise Hero", value: "/restaurant-heroes/paradise-hero.jpg" },
  { label: "Chinese Wok Hero", value: "/restaurant-heroes/chinese-wok-hero.jpg" },
  { label: "Mainland China Hero", value: "/restaurant-heroes/mainland-china-hero.jpg" },
  { label: "Empire Hero", value: "/restaurant-heroes/empire-hero.jpg" },
  { label: "Udupi Hero", value: "/restaurant-heroes/udupi-hero.jpg" },
  { label: "Vidyarthi Hero", value: "/restaurant-heroes/vidyarthi-hero.jpg" },
  { label: "Punjab Grill Hero", value: "/restaurant-heroes/punjab-grill-hero.jpg" },
  { label: "EatFit Hero", value: "/restaurant-heroes/eatfit-hero.jpg" },
  { label: "FreshMenu Hero", value: "/restaurant-heroes/freshmenu-hero.jpg" },
  { label: "Corner House Hero", value: "/restaurant-heroes/corner-house-hero.jpg" },
  { label: "Polar Bear Hero", value: "/restaurant-heroes/polar-bear-hero.jpg" },
  { label: "Hae Kum Gang Hero", value: "/restaurant-heroes/hae-kum-gang-hero.jpg" },
];
