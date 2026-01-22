// Re-export category types and helpers from the centralized categories file
export { 
  type ProductCategory, 
  categoryLabels, 
  categoryIcons,
  categories,
  getCategoryName,
  getCategoryIcon,
  getCategoryById,
  getSubCategoryById,
  getFlatCategoryList,
  getGroupedCategories,
} from '@/data/categories';

export interface Product {
  id: string;
  sellerName: string;
  contactNumber: string;
  productName: string;
  category: string; // Now supports all main and sub-category IDs
  subCategory?: string; // Optional sub-category for more specific categorization
  quantity: string;
  images: string[]; // Array of image URLs
  description: string;
  price?: number; // optional; rental listings use rentalPrice
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

  // Listing type: sale or rent
  listingType?: 'sale' | 'rent';
  // Rental specific fields
  rentalType?: RentalType;
  rentalStatus?: 'available' | 'rented';
  rentalPrice?: number;

  // Unit fields
  quantityUnit?: string;
  quantityMode?: 'item' | 'combo';
  priceUnit?: string;
}

export type RentalType = 'machine' | 'vehicle' | 'shop' | 'room' | 'other';
