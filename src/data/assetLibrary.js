import { RESTAURANTS } from './restaurants';
import { MENU_ITEMS } from './menuItems';

const restaurantsObj = {};
const heroesObj = {};
const menuObj = {};

// Populate from restaurants
RESTAURANTS.forEach((r) => {
  restaurantsObj[r.slug] = r.image;
  if (r.heroImage) {
    heroesObj[`${r.slug}-hero`] = r.heroImage;
  }
});

// Populate from menu items
Object.entries(MENU_ITEMS).forEach(([slug, items]) => {
  items.forEach((item) => {
    const cleanName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const key = `${slug}-${cleanName}`;
    menuObj[key] = item.image;
  });
});

export const IMAGE_LIBRARY = {
  restaurants: restaurantsObj,
  heroes: heroesObj,
  menu: menuObj
};

export const getImage = (type, key, fallback) => {
  if (!key) return fallback || '/logo.png';
  if (key.startsWith('/') || key.startsWith('http')) {
    return key;
  }
  if (IMAGE_LIBRARY[type] && IMAGE_LIBRARY[type][key]) {
    return IMAGE_LIBRARY[type][key];
  }
  return fallback || '/logo.png';
};
