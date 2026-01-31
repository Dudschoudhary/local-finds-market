// Category structure for LocalMart
// Supports Hindi + English with icons - Accordion/Mega Menu style

export interface SubCategory {
  id: string;
  name: { en: string; hi: string };
  subItems?: SubCategory[]; // For nested sub-categories
}

export interface Category {
  id: string;
  name: { en: string; hi: string };
  icon: string;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: 'deshi-products',
    name: { en: 'Deshi Products', hi: 'देशी Product' },
    icon: '🥛',
    subCategories: [
      { 
        id: 'ghee', 
        name: { en: 'Ghee', hi: 'घी' },
        subItems: [
          { id: 'cow-ghee', name: { en: 'Cow Ghee', hi: 'गाय का घी' } },
          { id: 'buffalo-ghee', name: { en: 'Buffalo Ghee', hi: 'भैंस का घी' } },
        ]
      },
      { id: 'sangri', name: { en: 'Sangri', hi: 'सांगरी' } },
      { id: 'kumtha', name: { en: 'Kumtha', hi: 'कुमठा' } },
      { 
        id: 'milk', 
        name: { en: 'Milk', hi: 'दूध' },
        subItems: [
          { id: 'cow-milk', name: { en: 'Cow Milk', hi: 'गाय का दूध' } },
          { id: 'buffalo-milk', name: { en: 'Buffalo Milk', hi: 'भैंस का दूध' } },
          { id: 'goat-milk', name: { en: 'Goat Milk', hi: 'बकरी का दूध' } },
        ]
      },
      { id: 'dahi', name: { en: 'Dahi (Curd)', hi: 'दही' } },
    ],
  },
  {
    id: 'vegetables',
    name: { en: 'Vegetables', hi: 'सब्जियां' },
    icon: '🥬',
    subCategories: [
      { id: 'tamatar', name: { en: 'Tomato', hi: 'टमाटर' } },
      { id: 'gobi', name: { en: 'Cauliflower', hi: 'गोभी' } },
      { id: 'matar', name: { en: 'Peas', hi: 'मटर' } },
      { id: 'all-sabji', name: { en: 'All Vegetables', hi: 'सभी सब्जियां' } },
    ],
  },
  {
    id: 'seeds',
    name: { en: 'Seeds', hi: 'बीज' },
    icon: '🌱',
    subCategories: [
      { id: 'rejga', name: { en: 'Rijga', hi: 'रिजगा' } },
      { id: 'jeera', name: { en: 'Cumin Seeds', hi: 'जीरा' } },
      { id: 'arandi', name: { en: 'Castor Seeds', hi: 'अरंडी' } },
      { id: 'isabgol', name: { en: 'Psyllium', hi: 'इसबगोल' } },
      { id: 'rai-rayada', name: { en: 'Mustard Seeds', hi: 'राई / रायडा' } },
      { id: 'jawar-seeds', name: { en: 'Sorghum Seeds', hi: 'ज्वार बीज' } },
      { id: 'sarson', name: { en: 'Mustard', hi: 'सरसों' } },
      { id: 'pyaj-rop', name: { en: 'Onion Seedlings', hi: 'प्याज रोप' } },
      { id: 'methi', name: { en: 'Fenugreek Seeds', hi: 'मेथी' } },
      { id: 'other-seeds', name: { en: 'Other Seeds', hi: 'अन्य बीज' } },
    ],
  },
  {
    id: 'hara-chara',
    name: { en: 'Green Fodder', hi: 'हरा चारा' },
    icon: '🌿',
    subCategories: [
      { id: 'rijga', name: { en: 'Rijga', hi: 'रिजका' } },
      { id: 'rijga-bajri', name: { en: 'Rijga Bajri', hi: 'रिजका बाजरी' } },
      { id: 'jawar-hara', name: { en: 'Green Sorghum', hi: 'हरा ज्वार' } },
    ],
  },
  {
    id: 'sukha-chara',
    name: { en: 'Dry Fodder', hi: 'सूखा चारा' },
    icon: '🌾',
    subCategories: [
      { id: 'doka', name: { en: 'Doka', hi: 'डोका' } },
      { id: 'kutar', name: { en: 'Kutar', hi: 'कुतर' } },
      { id: 'gehu-chara', name: { en: 'Wheat Fodder', hi: 'गेहूं का चारा' } },
      { id: 'isabgol-chara', name: { en: 'Isabgol Fodder', hi: 'इसबगोल का चारा' } },
      { id: 'jawar-chara', name: { en: 'Sorghum Fodder', hi: 'ज्वार का चारा' } },
      { id: 'moongfali-chara', name: { en: 'Peanut Fodder', hi: 'मूंगफली का चारा' } },
    ],
  },
  {
    id: 'anaaj',
    name: { en: 'Grains', hi: 'अनाज' },
    icon: '🌾',
    subCategories: [
      { id: 'bajra', name: { en: 'Pearl Millet', hi: 'बाजरा' } },
      { id: 'gehu', name: { en: 'Wheat', hi: 'गेहूं' } },
      { id: 'chana', name: { en: 'Chickpea', hi: 'चना' } },
      { id: 'moong', name: { en: 'Moong Dal', hi: 'मूंग' } },
      { id: 'moth', name: { en: 'Moth Bean', hi: 'मोठ' } },
      { id: 'til', name: { en: 'Sesame', hi: 'तिल' } },
    ],
  },
  {
    id: 'lakdi-vastue',
    name: { en: 'Wooden Items', hi: 'लकड़ी की वस्तुएं' },
    icon: '🪵',
    subCategories: [
      { id: 'charpai', name: { en: 'Charpai (Cot)', hi: 'चारपाई' } },
      { id: 'window', name: { en: 'Window', hi: 'खिड़की' } },
      { id: 'door', name: { en: 'Door', hi: 'दरवाज़ा' } },
      { id: 'other-wooden', name: { en: 'Other Wooden Items', hi: 'अन्य लकड़ी की वस्तुएं' } },
    ],
  },
  {
    id: 'krishi-upkaran',
    name: { en: 'Agriculture Equipment', hi: 'कृषि उपकरण' },
    icon: '🚜',
    subCategories: [
      { id: 'tavi', name: { en: 'Tavi', hi: 'तवी' } },
      { id: 'trilli', name: { en: 'Trolley', hi: 'ट्रॉली' } },
      { id: 'kalti-wetter', name: { en: 'Kalti Wetter', hi: 'कल्टी वेटर' } },
      { id: 'hera', name: { en: 'Hera', hi: 'हेरा' } },
      { id: 'thresher', name: { en: 'Thresher', hi: 'थ्रेशर' } },
      { id: 'kutar-machine', name: { en: 'Kutar Machine', hi: 'कुतर मशीन' } },
    ],
  },
  {
    id: 'vehicles',
    name: { en: 'Vehicles', hi: 'वाहन' },
    icon: '🚗',
    subCategories: [
      { id: 'cycle', name: { en: 'Cycle', hi: 'साइकिल' } },
      { id: 'motorcycle', name: { en: 'Motorcycle', hi: 'मोटरसाइकिल' } },
      { id: 'tractor', name: { en: 'Tractor', hi: 'ट्रैक्टर' } },
      { id: 'jeep', name: { en: 'Jeep', hi: 'जीप' } },
      { id: 'trolley-vehicle', name: { en: 'Trolley', hi: 'ट्रॉली' } },
      { id: 'car', name: { en: 'Car', hi: 'कार' } },
      { id: 'bus', name: { en: 'Bus', hi: 'बस' } },
      { id: 'truck', name: { en: 'Truck', hi: 'ट्रक' } },
    ],
  },
  {
    id: 'construction',
    name: { en: 'Construction Material', hi: 'मकान बनाने की सामग्री' },
    icon: '🏠',
    subCategories: [
      { id: 'bajri', name: { en: 'Gravel', hi: 'बजरी' } },
      { id: 'soling', name: { en: 'Soling Stone', hi: 'सोलिंग' } },
      { id: 'cement', name: { en: 'Cement', hi: 'सीमेंट' } },
    ],
  },
  {
    id: 'rent',
    name: { en: 'Rent', hi: 'किराया' },
    icon: '🔑',
    subCategories: [
      { id: 'rent-shop', name: { en: 'Shop', hi: 'दुकान' } },
      { id: 'rent-home', name: { en: 'Home', hi: 'घर' } },
      { id: 'rent-room', name: { en: 'Room', hi: 'कमरा' } },
      { id: 'rent-bus', name: { en: 'Bus', hi: 'बस' } },
      { id: 'rent-car', name: { en: 'Car', hi: 'कार' } },
      { id: 'rent-loading-vehicle', name: { en: 'Loading Vehicle', hi: 'लोडिंग वाहन' } },
      { id: 'rent-speaker', name: { en: 'Speaker (Mike Set)', hi: 'स्पीकर (माइक सेट)' } },
      { id: 'rent-ghoda-patiya', name: { en: 'Ghoda & Patiya', hi: 'घोड़ा और पाटिया' } },
      { id: 'rent-mixer', name: { en: 'Mixer', hi: 'मिक्सर' } },
      { id: 'rent-tractor', name: { en: 'Tractor', hi: 'ट्रैक्टर' } },
    ],
  },
];

// Helper function to get all category IDs (main + sub + nested)
export const getAllCategoryIds = (): string[] => {
  const ids: string[] = [];
  categories.forEach((cat) => {
    ids.push(cat.id);
    cat.subCategories.forEach((sub) => {
      ids.push(sub.id);
      sub.subItems?.forEach((item) => ids.push(item.id));
    });
  });
  return ids;
};

// Helper function to get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

// Helper function to get sub-category by ID
export const getSubCategoryById = (id: string): { main: Category; sub: SubCategory } | undefined => {
  for (const cat of categories) {
    const sub = cat.subCategories.find((s) => s.id === id);
    if (sub) {
      return { main: cat, sub };
    }
    // Check nested items
    for (const subCat of cat.subCategories) {
      const nested = subCat.subItems?.find((item) => item.id === id);
      if (nested) {
        return { main: cat, sub: nested };
      }
    }
  }
  return undefined;
};

// Helper function to get category name by ID and language
export const getCategoryName = (id: string, lang: 'en' | 'hi'): string => {
  // Check main categories
  const mainCat = getCategoryById(id);
  if (mainCat) return mainCat.name[lang];

  // Check sub-categories and nested items
  for (const cat of categories) {
    for (const sub of cat.subCategories) {
      if (sub.id === id) return sub.name[lang];
      const nested = sub.subItems?.find((item) => item.id === id);
      if (nested) return nested.name[lang];
    }
  }

  return id;
};

// Helper function to get category icon
export const getCategoryIcon = (id: string): string => {
  // Check main categories
  const mainCat = getCategoryById(id);
  if (mainCat) return mainCat.icon;

  // Check sub-categories (return parent icon)
  const subCat = getSubCategoryById(id);
  if (subCat) return subCat.main.icon;

  return '📦';
};

// Flat list of all categories for dropdowns
export const getFlatCategoryList = (lang: 'en' | 'hi'): { id: string; name: string; icon: string; isMain: boolean; level: number }[] => {
  const list: { id: string; name: string; icon: string; isMain: boolean; level: number }[] = [];
  
  categories.forEach((cat) => {
    list.push({
      id: cat.id,
      name: cat.name[lang],
      icon: cat.icon,
      isMain: true,
      level: 0,
    });
    
    cat.subCategories.forEach((sub) => {
      list.push({
        id: sub.id,
        name: sub.name[lang],
        icon: cat.icon,
        isMain: false,
        level: 1,
      });
      
      sub.subItems?.forEach((item) => {
        list.push({
          id: item.id,
          name: item.name[lang],
          icon: cat.icon,
          isMain: false,
          level: 2,
        });
      });
    });
  });
  
  return list;
};

// Get grouped categories for UI (with headers)
export const getGroupedCategories = (lang: 'en' | 'hi') => {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name[lang],
    icon: cat.icon,
    items: cat.subCategories.map((sub) => ({
      id: sub.id,
      name: sub.name[lang],
      subItems: sub.subItems?.map((item) => ({
        id: item.id,
        name: item.name[lang],
      })),
    })),
  }));
};

// Type for backward compatibility
export type ProductCategory = string;

// Legacy category labels (for backward compatibility)
export const categoryLabels: Record<string, string> = {};
export const categoryIcons: Record<string, string> = {};

// Populate legacy objects
categories.forEach((cat) => {
  categoryLabels[cat.id] = cat.name.en;
  categoryIcons[cat.id] = cat.icon;
  cat.subCategories.forEach((sub) => {
    categoryLabels[sub.id] = sub.name.en;
    categoryIcons[sub.id] = cat.icon;
    sub.subItems?.forEach((item) => {
      categoryLabels[item.id] = item.name.en;
      categoryIcons[item.id] = cat.icon;
    });
  });
});
