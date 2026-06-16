// =============================================
// CIBO – Mock Restaurant Data
// =============================================

const DEFAULT_RESTAURANTS = [
  {
    id: 1,
    name: "McDonald's",
    slug: "mcdonalds",
    category: "Fast Food",
    cuisine: ["Burgers", "Fast Food"],
    location: "JP Nagar",
    rating: 4.3,
    deliveryTime: "30-35 mins",
    image: "/restaurants/mcd.jpg",
    heroImage: "/restaurant-heroes/mcd-hero.jpg",
    offerText: "Free delivery on orders above Rs199",
    categories: ["Burgers", "Wraps", "Sides", "Beverages"],
  },
  {
    id: 2,
    name: "Burger King",
    slug: "burger-king",
    category: "Fast Food",
    cuisine: ["Burgers", "American"],
    location: "BTM Layout",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    image: "/restaurants/burger-king.jpg",
    heroImage: "/restaurant-heroes/burger-king-hero.jpg",
    offerText: "Free delivery on orders above Rs199",
    categories: ["Burgers", "Fries", "Beverages", "Desserts"],
  },
  {
    id: 3,
    name: "Domino's",
    slug: "dominos",
    category: "Pizza",
    cuisine: ["Pizza", "Italian"],
    location: "Jayanagar",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    image: "/restaurants/dominos.jpg",
    heroImage: "/restaurant-heroes/dominos-hero.jpg",
    offerText: "Buy 1 Get 1 on selected pizzas",
    categories: ["Pizzas", "Sides", "Desserts", "Beverages"],
  },
  {
    id: 4,
    name: "Pizza Hut",
    slug: "pizza-hut",
    category: "Pizza",
    cuisine: ["Pizza", "Italian"],
    location: "Banashankari",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    image: "/restaurants/pizza-hut.jpg",
    heroImage: "/restaurant-heroes/pizza-hut-hero.jpg",
    offerText: "20% off on all pizzas",
    categories: ["Pizzas", "Pastas", "Sides", "Beverages"],
  },
  {
    id: 5,
    name: "Meghana Foods",
    slug: "meghana",
    category: "Biryani",
    cuisine: ["Biryani", "South Indian"],
    location: "Residency Road",
    rating: 4.5,
    deliveryTime: "35-45 mins",
    image: "/restaurants/meghana.jpg",
    heroImage: "/restaurant-heroes/meghana-hero.jpg",
    offerText: "Free raita with biryani orders",
    categories: ["Biryani", "Curries", "Rice", "Beverages"],
  },
  {
    id: 6,
    name: "Paradise",
    slug: "paradise",
    category: "Biryani",
    cuisine: ["Biryani", "Mughlai"],
    location: "MG Road",
    rating: 4.4,
    deliveryTime: "30-40 mins",
    image: "/restaurants/paradise.jpg",
    heroImage: "/restaurant-heroes/paradise-hero.jpg",
    offerText: "Special combo offer on weekends",
    categories: ["Biryani", "Kebabs", "Desserts", "Beverages"],
  },
  {
    id: 7,
    name: "Chinese Wok",
    slug: "chinese-wok",
    category: "Chinese",
    cuisine: ["Chinese", "Asian"],
    location: "Koramangala",
    rating: 4.1,
    deliveryTime: "30-35 mins",
    image: "/restaurants/chinese-wok.jpg",
    heroImage: "/restaurant-heroes/chinese-wok-hero.jpg",
    offerText: "Free spring rolls on orders above Rs399",
    categories: ["Noodles", "Rice", "Soups", "Dim Sum"],
  },
  {
    id: 8,
    name: "Mainland China",
    slug: "mainland-china",
    category: "Chinese",
    cuisine: ["Chinese", "Asian"],
    location: "Indiranagar",
    rating: 4.3,
    deliveryTime: "35-45 mins",
    image: "/restaurants/mainland-china.jpg",
    heroImage: "/restaurant-heroes/mainland-china-hero.jpg",
    offerText: "15% off on first order",
    categories: ["Noodles", "Rice", "Soups", "Mains"],
  },
  {
    id: 9,
    name: "Empire Restaurant",
    slug: "empire",
    category: "North Indian",
    cuisine: ["North Indian", "Mughlai"],
    location: "Church Street",
    rating: 4.4,
    deliveryTime: "35-40 mins",
    image: "/restaurants/empire.jpg",
    heroImage: "/restaurant-heroes/empire-hero.jpg",
    offerText: "Free naan with any curry order",
    categories: ["Kebabs", "Curries", "Biryani", "Breads"],
  },
  {
    id: 10,
    name: "Udupi Palace",
    slug: "udupi",
    category: "South Indian",
    cuisine: ["South Indian", "Vegetarian"],
    location: "Gandhi Bazaar",
    rating: 4.3,
    deliveryTime: "25-35 mins",
    image: "/restaurants/udupi.jpg",
    heroImage: "/restaurant-heroes/udupi-hero.jpg",
    offerText: "Free filter coffee on orders above Rs199",
    categories: ["Dosas", "Idli", "Vada", "Beverages"],
  },
  {
    id: 11,
    name: "Vidyarthi Bhavan",
    slug: "vidyarthi",
    category: "South Indian",
    cuisine: ["South Indian", "Vegetarian"],
    location: "Gandhi Bazaar",
    rating: 4.6,
    deliveryTime: "30-40 mins",
    image: "/restaurants/vidyarthi.jpg",
    heroImage: "/restaurant-heroes/vidyarthi-hero.jpg",
    offerText: "Special Saturday thali available",
    categories: ["Dosas", "Idli", "Pongal", "Sweets"],
  },
  {
    id: 12,
    name: "Punjab Grill",
    slug: "punjab-grill",
    category: "North Indian",
    cuisine: ["North Indian", "Punjabi"],
    location: "UB City",
    rating: 4.3,
    deliveryTime: "35-45 mins",
    image: "/restaurants/punjab-grill.jpg",
    heroImage: "/restaurant-heroes/punjab-grill-hero.jpg",
    offerText: "Free raita on orders above Rs500",
    categories: ["Tandoor", "Curries", "Breads", "Desserts"],
  },
  {
    id: 13,
    name: "EatFit",
    slug: "eatfit",
    category: "Salad",
    cuisine: ["Healthy", "Salads", "Bowls"],
    location: "Koramangala",
    rating: 4.2,
    deliveryTime: "25-30 mins",
    image: "/restaurants/eatfit.jpg",
    heroImage: "/restaurant-heroes/eatfit-hero.jpg",
    offerText: "10% off on all health bowls",
    categories: ["Bowls", "Salads", "Wraps", "Juices"],
  },
  {
    id: 14,
    name: "FreshMenu",
    slug: "freshmenu",
    category: "Salad",
    cuisine: ["Continental", "Healthy"],
    location: "HSR Layout",
    rating: 4.1,
    deliveryTime: "30-35 mins",
    image: "/restaurants/freshmenu.jpg",
    heroImage: "/restaurant-heroes/freshmenu-hero.jpg",
    offerText: "Free dessert on orders above Rs400",
    categories: ["Mains", "Salads", "Soups", "Desserts"],
  },
  {
    id: 15,
    name: "Corner House",
    slug: "corner-house",
    category: "Desserts",
    cuisine: ["Desserts", "Ice Cream"],
    location: "Basavanagudi",
    rating: 4.5,
    deliveryTime: "20-30 mins",
    image: "/restaurants/corner-house.jpg",
    heroImage: "/restaurant-heroes/corner-house-hero.jpg",
    offerText: "Special Death by Chocolate combos",
    categories: ["Ice Cream", "Sundaes", "Shakes", "Waffles"],
  },
  {
    id: 16,
    name: "Polar Bear",
    slug: "polar-bear",
    category: "Desserts",
    cuisine: ["Desserts", "Beverages"],
    location: "Jayanagar",
    rating: 4.3,
    deliveryTime: "20-25 mins",
    image: "/restaurants/polar-bear.jpg",
    heroImage: "/restaurant-heroes/polar-bear-hero.jpg",
    offerText: "Free topping on ice cream orders",
    categories: ["Ice Cream", "Sundaes", "Cold Coffee", "Shakes"],
  },
  {
    id: 17,
    name: "Hae Kum Gang",
    slug: "hae-kum-gang",
    category: "Korean",
    cuisine: ["Korean", "Asian"],
    location: "Indiranagar",
    rating: 4.4,
    deliveryTime: "35-45 mins",
    image: "/restaurants/hae-kum-gang.jpg",
    heroImage: "/restaurant-heroes/hae-kum-gang-hero.jpg",
    offerText: "Free kimchi with every order",
    categories: ["Rice", "Noodles", "BBQ", "Soups"],
  },
];

if (!localStorage.getItem('cibo_restaurants')) {
  localStorage.setItem('cibo_restaurants', JSON.stringify(DEFAULT_RESTAURANTS));
}

const getLocalStorageRestaurants = () => {
  try {
    const data = localStorage.getItem('cibo_restaurants');
    return data ? JSON.parse(data) : DEFAULT_RESTAURANTS;
  } catch (e) {
    console.error("Failed to read cibo_restaurants from localStorage", e);
    return DEFAULT_RESTAURANTS;
  }
};

export const RESTAURANTS = getLocalStorageRestaurants();

export const saveRestaurantsToStorage = (restaurants) => {
  try {
    localStorage.setItem('cibo_restaurants', JSON.stringify(restaurants));
    RESTAURANTS.length = 0;
    RESTAURANTS.push(...restaurants);
  } catch (e) {
    console.error("Failed to save cibo_restaurants to localStorage", e);
  }
};

export const CATEGORIES = [
  { name: "All", image: "/categories/all-category.png" },
  { name: "North Indian", image: "/categories/north.jpg" },
  { name: "South Indian", image: "/categories/south.jpg" },
  { name: "Desserts", image: "/categories/dessert.jpg" },
  { name: "Biryani", image: "/categories/biryani.jpg" },
  { name: "Chinese", image: "/categories/chinese.jpg" },
  { name: "Pizza", image: "/categories/pizza.jpg" },
  { name: "Burgers", image: "/categories/burger.jpg" },
  { name: "Salad", image: "/categories/salad.jpg" },
  { name: "Korean", image: "/categories/korean.jpg" },
];

export const getRestaurantBySlug = (slug) =>
  RESTAURANTS.find((r) => r.slug === slug);

export const filterRestaurantsByCategory = (category) => {
  if (!category || category === "All") return RESTAURANTS;
  return RESTAURANTS.filter(
    (r) =>
      r.category === category ||
      r.cuisine.some((c) =>
        c.toLowerCase().includes(category.toLowerCase())
      )
  );
};

export const searchRestaurants = (query) => {
  if (!query) return RESTAURANTS;
  const q = query.toLowerCase();
  return RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.some((c) => c.toLowerCase().includes(q)) ||
      r.location.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
  );
};
