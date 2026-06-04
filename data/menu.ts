// Menu seed data — single source of truth for /menu and Home signature dishes.
// Prices in AUD. spice: 0 = none, 1 = mild, 2 = medium, 3 = hot, 4 = fiery.

export type Category =
  | 'Entrées'
  | 'Vegetarian Mains'
  | 'Non-Vegetarian Mains'
  | 'Noodles & Rice'
  | 'Drinks';

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  vegetarian?: boolean;
  spice?: 0 | 1 | 2 | 3 | 4;
  popular?: boolean;
  signature?: boolean;
  national?: boolean;
};

export const categories: Category[] = [
  'Entrées',
  'Vegetarian Mains',
  'Non-Vegetarian Mains',
  'Noodles & Rice',
  'Drinks',
];

export const menu: MenuItem[] = [
  // ENTRÉES
  { id: 'beef-momo', name: 'Beef Momo', category: 'Entrées', price: 15.0,
    description: 'Hand-pleated dumplings with seasoned beef, ginger, onion and coriander. Served with ezay.',
    spice: 1, popular: true, signature: true },
  { id: 'chicken-momo', name: 'Chicken Momo', category: 'Entrées', price: 15.0,
    description: 'Tender chicken in a delicate wrapper. Served with ezay.', spice: 1, popular: true },
  { id: 'pork-momo', name: 'Pork Momo', category: 'Entrées', price: 15.0,
    description: 'Slow-cooked pork, ginger and shallots, hand-pleated. Served with ezay.', spice: 1 },
  { id: 'veg-momo', name: 'Vegetarian Momo', category: 'Entrées', price: 15.0,
    description: 'Cheese, cabbage, ginger, coriander and soya chunks. Served with ezay.',
    vegetarian: true, spice: 1 },
  { id: 'steamed-dumpling', name: 'Steamed Dumpling', category: 'Entrées', price: 15.0,
    description: 'Choose vegetable, beef, pork or chicken filling.' },
  { id: 'fried-dumpling', name: 'Fried Dumpling', category: 'Entrées', price: 17.0,
    description: 'Golden, crispy dumplings — choose vegetable, beef, pork or chicken.' },
  { id: 'platter', name: 'Momo / Dumpling Platter (15 pcs)', category: 'Entrées', price: 37.0,
    description: '5 steamed, 5 fried, 5 chilli. Choose vegetable, beef, pork or chicken.',
    popular: true, signature: true, spice: 2 },
  { id: 'jumma-chilli', name: 'Jumma Chilli', category: 'Entrées', price: 17.5,
    description: 'Bhutanese beef sausage with onion, tomato, garlic, shallots and soya.', spice: 3 },
  { id: 'pork-sausage', name: 'Pork Sausage (4 pcs)', category: 'Entrées', price: 17.0,
    description: 'Grilled, seasoned with garlic, lemongrass, chilli and cilantro. Tangy dipping sauce.', spice: 2 },
  { id: 'crispy-potato', name: 'Crispy Potato Chilli', category: 'Entrées', price: 13.5,
    description: 'Battered potato tossed in sticky-sweet sauce with garlic, sesame and shallots.',
    vegetarian: true, spice: 2, signature: true },
  { id: 'chips', name: 'Chips', category: 'Entrées', price: 9.5,
    description: 'Golden-brown potato chips.', vegetarian: true },

  // VEGETARIAN MAINS
  { id: 'ema-datshi', name: 'Ema Datshi', category: 'Vegetarian Mains', price: 17.5,
    description: 'Green chilli, garlic, tomato and onion melted with farmhouse cheese.',
    vegetarian: true, spice: 4, national: true, signature: true, popular: true },
  { id: 'kewa-datshi', name: 'Kewa Datshi', category: 'Vegetarian Mains', price: 16.0,
    description: 'Potato cooked with green chilli, tomato, onion and cheese.',
    vegetarian: true, spice: 2 },
  { id: 'shamu-datshi', name: 'Shamu Datshi', category: 'Vegetarian Mains', price: 16.0,
    description: 'Mushroom with green chilli, tomato, onion and cheese.', vegetarian: true, spice: 2 },
  { id: 'mixed-veg', name: 'Mixed Vegetable', category: 'Vegetarian Mains', price: 16.0,
    description: 'Carrot, beans and cauliflower stir-fried in butter.', vegetarian: true },
  { id: 'asparagus', name: 'Asparagus Butter Fry', category: 'Vegetarian Mains', price: 16.0,
    description: 'Crisp asparagus stir-fried in butter.', vegetarian: true },

  // NON-VEG MAINS
  { id: 'shakam-gravy', name: 'Shakam Gravy', category: 'Non-Vegetarian Mains', price: 25.5,
    description: 'Diced dried beef simmered with green chilli, onion, tomato and cheese.', spice: 3 },
  { id: 'sikam-datshi-gravy', name: 'Sikam Datshi Gravy', category: 'Non-Vegetarian Mains', price: 25.5,
    description: 'Diced dried pork with green chilli, onion, tomato and cheese.', spice: 3 },
  { id: 'sikam-paa', name: 'Sikam Paa', category: 'Non-Vegetarian Mains', price: 25.5,
    description: 'Dried pork with red chilli, onion, tomato, ginger, garlic and vegetables.', spice: 4 },
  { id: 'shakam-paa', name: 'Shakam Paa', category: 'Non-Vegetarian Mains', price: 25.5,
    description: 'Dried beef with red chilli, onion, tomato, ginger, garlic and vegetables.', spice: 4 },
  { id: 'beef-chilli', name: 'Beef Chilli', category: 'Non-Vegetarian Mains', price: 23.0,
    description: 'Deep-fried beef tossed with tomato, ginger, garlic, onion, green chilli and soy.', spice: 3 },
  { id: 'pork-chilli', name: 'Pork Chilli', category: 'Non-Vegetarian Mains', price: 23.0,
    description: 'Deep-fried pork tossed with tomato, ginger, garlic, onion, green chilli and soy.', spice: 3 },
  { id: 'chicken-chilli', name: 'Chicken Chilli', category: 'Non-Vegetarian Mains', price: 23.0,
    description: 'Deep-fried chicken tossed with tomato, ginger, garlic, onion, green chilli and soy.', spice: 3 },
  { id: 'jasha-maru', name: 'Jasha Maru', category: 'Non-Vegetarian Mains', price: 23.0,
    description: 'Chicken cooked with onion, ginger, tomato, garlic, coriander and green chilli.', spice: 2 },
  { id: 'pork-ribs-paa', name: 'Pork Ribs Paa', category: 'Non-Vegetarian Mains', price: 23.0,
    description: 'Dried pork ribs slow-cooked with red chilli, onion, tomato, ginger, garlic, shallots.',
    spice: 4, popular: true, signature: true },
  { id: 'chicken-paa', name: 'Chicken Paa', category: 'Non-Vegetarian Mains', price: 23.5,
    description: 'Chicken with red dry chilli, onion, tomato, garlic and ginger.', spice: 4 },
  { id: 'beef-paa', name: 'Beef Paa', category: 'Non-Vegetarian Mains', price: 23.5,
    description: 'Beef with red dry chilli, onion, tomato, garlic and ginger.', spice: 4 },
  { id: 'pork-paa', name: 'Pork Paa', category: 'Non-Vegetarian Mains', price: 23.5,
    description: 'Pork with red dry chilli, onion, tomato, garlic and ginger.', spice: 4 },
  { id: 'gondo-datshi', name: 'Gondo Datshi', category: 'Non-Vegetarian Mains', price: 17.5,
    description: 'Egg, rich cheese and creamy butter — comfort in a bowl.', spice: 1 },

  // NOODLES & RICE
  { id: 'bathup', name: 'Bathup', category: 'Noodles & Rice', price: 21.0,
    description: 'Bhutanese noodle soup with meat or egg, onion, tomato and shallots.', signature: true },
  { id: 'chow-mein', name: 'Chow Mein', category: 'Noodles & Rice', price: 20.0,
    description: 'Stir-fried noodles with meat or egg, cabbage, onion, tomato, carrot and soy.', popular: true },
  { id: 'koka-chow-mein', name: 'Koka Chow Mein', category: 'Noodles & Rice', price: 20.0,
    description: 'Koka noodles with beef or egg, cabbage, carrot and shallots.' },
  { id: 'fried-rice', name: 'Fried Rice', category: 'Noodles & Rice', price: 22.0,
    description: 'Rice with onion, tomato, carrot, corn, peas, egg and soya sauce.' },

  // DRINKS
  { id: 'soft-drink', name: 'Soft Drink', category: 'Drinks', price: 4.0,
    description: 'Chilled carbonated soft drink.' },
  { id: 'water', name: 'Water', category: 'Drinks', price: 4.0,
    description: 'Still or sparkling.' },
];

export const signatureDishes = menu.filter((m) => m.signature).slice(0, 6);

export function spiceLabel(level: 0 | 1 | 2 | 3 | 4 | undefined): string {
  return ['No spice', 'Mild', 'Medium', 'Hot', 'Fiery'][level ?? 0];
}
