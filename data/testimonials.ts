export type Testimonial = {
  quote: string;
  author: string;
  rating: number; // out of 5
  source?: 'Google' | 'Facebook';
};

export const testimonials: Testimonial[] = [
  { quote: 'One of the finest Bhutanese restaurants in Canberra.', author: 'Rinchen Dorji', rating: 5, source: 'Google' },
  { quote: 'The food’s great, the staff’s great, and the atmosphere is awesome — it feels like we’re back in Bhutan.', author: 'Ugyen G. Wangchuk', rating: 5, source: 'Google' },
  { quote: 'Portions are generous and prices are fair. Service is warm and unhurried — feels like eating at home.', author: 'Nima Tshering', rating: 5, source: 'Google' },
  { quote: 'Amazing food, every dish was spectacular… the ribs were to die for.', author: 'Christopher Farmer', rating: 5, source: 'Google' },
  { quote: 'I tasted both today — the taste of food and the taste of heart. I loved both.', author: 'Tshewang Dorji', rating: 5, source: 'Facebook' },
  { quote: 'Best dumplings we’ve ever had! Completely unique cuisine.', author: 'Robert Schmidli', rating: 5, source: 'Google' },
  { quote: 'Authentic Bhutanese food in Canberra.', author: 'Pila Namgye', rating: 5, source: 'Google' },
];

// [PLACEHOLDER] — replace with the live figure (Places API or manual).
export const aggregateRating = { value: 4.6, count: 187 };
