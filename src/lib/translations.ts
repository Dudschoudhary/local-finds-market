export type Language = 'en' | 'hi';

export const translations = {
  // Categories
  categories: {
    dairy: { en: 'Dairy & Ghee', hi: 'डेयरी और घी' },
    honey: { en: 'Honey & Natural', hi: 'शहद और प्राकृतिक' },
    spices: { en: 'Spices & Masalas', hi: 'मसाले' },
    pickles: { en: 'Pickles & Chutneys', hi: 'अचार और चटनी' },
    grains: { en: 'Grains & Flour', hi: 'अनाज और आटा' },
    oils: { en: 'Oils & Fats', hi: 'तेल और वसा' },
    sweets: { en: 'Sweets & Snacks', hi: 'मिठाई और नाश्ता' },
    vegetables: { en: 'Fresh Vegetables', hi: 'ताज़ी सब्जियां' },
    fruits: { en: 'Fresh Fruits', hi: 'ताज़े फल' },
    handicrafts: { en: 'Handicrafts', hi: 'हस्तशिल्प' },
  },

  // Hero Section
  hero: {
    badge: { en: 'Connecting local sellers with buyers', hi: 'स्थानीय विक्रेताओं को खरीदारों से जोड़ना' },
    title1: { en: 'Discover', hi: 'खोजें' },
    titleHighlight: { en: 'Fresh & Homemade', hi: 'ताज़ा और घरेलू' },
    title2: { en: 'Products Near You', hi: 'आपके पास उत्पाद' },
    description: {
      en: 'From pure desi ghee to organic honey, find authentic local products from trusted sellers in your area. Support small businesses and get quality you can trust.',
      hi: 'शुद्ध देसी घी से लेकर जैविक शहद तक, अपने क्षेत्र में विश्वसनीय विक्रेताओं से प्रामाणिक स्थानीय उत्पाद खोजें। छोटे व्यवसायों का समर्थन करें और विश्वसनीय गुणवत्ता प्राप्त करें।'
    },
    browseProducts: { en: 'Browse Products', hi: 'उत्पाद देखें' },
    startSelling: { en: 'Start Selling', hi: 'बेचना शुरू करें' },
    verifiedSellers: { en: 'Verified Sellers', hi: 'सत्यापित विक्रेता' },
    locationBased: { en: 'Location-Based', hi: 'स्थान-आधारित' },
    freshNatural: { en: 'Fresh & Natural', hi: 'ताज़ा और प्राकृतिक' },
  },

  // Index Page
  index: {
    browseByCategory: { en: 'Browse by Category', hi: 'श्रेणी के अनुसार ब्राउज़ करें' },
    categoryDescription: {
      en: 'Explore our wide range of authentic local products, from fresh dairy to handcrafted goods',
      hi: 'ताज़ी डेयरी से लेकर हस्तनिर्मित सामान तक, हमारे प्रामाणिक स्थानीय उत्पादों की विस्तृत श्रृंखला देखें'
    },
    featuredProducts: { en: 'Featured Products', hi: 'विशेष उत्पाद' },
    featuredDescription: { en: 'Handpicked quality products from trusted local sellers', hi: 'विश्वसनीय स्थानीय विक्रेताओं से चुने हुए गुणवत्ता वाले उत्पाद' },
    viewAll: { en: 'View All', hi: 'सभी देखें' },
    readyToSell: { en: 'Ready to Start Selling?', hi: 'बेचना शुरू करने के लिए तैयार?' },
    sellDescription: {
      en: "Join thousands of local sellers and reach customers in your area. It's free to list your products!",
      hi: 'हजारों स्थानीय विक्रेताओं से जुड़ें और अपने क्षेत्र में ग्राहकों तक पहुंचें। अपने उत्पादों को सूचीबद्ध करना मुफ्त है!'
    },
    listYourProduct: { en: 'List Your Product', hi: 'अपना उत्पाद सूचीबद्ध करें' },
  },

  // Footer
  footer: {
    tagline: {
      en: 'Connecting local sellers with nearby buyers. Fresh, homemade, and authentic desi products at your fingertips.',
      hi: 'स्थानीय विक्रेताओं को नज़दीकी खरीदारों से जोड़ना। ताज़ा, घरेलू और प्रामाणिक देसी उत्पाद आपकी उंगलियों पर।'
    },
    quickLinks: { en: 'Quick Links', hi: 'त्वरित लिंक' },
    browseProducts: { en: 'Browse Products', hi: 'उत्पाद देखें' },
    sellYourProduct: { en: 'Sell Your Product', hi: 'अपना उत्पाद बेचें' },
    howItWorks: { en: 'How It Works', hi: 'यह कैसे काम करता है' },
    aboutUs: { en: 'About Us', hi: 'हमारे बारे में' },
    categoriesTitle: { en: 'Categories', hi: 'श्रेणियां' },
    support: { en: 'Support', hi: 'सहायता' },
    helpCenter: { en: 'Help Center', hi: 'सहायता केंद्र' },
    contactUs: { en: 'Contact Us', hi: 'संपर्क करें' },
    privacyPolicy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    termsOfService: { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
    dmcaPolicy: { en: 'DMCA Policy', hi: 'DMCA नीति' },
    copyright: { en: '© 2026 DesiMart. All rights reserved.', hi: '© 2026 DesiMart. सर्वाधिकार सुरक्षित।' },
    madeWith: { en: 'Made with', hi: 'के साथ बनाया' },
    forCommunities: { en: 'for local communities', hi: 'स्थानीय समुदायों के लिए' },
  },

  // Add Product Page
  addProduct: {
    title: { en: 'List Your Product', hi: 'अपना उत्पाद सूचीबद्ध करें' },
    subtitle: { en: 'Fill in the details below to start selling or renting your product', hi: 'अपना उत्पाद बेचने या किराए पर देने के लिए नीचे विवरण भरें' },
    sell: { en: 'Sell', hi: 'बेचें' },
    rent: { en: 'Rent', hi: 'किराया' },
    sellerName: { en: 'Seller Name', hi: 'विक्रेता का नाम' },
    rentName: { en: 'Rent Name', hi: 'किराए का नाम' },
    enterSellerName: { en: 'Enter seller name or business', hi: 'विक्रेता का नाम या व्यवसाय दर्ज करें' },
    enterRentName: { en: 'Enter contact name for rental', hi: 'किराए के लिए संपर्क नाम दर्ज करें' },
    contactNumber: { en: 'Contact Number', hi: 'संपर्क नंबर' },
    productName: { en: 'Product Name', hi: 'उत्पाद का नाम' },
    productNamePlaceholder: { en: 'e.g., Pure Desi Cow Ghee', hi: 'उदा., शुद्ध देसी गाय का घी' },
    category: { en: 'Category', hi: 'श्रेणी' },
    selectCategory: { en: 'Select a category', hi: 'एक श्रेणी चुनें' },
    quantity: { en: 'Quantity', hi: 'मात्रा' },
    price: { en: 'Price (₹)', hi: 'कीमत (₹)' },
    rentalPrice: { en: 'Rental Price (₹)', hi: 'किराया मूल्य (₹)' },
    rentalItemType: { en: 'Rental Item Type', hi: 'किराये की वस्तु का प्रकार' },
    machine: { en: 'Machine', hi: 'मशीन' },
    vehicle: { en: 'Vehicle', hi: 'वाहन' },
    shop: { en: 'Shop', hi: 'दुकान' },
    room: { en: 'Room', hi: 'कमरा' },
    other: { en: 'Other', hi: 'अन्य' },
    item: { en: 'Item', hi: 'वस्तु' },
    combo: { en: 'Combo', hi: 'कॉम्बो' },
    productImages: { en: 'Product Images', hi: 'उत्पाद की छवियां' },
    upTo: { en: 'up to', hi: 'अधिकतम' },
    clickToUpload: { en: 'Click to upload product images', hi: 'उत्पाद छवियां अपलोड करने के लिए क्लिक करें' },
    addMoreImages: { en: 'Add more images', hi: 'और छवियां जोड़ें' },
    remaining: { en: 'remaining', hi: 'शेष' },
    imageSize: { en: 'PNG, JPG up to 1MB each', hi: 'PNG, JPG प्रत्येक 1MB तक' },
    main: { en: 'Main', hi: 'मुख्य' },
    description: { en: 'Description', hi: 'विवरण' },
    descriptionPlaceholder: { en: 'Describe your product, its quality, how it\'s made, etc.', hi: 'अपने उत्पाद, उसकी गुणवत्ता, कैसे बना है, आदि का वर्णन करें' },
    address: { en: 'Address / Location', hi: 'पता / स्थान' },
    addressPlaceholder: { en: 'e.g., Anand, Gujarat', hi: 'उदा., आनंद, गुजरात' },
    useGPS: { en: 'Use GPS', hi: 'GPS उपयोग करें' },
    locating: { en: 'Locating…', hi: 'स्थान खोज रहे हैं…' },
    gpsNote: { en: 'Capture your live GPS location. This will be saved with the product.', hi: 'अपना लाइव GPS स्थान कैप्चर करें। यह उत्पाद के साथ सहेजा जाएगा।' },
    clear: { en: 'Clear', hi: 'साफ़ करें' },
    listProduct: { en: 'List Product', hi: 'उत्पाद सूचीबद्ध करें' },
    listingProduct: { en: 'Listing Product...', hi: 'उत्पाद सूचीबद्ध हो रहा है...' },
  },

  // Product Card
  productCard: {
    perUnit: { en: 'per', hi: 'प्रति' },
    sold: { en: 'Sold', hi: 'बिक गया' },
    rented: { en: 'Rented', hi: 'किराये पर' },
    available: { en: 'Available', hi: 'उपलब्ध' },
    forRent: { en: 'For Rent', hi: 'किराये के लिए' },
  },

  // Products Page
  products: {
    title: { en: 'All Products', hi: 'सभी उत्पाद' },
    searchPlaceholder: { en: 'Search products...', hi: 'उत्पाद खोजें...' },
    allCategories: { en: 'All Categories', hi: 'सभी श्रेणियां' },
    noProducts: { en: 'No products found', hi: 'कोई उत्पाद नहीं मिला' },
    tryDifferent: { en: 'Try a different search or category', hi: 'कोई अन्य खोज या श्रेणी आज़माएं' },
    productsFound: { en: 'products found', hi: 'उत्पाद मिले' },
  },

  // Product Detail Page
  productDetail: {
    backToProducts: { en: 'Back to Products', hi: 'उत्पादों पर वापस' },
    seller: { en: 'Seller', hi: 'विक्रेता' },
    contact: { en: 'Contact', hi: 'संपर्क' },
    location: { en: 'Location', hi: 'स्थान' },
    listedOn: { en: 'Listed on', hi: 'सूचीबद्ध' },
    callSeller: { en: 'Call Seller', hi: 'विक्रेता को कॉल करें' },
    whatsapp: { en: 'WhatsApp', hi: 'व्हाट्सएप' },
    productNotFound: { en: 'Product not found', hi: 'उत्पाद नहीं मिला' },
    getDirections: { en: 'Get Directions', hi: 'दिशा-निर्देश प्राप्त करें' },
  },

  // Dashboard
  dashboard: {
    title: { en: 'My Dashboard', hi: 'मेरा डैशबोर्ड' },
    myListings: { en: 'My Listings', hi: 'मेरी सूची' },
    noListings: { en: 'You have no listings yet', hi: 'आपकी अभी तक कोई सूची नहीं है' },
    addFirst: { en: 'Add your first product', hi: 'अपना पहला उत्पाद जोड़ें' },
    edit: { en: 'Edit', hi: 'संपादित करें' },
    delete: { en: 'Delete', hi: 'हटाएं' },
    markAsSold: { en: 'Mark as Sold', hi: 'बिका हुआ चिह्नित करें' },
    markAsAvailable: { en: 'Mark as Available', hi: 'उपलब्ध चिह्नित करें' },
  },

  // Auth Page
  auth: {
    welcome: { en: 'Welcome', hi: 'स्वागत है' },
    login: { en: 'Login', hi: 'लॉगिन' },
    register: { en: 'Register', hi: 'पंजीकरण' },
    name: { en: 'Name', hi: 'नाम' },
    password: { en: 'Password', hi: 'पासवर्ड' },
    confirmPassword: { en: 'Confirm Password', hi: 'पासवर्ड की पुष्टि करें' },
    enterName: { en: 'Enter your name', hi: 'अपना नाम दर्ज करें' },
    enterPhone: { en: 'Enter your phone number', hi: 'अपना फोन नंबर दर्ज करें' },
    enterPassword: { en: 'Enter your password', hi: 'अपना पासवर्ड दर्ज करें' },
    continue: { en: 'Continue', hi: 'जारी रखें' },
    checking: { en: 'Checking...', hi: 'जांच हो रही है...' },
  },

  // Common
  common: {
    loading: { en: 'Loading...', hi: 'लोड हो रहा है...' },
    error: { en: 'Error', hi: 'त्रुटि' },
    success: { en: 'Success', hi: 'सफलता' },
    required: { en: 'Required', hi: 'आवश्यक' },
    optional: { en: 'Optional', hi: 'वैकल्पिक' },
  },

  // Units
  units: {
    kg: { en: 'kg', hi: 'किलो' },
    gm: { en: 'gm', hi: 'ग्राम' },
    liter: { en: 'liter', hi: 'लीटर' },
    quintal: { en: 'quintal', hi: 'क्विंटल' },
    dhara: { en: 'dhara', hi: 'धारा' },
    man: { en: 'man', hi: 'मन' },
    piece: { en: 'piece', hi: 'पीस' },
    perKg: { en: 'per kg', hi: 'प्रति किलो' },
    perGm: { en: 'per gm', hi: 'प्रति ग्राम' },
    perLiter: { en: 'per liter', hi: 'प्रति लीटर' },
    perQuintal: { en: 'per quintal', hi: 'प्रति क्विंटल' },
    perDhara: { en: 'per dhara', hi: 'प्रति धारा' },
    perMan: { en: 'per man', hi: 'प्रति मन' },
    perPiece: { en: 'per piece', hi: 'प्रति पीस' },
    perKm: { en: 'per km', hi: 'प्रति किमी' },
    perDay: { en: 'per day', hi: 'प्रति दिन' },
    perMonth: { en: 'per month', hi: 'प्रति माह' },
  },

  // Toast Messages
  toasts: {
    locationCaptured: { en: 'Location captured', hi: 'स्थान कैप्चर किया गया' },
    locationError: { en: 'Unable to retrieve location', hi: 'स्थान प्राप्त करने में असमर्थ' },
    geoNotSupported: { en: 'Geolocation is not supported by your browser', hi: 'आपका ब्राउज़र जियोलोकेशन का समर्थन नहीं करता' },
    productListed: { en: 'Product listed successfully!', hi: 'उत्पाद सफलतापूर्वक सूचीबद्ध!' },
    productVisible: { en: 'Your product is now visible to buyers.', hi: 'आपका उत्पाद अब खरीदारों को दिखाई दे रहा है।' },
    enterSellerName: { en: 'Please enter seller name', hi: 'कृपया विक्रेता का नाम दर्ज करें' },
    enterRentName: { en: 'Please enter rent contact name', hi: 'कृपया किराए का संपर्क नाम दर्ज करें' },
    enterContact: { en: 'Please enter contact number', hi: 'कृपया संपर्क नंबर दर्ज करें' },
    enterProductName: { en: 'Please enter product name', hi: 'कृपया उत्पाद का नाम दर्ज करें' },
    selectCategory: { en: 'Please select a category', hi: 'कृपया एक श्रेणी चुनें' },
    captureLocation: { en: 'Please capture your live location using the "Use GPS" button', hi: 'कृपया "GPS उपयोग करें" बटन का उपयोग करके अपना लाइव स्थान कैप्चर करें' },
    enterPrice: { en: 'Please enter a price for sale listings', hi: 'कृपया बिक्री सूची के लिए कीमत दर्ज करें' },
    enterRentalPrice: { en: 'Please enter a rental price for rent listings', hi: 'कृपया किराया सूची के लिए किराया मूल्य दर्ज करें' },
    largeImage: { en: 'Large image detected — compressing...', hi: 'बड़ी छवि मिली — संपीड़ित हो रहा है...' },
    compressError: { en: 'Unable to compress image under 1MB; please choose a smaller image', hi: 'छवि को 1MB से कम संपीड़ित करने में असमर्थ; कृपया छोटी छवि चुनें' },
    onlyImages: { en: 'Only image files are allowed', hi: 'केवल छवि फ़ाइलों की अनुमति है' },
    imageProcessError: { en: 'Failed to process one of the images', hi: 'छवियों में से एक को संसाधित करने में विफल' },
    maxImages: { en: 'You can only upload', hi: 'आप केवल अपलोड कर सकते हैं' },
    imagesWillBeAdded: { en: 'images. Only first', hi: 'छवियां। केवल पहली' },
    willBeAdded: { en: 'will be added.', hi: 'जोड़ी जाएगी।' },
  },
};

export const getTranslation = (
  path: string,
  lang: Language
): string => {
  const keys = path.split('.');
  let value: any = translations;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return path if translation not found
    }
  }
  
  if (value && typeof value === 'object' && lang in value) {
    return value[lang];
  }
  
  return path;
};
