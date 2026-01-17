export interface Product {
  id: string;
  sellerName: string;
  contactNumber: string;
  productName: string;
  category: ProductCategory;
  quantity: string;
  images: string[]; // Array of image URLs
  description: string;
  price: number;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  // Optional owner id (user who listed the product)
  ownerId?: string;
  // Whether the product is sold
  isSold?: boolean;
}

export type ProductCategory = 
  | 'dairy'
  | 'honey'
  | 'spices'
  | 'pickles'
  | 'grains'
  | 'oils'
  | 'sweets'
  | 'vegetables'
  | 'fruits'
  | 'handicrafts';

export const categoryLabels: Record<ProductCategory, string> = {
  dairy: 'Dairy & Ghee',
  honey: 'Honey & Natural',
  spices: 'Spices & Masalas',
  pickles: 'Pickles & Chutneys',
  grains: 'Grains & Flour',
  oils: 'Oils & Fats',
  sweets: 'Sweets & Snacks',
  vegetables: 'Fresh Vegetables',
  fruits: 'Fresh Fruits',
  handicrafts: 'Handicrafts',
};

export const categoryIcons: Record<ProductCategory, string> = {
  dairy: '🥛',
  honey: '🍯',
  spices: '🌶️',
  pickles: '🥒',
  grains: '🌾',
  oils: '🫒',
  sweets: '🍬',
  vegetables: '🥬',
  fruits: '🍎',
  handicrafts: '🎨',
};
