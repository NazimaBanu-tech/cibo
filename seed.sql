-- =============================================
-- CIBO – Database Seed Script for Menu Items
-- =============================================

-- Clear existing menu items first to avoid duplication issues
DELETE FROM public.menu_items;

-- Insert menu items linked dynamically via restaurant slugs

-- Menu items for burger-king
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Whopper Burger',
  219.00,
  'nonveg',
  'Flame-grilled burger with fresh veggies and signature sauces.',
  '/food-items/burger-king/whopper-burger.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Crispy Veg Burger',
  169.00,
  'veg',
  'Crunchy veg patty with lettuce and creamy sauce.',
  '/food-items/burger-king/crispy-veg-burger.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Chicken Royale Burger',
  229.00,
  'nonveg',
  'Juicy chicken patty burger with soft bun and mayo.',
  '/food-items/burger-king/chicken-royale-burger.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Peri Peri Fries',
  119.00,
  'veg',
  'Crispy fries tossed in spicy peri peri seasoning.',
  '/food-items/burger-king/peri-peri-fries.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Cheesy Loaded Fries',
  149.00,
  'veg',
  'Golden fries loaded with cheese sauce and jalapeños.',
  '/food-items/burger-king/cheesy-loaded-fries.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Veggie Nuggets',
  129.00,
  'veg',
  'Crispy bite-sized veggie nuggets with dipping sauce.',
  '/food-items/burger-king/veggie-nuggets.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Chocolate Sundae',
  89.00,
  'veg',
  'Rich chocolate ice cream sundae with chocolate drizzle.',
  '/food-items/burger-king/chocolate-sundae.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'burger-king' LIMIT 1),
  'Mojito Lime Cooler',
  99.00,
  'veg',
  'Refreshing lime mojito cooler to beat the heat.',
  '/food-items/burger-king/mojito-lime-cooler.jpg',
  true
);

-- Menu items for mcdonalds
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'McAloo Tikki',
  89.00,
  'veg',
  'Classic spiced potato burger with tangy chutney.',
  '/food-items/mcdonalds/mcaloo.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'McChicken Burger',
  169.00,
  'nonveg',
  'Crispy chicken with lettuce and mayo sauce.',
  '/food-items/mcdonalds/burger.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'McSaver Meal Combo',
  249.00,
  'nonveg',
  'A satisfying chicken burger meal combo with fries and a drink.',
  '/food-items/mcdonalds/combo.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'McVeggie Wrap',
  149.00,
  'veg',
  'Grilled veggies wrapped in soft tortilla.',
  '/food-items/mcdonalds/wrap.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'French Fries',
  109.00,
  'veg',
  'Crispy golden fries — the classic McDonald''s way.',
  '/food-items/mcdonalds/fries.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'Oreo McFlurry',
  129.00,
  'veg',
  'Creamy soft serve swirled with chocolate and Oreo cookies.',
  '/food-items/mcdonalds/mcflurry.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'Chicken Nuggets',
  159.00,
  'nonveg',
  'Crispy golden chicken nuggets served with dipping sauce.',
  '/food-items/mcdonalds/nuggets.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mcdonalds' LIMIT 1),
  'Coca Cola',
  69.00,
  'veg',
  'Chilled refreshing Coca Cola drink.',
  '/food-items/mcdonalds/coke.jpg',
  true
);

-- Menu items for dominos
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Farmhouse Pizza',
  349.00,
  'veg',
  'Loaded with fresh veggies and mozzarella cheese.',
  '/food-items/dominos/farmhouse.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Pepper BBQ Chicken Pizza',
  399.00,
  'nonveg',
  'Smoky BBQ chicken with mozzarella cheese.',
  '/food-items/dominos/pepper-bbq-chicken.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Veg Extravaganza',
  379.00,
  'veg',
  'All veggie toppings on thick crust pizza.',
  '/food-items/dominos/veg-extravaganza.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Margherita Pizza',
  199.00,
  'veg',
  'Classic cheese pizza with herb-infused tomato sauce.',
  '/food-items/dominos/margherita.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Garlic Breadsticks',
  129.00,
  'veg',
  'Toasty breadsticks with garlic butter dip.',
  '/food-items/dominos/garlic-breadsticks.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Choco Lava Cake',
  89.00,
  'veg',
  'Warm chocolate cake with gooey molten center.',
  '/food-items/dominos/choco-lava-cake.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Stuffed Garlic Bread',
  149.00,
  'veg',
  'Freshly baked garlic bread stuffed with cheese and sweet corn.',
  '/food-items/dominos/stuffed-garlic-bread.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'dominos' LIMIT 1),
  'Pepsi Cola',
  60.00,
  'veg',
  'Chilled Pepsi beverage.',
  '/food-items/dominos/pepsi.jpg',
  true
);

-- Menu items for pizza-hut
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Margherita Pizza',
  299.00,
  'veg',
  'Classic cheese pizza with fresh tomato sauce.',
  '/food-items/pizza-hut/Margherita Pizza.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Chicken Supreme Pizza',
  449.00,
  'nonveg',
  'Supreme chicken toppings with melted mozzarella.',
  '/food-items/pizza-hut/Chicken Supreme pizza.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Tandoori Paneer Pizza',
  389.00,
  'veg',
  'Marinated paneer, onions, and capsicum on herbed base.',
  '/food-items/pizza-hut/Tandoori Paneer Pizza.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Veggie Supreme Pizza',
  399.00,
  'veg',
  'Pizza loaded with mushroom, olives, corn, and capsicum.',
  '/food-items/pizza-hut/Veggie Supreme Pizza.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Chicken Tikka Pizza',
  419.00,
  'nonveg',
  'Spicy chicken tikka pieces with red onions.',
  '/food-items/pizza-hut/Chicken Tikka pizza.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Garlic Bread with Cheese',
  129.00,
  'veg',
  'Toasty garlic bread topped with melted cheese.',
  '/food-items/pizza-hut/garlic-bread-cheese.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Choco Chip Cookie',
  89.00,
  'veg',
  'Warm and chewy chocolate chip cookie.',
  '/food-items/pizza-hut/choco-chip-cookie.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'pizza-hut' LIMIT 1),
  'Lemon Iced Tea',
  79.00,
  'veg',
  'Refreshing chilled lemon iced tea.',
  '/food-items/pizza-hut/iced-tea.jpg',
  true
);

-- Menu items for meghana
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Chicken Fry Piece Biryani',
  280.00,
  'nonveg',
  'Aromatic basmati rice with tender chicken fry pieces.',
  '/food-items/meghana/chicken-fry-piece-biryani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Paneer Biryani',
  200.00,
  'veg',
  'Fragrant biryani with spiced paneer cubes.',
  '/food-items/meghana/paneer-biryani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Andhra Chicken Curry',
  250.00,
  'nonveg',
  'Slow-cooked spicy Andhra-style chicken curry.',
  '/food-items/meghana/andhra-chicken-curry.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Apollo Fish',
  320.00,
  'nonveg',
  'Crispy fried fish fillets tossed in spicy yogurt curd sauce.',
  '/food-items/meghana/apollo-fish.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Masala Buttermilk',
  60.00,
  'veg',
  'Chilled yogurt drink with ginger and green chillies.',
  '/food-items/meghana/buttermilk.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Chicken 65',
  220.00,
  'nonveg',
  'Spicy deep-fried chicken appetizer.',
  '/food-items/meghana/chicken-65.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Special Veg Meals',
  180.00,
  'veg',
  'Traditional Andhra style unlimited veg meals.',
  '/food-items/meghana/veg-meals.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'meghana' LIMIT 1),
  'Double Ka Meetha',
  90.00,
  'veg',
  'Bread pudding dessert flavored with saffron and cardamom.',
  '/food-items/meghana/double-ka-meetha.jpg',
  true
);

-- Menu items for paradise
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Hyderabadi Chicken Dum Biryani',
  320.00,
  'nonveg',
  'Authentic Hyderabadi chicken biryani cooked in dum style.',
  '/food-items/paradise/hyderabadi-chicken-dum-biryani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Mutton Dum Biryani',
  400.00,
  'nonveg',
  'Fragrant basmati rice slow-cooked with tender mutton pieces.',
  '/food-items/paradise/mutton-haleem.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Veg Fried Rice',
  180.00,
  'veg',
  'Fluffy rice tossed with seasonal vegetables.',
  '/food-items/paradise/veg-fried-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Egg Biryani',
  240.00,
  'nonveg',
  'Hyderabadi style egg biryani cooked in dum style.',
  '/food-items/paradise/egg-biryani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Paneer Butter Masala',
  220.00,
  'veg',
  'Creamy sweet paneer dish in buttery tomato gravy.',
  '/food-items/paradise/paneer-butter-masala.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Chicken Korma',
  260.00,
  'nonveg',
  'Rich chicken curry cooked in almond and cashew paste.',
  '/food-items/paradise/chicken-korma.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Sweet Lassi',
  80.00,
  'veg',
  'Chilled sweet lassi topped with malai.',
  '/food-items/paradise/sweet-lassi.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'paradise' LIMIT 1),
  'Qubani Ka Meetha',
  110.00,
  'veg',
  'Traditional apricot dessert served with vanilla scoop.',
  '/food-items/paradise/qubani-ka-meetha.jpg',
  true
);

-- Menu items for chinese-wok
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Chicken Hakka Noodles',
  199.00,
  'nonveg',
  'Stir-fried noodles with chicken and vegetables in soy sauce.',
  '/food-items/chinese-wok/chicken-hakka-noodles.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Veg Fried Rice',
  169.00,
  'veg',
  'Wok-tossed rice with seasonal vegetables.',
  '/food-items/chinese-wok/veg-fried-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Paneer Manchurian Gravy',
  189.00,
  'veg',
  'Crispy paneer balls in spicy Manchurian sauce.',
  '/food-items/chinese-wok/paneer-manchurian.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Chicken Spring Rolls',
  169.00,
  'nonveg',
  'Crispy rolls filled with seasoned minced chicken.',
  '/food-items/chinese-wok/chicken-spring-roll.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Veg Steamed Momos',
  129.00,
  'veg',
  'Delicate steamed dumplings stuffed with vegetables.',
  '/food-items/chinese-wok/veg-momos.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Chilli Chicken',
  210.00,
  'nonveg',
  'Spicy chicken stir-fry with bell peppers and green chillies.',
  '/food-items/chinese-wok/chilli-chicken.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Peach Iced Tea',
  99.00,
  'veg',
  'Chilled iced tea flavored with sweet peach.',
  '/food-items/chinese-wok/peach-iced-tea.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'chinese-wok' LIMIT 1),
  'Chocolate Brownie',
  89.00,
  'veg',
  'Rich and gooey chocolate fudge brownie.',
  '/food-items/chinese-wok/chocolate-brownie.jpg',
  true
);

-- Menu items for mainland-china
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Schezwan Noodles',
  249.00,
  'veg',
  'Spicy stir-fried noodles in Schezwan sauce.',
  '/food-items/mainland-china/schezwan-noodles.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Kung Pao Chicken',
  299.00,
  'nonveg',
  'Stir-fried chicken with peanuts and dry red chillies.',
  '/food-items/mainland-china/kung-pao-chicken.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Veg Fried Rice',
  219.00,
  'veg',
  'Wok-tossed rice with carrot, peas, and spring onions.',
  '/food-items/mainland-china/veg-fried-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Chili Garlic Prawns',
  389.00,
  'nonveg',
  'Tender prawns tossed in hot garlic sauce with red chillies.',
  '/food-items/mainland-china/chili-garlic-prawns.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Chicken Manchow Soup',
  169.00,
  'nonveg',
  'Spicy Chinese soup topped with crispy fried noodles.',
  '/food-items/mainland-china/chicken-manchow-soup.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Veg Spring Rolls',
  149.00,
  'veg',
  'Crispy rolls filled with shredded seasonal vegetables.',
  '/food-items/mainland-china/veg-spring-rolls.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Fried Sesame Balls',
  119.00,
  'veg',
  'Sweet fried sesame balls filled with red bean paste.',
  '/food-items/mainland-china/sesame-balls.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'mainland-china' LIMIT 1),
  'Hot Jasmine Tea',
  79.00,
  'veg',
  'Traditional hot Chinese jasmine tea.',
  '/food-items/mainland-china/jasmine-tea.jpg',
  true
);

-- Menu items for empire
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Empire Chicken Kebab',
  220.00,
  'nonveg',
  'Tender deep-fried chicken kebab spiced with Empire special spices.',
  '/food-items/empire/chicken-kebab.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Butter Chicken Curry',
  260.00,
  'nonveg',
  'Rich and creamy butter chicken gravy cooked in tomato sauce.',
  '/food-items/empire/butter-chicken.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Empire Mutton Biryani',
  340.00,
  'nonveg',
  'Traditional slow-cooked mutton biryani served with raita.',
  '/food-items/empire/mutton-biryani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Chicken Shawarma Roll',
  120.00,
  'nonveg',
  'Spiced shaved chicken wrapped in soft kubboos with garlic mayo.',
  '/food-items/empire/chicken-shawarma.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Empire Chicken Biryani',
  240.00,
  'nonveg',
  'Spicy and aromatic Empire style chicken dum biryani.',
  '/food-items/empire/chicken-biryani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Tandoori Chicken Half',
  280.00,
  'nonveg',
  'Smoky tandoori chicken roasted in clay oven.',
  '/food-items/empire/tandoori-chicken.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Sweet Lassi',
  70.00,
  'veg',
  'Thick sweet yogurt beverage served chilled.',
  '/food-items/empire/lassi.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'empire' LIMIT 1),
  'Gulab Jamun (2 pcs)',
  60.00,
  'veg',
  'Sweet milk dumplings soaked in cardamom sugar syrup.',
  '/food-items/empire/gulab-jamun.jpg',
  true
);

-- Menu items for udupi
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Special Masala Dosa',
  89.00,
  'veg',
  'Crispy dosa with spiced potato filling served with chutney and sambar.',
  '/food-items/udupi/masala-dosa.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Steamed Idli & Vada Combo',
  79.00,
  'veg',
  'Two soft idlis and one crispy medu vada combo.',
  '/food-items/udupi/idli-vada.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Bisibele Bath',
  80.00,
  'veg',
  'Hot lentil rice dish with spices, ghee, and cashews.',
  '/food-items/udupi/bisibele-bath.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Filter Coffee',
  45.00,
  'veg',
  'Strong South Indian filter coffee brewed with fresh milk.',
  '/food-items/udupi/filter-coffee.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Poori Saagu (3 pcs)',
  90.00,
  'veg',
  'Fluffy fried pooris served with spiced potato sagu.',
  '/food-items/udupi/poori-saagu.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Khara Bath',
  50.00,
  'veg',
  'Savory semolina porridge cooked with mixed vegetables.',
  '/food-items/udupi/khara-bath.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Kesari Bath',
  50.00,
  'veg',
  'Sweet semolina dessert with dry fruits and saffron.',
  '/food-items/udupi/kesari-bath.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'udupi' LIMIT 1),
  'Curd Rice',
  65.00,
  'veg',
  'Soothing rice mixed with fresh curd and tempered with mustard seeds.',
  '/food-items/udupi/curd-rice.jpg',
  true
);

-- Menu items for vidyarthi
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Benne Masala Dosa',
  70.00,
  'veg',
  'Butter dosa with crispy edges served with coconut chutney.',
  '/food-items/vidyarthi/butter-masala-dosa.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Plain Dosa',
  55.00,
  'veg',
  'Golden plain dosa roasted with ghee.',
  '/food-items/vidyarthi/plain-dosa.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Crispy Rava Vada',
  50.00,
  'veg',
  'Deep-fried crispy semolina snack.',
  '/food-items/vidyarthi/rava-vada.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Set Dosa (3 pcs)',
  75.00,
  'veg',
  'Soft spongy dosas served with chutney and sagu.',
  '/food-items/vidyarthi/set-dosa.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Khara Pongal',
  65.00,
  'veg',
  'Soft rice and lentil porridge tempered with black pepper and cumin.',
  '/food-items/vidyarthi/pongal.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Chow Chow Bath',
  90.00,
  'veg',
  'Delicious combination of Khara Bath and Kesari Bath.',
  '/food-items/vidyarthi/chow-chow-bath.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Lemon Rice',
  60.00,
  'veg',
  'Tangy rice flavored with lemon juice, peanuts, and turmeric.',
  '/food-items/vidyarthi/lemon-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'vidyarthi' LIMIT 1),
  'Badam Milk',
  60.00,
  'veg',
  'Warm milk infused with almond paste and cardamom.',
  '/food-items/vidyarthi/badam-milk.jpg',
  true
);

-- Menu items for punjab-grill
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Amritsari Fish Tikka',
  349.00,
  'nonveg',
  'Spicy river fish fillets grilled in clay oven.',
  '/food-items/punjab-grill/amritsari-fish-tikka.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Chicken Tikka Masala',
  299.00,
  'nonveg',
  'Tandoori chicken pieces cooked in rich tomato gravy.',
  '/food-items/punjab-grill/chicken-tikka-masala.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Paneer Tikka',
  249.00,
  'veg',
  'Charcoal grilled paneer cubes marinated in spices.',
  '/food-items/punjab-grill/paneer-tikka.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Dal Makhani',
  199.00,
  'veg',
  'Classic slow-cooked black lentils with cream and butter.',
  '/food-items/punjab-grill/dal-makhani.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Butter Naan',
  59.00,
  'veg',
  'Leavened flatbread roasted in tandoor with butter.',
  '/food-items/punjab-grill/butter-naan.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Jeera Rice',
  119.00,
  'veg',
  'Fragrant basmati rice seasoned with toasted cumin seeds.',
  '/food-items/punjab-grill/jeera-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Fresh Lime Soda',
  79.00,
  'veg',
  'Refreshing fizzy soda with fresh lime juice.',
  '/food-items/punjab-grill/sweet-lime-soda.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'punjab-grill' LIMIT 1),
  'Amritsari Phirni',
  89.00,
  'veg',
  'Sweet ground rice pudding flavored with saffron.',
  '/food-items/punjab-grill/phirni.jpg',
  true
);

-- Menu items for eatfit
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Quinoa Veggie Power Bowl',
  249.00,
  'veg',
  'High-protein bowl with quinoa, broccoli, corn, and paneer.',
  '/food-items/eatfit/veg-quinoa-bowl.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Paneer Protein Salad Bowl',
  229.00,
  'veg',
  'Healthy salad bowl with paneer, greens, and yogurt dressing.',
  '/food-items/eatfit/paneer-protein-bowl.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Grilled Chicken Brown Rice Bowl',
  299.00,
  'nonveg',
  'Lean grilled chicken served over brown rice with steamed veggies.',
  '/food-items/eatfit/chicken-brown-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Healthy Grilled Chicken Salad',
  259.00,
  'nonveg',
  'Juicy grilled chicken slices with crisp garden greens.',
  '/food-items/eatfit/grilled-chicken-salad.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'High Protein Veg Wrap',
  159.00,
  'veg',
  'Healthy wheat wrap filled with high-protein veggies.',
  '/food-items/eatfit/veg-wrap.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Fresh Fruit Yogurt Bowl',
  149.00,
  'veg',
  'Creamy yogurt bowl topped with freshly cut seasonal fruits.',
  '/food-items/eatfit/fruit-yogurt-bowl.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Berry Chia Seed Pudding',
  129.00,
  'veg',
  'Chia seed pudding topped with mixed berry compote.',
  '/food-items/eatfit/chia-seed-pudding.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'eatfit' LIMIT 1),
  'Organic Green Tea',
  59.00,
  'veg',
  'Antioxidant rich organic green tea.',
  '/food-items/eatfit/green-tea.jpg',
  true
);

-- Menu items for freshmenu
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Pesto Grilled Paneer Sandwich',
  199.00,
  'veg',
  'Herbed paneer sandwich toasted in basil pesto spread.',
  '/food-items/freshmenu/pesto-paneer-sandwich.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Mediterranean Veg Salad',
  229.00,
  'veg',
  'Tossed greens, feta cheese, and olives in lemon vinaigrette.',
  '/food-items/freshmenu/mediterranean-veg-salad.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Warm Roasted Veggie Bowl',
  219.00,
  'veg',
  'Healthy bowl loaded with roasted sweet potatoes, zucchini, and corn.',
  '/food-items/freshmenu/roasted-veggie-bowl.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Smoked Chicken Tortilla Wrap',
  239.00,
  'nonveg',
  'Seasoned smoked chicken wrapped in flour tortilla.',
  '/food-items/freshmenu/smoked-chicken-wrap.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Caesar Chicken Bowl',
  249.00,
  'nonveg',
  'Grilled chicken strips, parmesan cheese, and romaine lettuce.',
  '/food-items/freshmenu/caesar-chicken-bowl.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Chicken Avocado Salad',
  269.00,
  'nonveg',
  'Creamy avocado, grilled chicken, and greens.',
  '/food-items/freshmenu/chicken-avocado-salad.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Watermelon Mint Cooler',
  99.00,
  'veg',
  'Fresh watermelon juice cooler with mint.',
  '/food-items/freshmenu/watermelon-cooler.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'freshmenu' LIMIT 1),
  'Mango Yogurt Parfait',
  129.00,
  'veg',
  'Low fat yogurt topped with mango puree and granola.',
  '/food-items/freshmenu/mango-yogurt-parfait.jpg',
  true
);

-- Menu items for corner-house
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Death by Chocolate',
  299.00,
  'veg',
  'Legendary layered chocolate ice cream sundae.',
  '/food-items/corner-house/death-by-chocolate.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Hot Chocolate Fudge',
  219.00,
  'veg',
  'Warm fudge sauce over vanilla ice cream.',
  '/food-items/corner-house/hot-chocolate-fudge.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Classic Cold Coffee',
  149.00,
  'veg',
  'Refreshing cold coffee with chocolate sauce.',
  '/food-items/corner-house/cold-coffee.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Thick Chocolate Milkshake',
  159.00,
  'veg',
  'Thick creamy chocolate milkshake.',
  '/food-items/corner-house/chocolate-milkshake.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Butterscotch Caramel Sundae',
  169.00,
  'veg',
  'Scoops of butterscotch topped with caramel and nuts.',
  '/food-items/corner-house/caramel-sundae.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Hot Brownie with Ice Cream',
  189.00,
  'veg',
  'Warm fudge brownie served with vanilla scoop.',
  '/food-items/corner-house/brownie-with-ice-cream.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Strawberry Milkshake',
  149.00,
  'veg',
  'Creamy thick strawberry milkshake.',
  '/food-items/corner-house/strawberry-milkshake.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'corner-house' LIMIT 1),
  'Vanilla Scoop',
  89.00,
  'veg',
  'Single scoop of premium vanilla ice cream.',
  '/food-items/corner-house/vanilla-ice-cream.jpg',
  true
);

-- Menu items for polar-bear
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Butterscotch Sundae',
  149.00,
  'veg',
  'Butterscotch ice cream topped with caramel sauce.',
  '/food-items/polar-bear/butterscotch-ice-cream.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Strawberry Ice Cream',
  99.00,
  'veg',
  'Single scoop of creamy strawberry ice cream.',
  '/food-items/polar-bear/strawberry-ice-cream.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Mango Ice Cream',
  99.00,
  'veg',
  'Rich mango pulp flavored ice cream scoop.',
  '/food-items/polar-bear/mango-ice-cream.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Chocolate Ice Cream',
  99.00,
  'veg',
  'Single scoop of rich Belgian chocolate ice cream.',
  '/food-items/polar-bear/chocolate-ice-cream.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Chocolate Fudge Sundae',
  169.00,
  'veg',
  'Vanilla and chocolate scoop topped with hot fudge and nuts.',
  '/food-items/polar-bear/chocolate-sundae.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Classic Banana Split',
  199.00,
  'veg',
  'Three scoops served with split banana and toppings.',
  '/food-items/polar-bear/banana-split.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Sizzling Brownie with Ice Cream',
  189.00,
  'veg',
  'Hot sizzling brownie served with vanilla ice cream on a hot plate.',
  '/food-items/polar-bear/brownie-with-ice-cream.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'polar-bear' LIMIT 1),
  'Cold Coffee with Ice Cream',
  149.00,
  'veg',
  'Thick cold coffee topped with vanilla scoop.',
  '/food-items/polar-bear/cold-coffee.jpg',
  true
);

-- Menu items for hae-kum-gang
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Korean Fried Chicken',
  399.00,
  'nonveg',
  'Crispy double-fried chicken tossed in sweet spicy gochujang sauce.',
  '/food-items/hae-kum-gang/korean-fried-chicken.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Veg Bibimbap Bowl',
  349.00,
  'veg',
  'Korean mixed rice with vegetables and spicy chili paste.',
  '/food-items/hae-kum-gang/bibimbap.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Chicken Bulgogi',
  429.00,
  'nonveg',
  'Thinly sliced chicken marinated in sweet soy sauce and grilled.',
  '/food-items/hae-kum-gang/chicken-bulgogi.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Kimchi Fried Rice',
  299.00,
  'veg',
  'Spicy rice fried with mature cabbage kimchi.',
  '/food-items/hae-kum-gang/kimchi-fried-rice.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Veg Kimbap Rolls',
  249.00,
  'veg',
  'Traditional rice rolls stuffed with pickled radish, carrots, and spinach.',
  '/food-items/hae-kum-gang/veg-kimbap.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Korean Ramen Bowl',
  319.00,
  'nonveg',
  'Spicy ramen noodles served with egg, scallions, and broth.',
  '/food-items/hae-kum-gang/korean-ramen-bowl.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Korean Lemon Ade',
  149.00,
  'veg',
  'Refreshing sweet fizzy Korean styled lemon ade.',
  '/food-items/hae-kum-gang/lemon-ade.jpg',
  true
);
INSERT INTO public.menu_items (restaurant_id, name, price, category, description, image_url, is_available)
VALUES (
  (SELECT id FROM public.restaurants WHERE slug = 'hae-kum-gang' LIMIT 1),
  'Chocolate Mochi Ice Cream',
  129.00,
  'veg',
  'Traditional sweet glutinous rice cake filled with chocolate ice cream.',
  '/food-items/hae-kum-gang/chocolate-mochi.jpg',
  true
);
