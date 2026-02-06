import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { categories, getCategoryIcon } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, MapPin, Loader2, Phone, X, ImagePlus, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const MAX_IMAGES = 3;

// Helpers to read and compress images client-side so each image is under 1MB
const readFileAsDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const dataURLToBlob = (dataURL: string) => {
  const parts = dataURL.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || '';
  const binary = atob(parts[1]);
  const len = binary.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: mime });
};

const compressImage = async (file: File, maxBytes = 1024 * 1024): Promise<string> => {
  // If already small enough, just return original dataURL
  if (file.size <= maxBytes) return readFileAsDataURL(file);

  const originalDataUrl = await readFileAsDataURL(file);

  // Create image
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = originalDataUrl;
  });

  // Start with original dimensions
  let [width, height] = [img.width, img.height];

  // Work on a canvas and iteratively reduce quality and size until under maxBytes
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not available');

  // If input is PNG (possibly with transparency), we'll convert to JPEG for compression
  const isPng = file.type === 'image/png';

  let quality = 0.92;
  let dataUrl = '';

  // Try reducing quality first, then dimensions if needed
  for (let attempt = 0; attempt < 12; attempt++) {
    // On certain attempts reduce dimensions
    if (attempt > 6) {
      width = Math.round(width * 0.85);
      height = Math.round(height * 0.85);
    }

    canvas.width = width;
    canvas.height = height;
    // clear + draw
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    // Convert to jpeg to get better compression; keep original mime if small transparency isn't a concern
    const mimeType = isPng ? 'image/jpeg' : (file.type || 'image/jpeg');
    dataUrl = canvas.toDataURL(mimeType, quality);
    const blob = dataURLToBlob(dataUrl);
    if (blob.size <= maxBytes) return dataUrl;

    // reduce quality for next iteration
    quality = Math.max(quality - 0.1, 0.35);
  }

  // Final fallback: return what we have even if slightly over limit
  return dataUrl || originalDataUrl;
};

// Category Picker Accordion Component
interface CategoryPickerAccordionProps {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
}

const CategoryPickerAccordion = ({ selectedCategory, onSelect }: CategoryPickerAccordionProps) => {
  const { language, getCategoryLabel } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [openMainCategory, setOpenMainCategory] = useState<string | null>(null);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
  
  // Ref for scrolling
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const categoryRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMainCategoryClick = (categoryId: string) => {
    if (openMainCategory === categoryId) {
      setOpenMainCategory(null);
      setOpenSubCategory(null);
    } else {
      setOpenMainCategory(categoryId);
      setOpenSubCategory(null);
      
      // Scroll to the clicked category within the dropdown
      setTimeout(() => {
        const element = categoryRefs.current[categoryId];
        if (element && dropdownRef.current) {
          const dropdown = dropdownRef.current;
          const elementTop = element.offsetTop;
          dropdown.scrollTo({
            top: Math.max(0, elementTop - 10),
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  };

  const handleSubCategoryClick = (subId: string, hasSubItems: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasSubItems) {
      // Toggle sub-category expansion
      if (openSubCategory === subId) {
        setOpenSubCategory(null);
      } else {
        setOpenSubCategory(subId);
      }
    } else {
      // Select this category
      onSelect(subId);
      setIsOpen(false);
      setOpenMainCategory(null);
      setOpenSubCategory(null);
    }
  };

  const handleNestedItemClick = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(itemId);
    setIsOpen(false);
    setOpenMainCategory(null);
    setOpenSubCategory(null);
  };

  return (
    <div className="relative">
      {/* Selected Value Display / Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg border bg-card text-left transition-colors",
          isOpen ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
        )}
      >
        {selectedCategory ? (
          <span className="flex items-center gap-2">
            <span>{getCategoryIcon(selectedCategory)}</span>
            <span className="font-medium">{getCategoryLabel(selectedCategory)}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">Select a category...</span>
        )}
        <ChevronDown className={cn(
          "h-5 w-5 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-lg max-h-[400px] overflow-y-auto"
        >
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="border-b border-border/50 last:border-b-0"
              ref={(el) => { categoryRefs.current[cat.id] = el; }}
            >
              {/* Main Category */}
              <button
                type="button"
                onClick={() => handleMainCategoryClick(cat.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/50 transition-colors",
                  openMainCategory === cat.id && "bg-accent/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium">{cat.name[language]}</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openMainCategory === cat.id && "rotate-180"
                )} />
              </button>

              {/* Sub-categories - Only show when main category is open */}
              {openMainCategory === cat.id && (
                <div className="bg-secondary/30">
                  {cat.subCategories.map((sub) => {
                    const hasSubItems = sub.subItems && sub.subItems.length > 0;
                    
                    return (
                      <div key={sub.id}>
                        {/* Sub-category Item */}
                        <button
                          type="button"
                          onClick={(e) => handleSubCategoryClick(sub.id, !!hasSubItems, e)}
                          className={cn(
                            "w-full flex items-center justify-between px-6 py-2.5 text-left hover:bg-accent/50 transition-colors",
                            openSubCategory === sub.id && "bg-accent/30",
                            selectedCategory === sub.id && "bg-primary/10 text-primary"
                          )}
                        >
                          <span className="text-sm">{sub.name[language]}</span>
                          <div className="flex items-center gap-2">
                            {selectedCategory === sub.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                            {hasSubItems && (
                              <ChevronRight className={cn(
                                "h-4 w-4 text-muted-foreground transition-transform",
                                openSubCategory === sub.id && "rotate-90"
                              )} />
                            )}
                          </div>
                        </button>

                        {/* Nested Items - Only show when sub-category is open */}
                        {hasSubItems && openSubCategory === sub.id && (
                          <div className="bg-secondary/50">
                            {sub.subItems!.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={(e) => handleNestedItemClick(item.id, e)}
                                className={cn(
                                  "w-full flex items-center justify-between px-10 py-2 text-left text-sm hover:bg-accent/50 transition-colors",
                                  selectedCategory === item.id && "bg-primary/10 text-primary"
                                )}
                              >
                                <span>{item.name[language]}</span>
                                {selectedCategory === item.id && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsOpen(false);
            setOpenMainCategory(null);
            setOpenSubCategory(null);
          }} 
        />
      )}
    </div>
  );
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { t, getCategoryLabel } = useLanguage();
  const { user, checking } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    sellerName: '',
    contactNumber: '',
    productName: '',
    category: '' as string | '',
    quantity: '',
    description: '',
    price: '',
    address: '',
  });

  // New listing/rental state
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [rentalType, setRentalType] = useState<'machine' | 'vehicle' | 'shop' | 'room' | 'other'>('machine');
  const [rentalPrice, setRentalPrice] = useState('');
  // Unit states
  const [quantityUnit, setQuantityUnit] = useState('piece');
  const [priceUnit, setPriceUnit] = useState('per piece');
  const [quantityMode, setQuantityMode] = useState<'item' | 'combo'>('item');

  // Live location state
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    // Wait for auth check to complete, then redirect if not logged in
    if (!checking && !user) {
      toast.error('Please login to add a product');
      navigate('/auth');
    }
  }, [user, checking, navigate]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      return toast.error(t('toasts.geoNotSupported'));
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        toast.success(t('toasts.locationCaptured'));
        setLocating(false);
      },
      (err) => {
        console.error('Geolocation error', err);
        toast.error(t('toasts.locationError'));
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = MAX_IMAGES - imagePreviews.length;
    let added = 0;

    const filesArr = Array.from(files);
    if (filesArr.length > remainingSlots) {
      toast.warning(`${t('toasts.maxImages')} ${MAX_IMAGES} ${t('toasts.imagesWillBeAdded')} ${remainingSlots} ${t('toasts.willBeAdded')}`);
    }

    for (const file of filesArr.slice(0, remainingSlots)) {
      try {
        // Enforce image file type
        if (!file.type.startsWith('image/')) {
          toast.error(t('toasts.onlyImages'));
          continue;
        }

        // If file is <= 1MB, just read and add
        const MAX_BYTES = 1024 * 1024; // 1MB
        let dataUrl: string;
        if (file.size <= MAX_BYTES) {
          dataUrl = await readFileAsDataURL(file);
        } else {
          toast(t('toasts.largeImage'), { icon: '⚙️' });
          dataUrl = await compressImage(file, MAX_BYTES);
          const blob = dataURLToBlob(dataUrl);
          if (blob.size > MAX_BYTES) {
            toast.error(t('toasts.compressError'));
            continue;
          }
        }

        setImagePreviews(prev => [...prev, dataUrl]);
        added++;
      } catch (err) {
        console.error('Error processing image', err);
        toast.error(t('toasts.imageProcessError'));
      }
    }

    if (added === 0 && filesArr.length > 0) {
      // if nothing added, provide guidance
      toast.error(t('toasts.onlyImages'));
    }

    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields with clear messages
    if (!formData.sellerName.trim()) {
      toast.error(listingType === 'sale' ? t('toasts.enterSellerName') : t('toasts.enterRentName'));
      return;
    }

    if (!formData.contactNumber.trim()) {
      toast.error(t('toasts.enterContact'));
      return;
    }

    if (!formData.productName.trim()) {
      toast.error(t('toasts.enterProductName'));
      return;
    }

    if (!formData.category) {
      toast.error(t('toasts.selectCategory'));
      return;
    }

    // Require a captured location
    if (location.lat === null || location.lng === null) {
      toast.error(t('toasts.captureLocation'));
      return;
    }

    // Validate based on listing type
    if (listingType === 'sale') {
      if (!formData.price) {
        toast.error(t('toasts.enterPrice'));
        return;
      }
    } else {
      if (!rentalPrice) {
        toast.error(t('toasts.enterRentalPrice'));
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Use placeholder image if none provided
      const images = imagePreviews.length > 0 
        ? imagePreviews 
        : ['https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'];

      const payload: any = {
        sellerName: formData.sellerName,
        contactNumber: formData.contactNumber,
        productName: formData.productName,
        category: formData.category,
        quantity: formData.quantity,
        images,
        description: formData.description,
        address: formData.address,
        location: { lat: location.lat as number, lng: location.lng as number },
        listingType,
        quantityUnit,
        priceUnit,
        quantityMode,
      };

      if (listingType === 'sale') {
        payload.price = parseFloat(formData.price || '0');
      } else {
        payload.rentalPrice = parseFloat(rentalPrice || '0');
        payload.rentalType = rentalType;
        payload.rentalStatus = 'available';
      }

      await addProduct(payload);

      toast.success(t('toasts.productListed'), {
        description: t('toasts.productVisible'),
      });

      navigate('/products');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to list product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'contactNumber') {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [field]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {t('addProduct.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('addProduct.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top toggles: Sell / Rent */}
            <div className="flex gap-3 p-1 bg-secondary/50 rounded-xl w-fit">
              <button 
                type="button" 
                onClick={() => setListingType('sale')} 
                className={cn(
                  "px-5 py-2.5 rounded-lg font-medium transition-all duration-200",
                  listingType === 'sale' 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {t('addProduct.sell')}
              </button>
              <button 
                type="button" 
                onClick={() => setListingType('rent')} 
                className={cn(
                  "px-5 py-2.5 rounded-lg font-medium transition-all duration-200",
                  listingType === 'rent' 
                    ? 'bg-accent text-accent-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {t('addProduct.rent')}
              </button>
            </div>

            {/* Seller / Rent Name */}
            <div className="space-y-2">
              <Label htmlFor="sellerName">{listingType === 'sale' ? t('addProduct.sellerName') : t('addProduct.rentName')} *</Label>
              <Input
                id="sellerName"
                placeholder={listingType === 'sale' ? t('addProduct.enterSellerName') : t('addProduct.enterRentName')}
                value={formData.sellerName}
                onChange={(e) => handleChange('sellerName', e.target.value)}
                required
              />
            </div>

            {/* Contact Number (required) */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber">{t('addProduct.contactNumber')} *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="e.g., 9468650730"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange('contactNumber', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">{t('addProduct.productName')} *</Label>
              <Input
                id="productName"
                placeholder={t('addProduct.productNamePlaceholder')}
                value={formData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                required
              />
            </div>

            {/* Category - Accordion Style Picker */}
            <div className="space-y-2">
              <Label>{t('addProduct.category')} *</Label>
              <CategoryPickerAccordion 
                selectedCategory={formData.category}
                onSelect={(categoryId) => handleChange('category', categoryId)}
              />
            </div>

            {/* Quantity & Price Section */}
            {/* Mobile: 2 rows (quantity row, then price row) | Desktop: 1 row with 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">{t('addProduct.quantity')} *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g., 10"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    onKeyDown={(e) => {
                      // Block non-numeric keys except allowed ones
                      if (
                        !/[0-9.]/.test(e.key) &&
                        !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    required
                    className="flex-1 min-w-0"
                  />
                  {/* Quantity unit select */}
                  <select 
                    value={quantityUnit} 
                    onChange={(e) => setQuantityUnit(e.target.value)} 
                    className="h-10 px-3 py-2 rounded-lg border border-input bg-background text-sm font-medium 
                             text-foreground shadow-sm transition-colors
                             hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                             cursor-pointer w-[120px] flex-shrink-0"
                  >
                    {listingType === 'sale' ? (
                      <>
                        <option value="kg">{t('units.kg')}</option>
                        <option value="gm">{t('units.gm')}</option>
                        <option value="liter">{t('units.liter')}</option>
                        <option value="quintal">{t('units.quintal')}</option>
                        <option value="dhara">{t('units.dhara')}</option>
                        <option value="man">{t('units.man')}</option>
                        <option value="piece">{t('units.piece')}</option>
                      </>
                    ) : (
                      <>
                        <option value="piece">{t('addProduct.item')}</option>
                        <option value="combo">{t('addProduct.combo')}</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Price */}
              {listingType === 'sale' ? (
                <div className="space-y-2">
                  <Label htmlFor="price">{t('addProduct.price')} *</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 min-w-0">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="450"
                        value={formData.price}
                        onChange={(e) => handleChange('price', e.target.value)}
                        required
                        className="pl-8"
                      />
                    </div>
                    <select 
                      value={priceUnit} 
                      onChange={(e) => setPriceUnit(e.target.value)} 
                      className="h-10 px-3 py-2 rounded-lg border border-input bg-background text-sm font-medium 
                               text-foreground shadow-sm transition-colors
                               hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1
                               cursor-pointer w-[120px] flex-shrink-0"
                    >
                      <option value="per kg">{t('units.perKg')}</option>
                      <option value="per gm">{t('units.perGm')}</option>
                      <option value="per liter">{t('units.perLiter')}</option>
                      <option value="per quintal">{t('units.perQuintal')}</option>
                      <option value="per dhara">{t('units.perDhara')}</option>
                      <option value="per man">{t('units.perMan')}</option>
                      <option value="per piece">{t('units.perPiece')}</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="rentalPrice" className="flex items-center gap-2">
                    {t('addProduct.rentalPrice')} *
                    <span className="text-xs text-accent font-normal bg-accent/10 px-2 py-0.5 rounded-full">
                      {t('addProduct.rent')}
                    </span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 min-w-0">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                      <Input
                        id="rentalPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="500"
                        value={rentalPrice}
                        onChange={(e) => setRentalPrice(e.target.value)}
                        required
                        className="pl-8 border-accent/30 focus:border-accent focus:ring-accent/20"
                      />
                    </div>
                    <select 
                      value={priceUnit} 
                      onChange={(e) => setPriceUnit(e.target.value)} 
                      className="h-10 px-3 py-2 rounded-lg border border-accent/30 bg-background text-sm font-medium 
                               text-foreground shadow-sm transition-colors
                               hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent
                               cursor-pointer w-[120px] flex-shrink-0"
                    >
                      <option value="per piece">{t('units.perPiece')}</option>
                      <option value="combo">{t('addProduct.combo')}</option>
                      <option value="per km">{t('units.perKm')}</option>
                      <option value="per day">{t('units.perDay')}</option>
                      <option value="per month">{t('units.perMonth')}</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Product Images - Multiple Upload */}
            <div className="space-y-2">
              <Label>{t('addProduct.productImages')} ({t('addProduct.upTo')} {MAX_IMAGES})</Label>
              
              {/* Image Previews Grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        className="h-full w-full object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                          {t('addProduct.main')}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              {imagePreviews.length < MAX_IMAGES && (
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <label className="cursor-pointer block">
                    {imagePreviews.length === 0 ? (
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    ) : (
                      <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    )}
                    <p className="text-sm text-muted-foreground mb-1">
                      {imagePreviews.length === 0 
                        ? t('addProduct.clickToUpload') 
                        : `${t('addProduct.addMoreImages')} (${MAX_IMAGES - imagePreviews.length} ${t('addProduct.remaining')})`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('addProduct.imageSize')}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t('addProduct.description')} *</Label>
              <Textarea
                id="description"
                placeholder={t('addProduct.descriptionPlaceholder')}
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">{t('addProduct.address')} *</Label>
              <div className="relative">
                <Input
                  id="address"
                  placeholder={t('addProduct.addressPlaceholder')}
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 gap-1 text-xs"
                  onClick={requestLocation}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {locating ? t('addProduct.locating') : t('addProduct.useGPS')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('addProduct.gpsNote')}
              </p>

              {/* Map preview (if location captured) */}
              {location.lat !== null && location.lng !== null && (
                <div className="mt-3 rounded-lg overflow-hidden border border-border">
                  <div className="p-2 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <div>
                        <div>Lat: {location.lat.toFixed(6)}</div>
                        <div>Lng: {location.lng.toFixed(6)}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setLocation({ lat: null, lng: null })}>
                      {t('addProduct.clear')}
                    </Button>
                  </div>
                  <div className="aspect-video">
                    <iframe
                      title="location-preview"
                      className="w-full h-full border-0"
                      src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('addProduct.listingProduct')}
                </>
              ) : (
                t('addProduct.listProduct')
              )}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddProduct;
