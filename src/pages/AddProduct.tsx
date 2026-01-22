import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { ProductCategory, categoryLabels } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, MapPin, Loader2, Phone, X, ImagePlus } from 'lucide-react';

const allCategories: ProductCategory[] = [
  'dairy', 'honey', 'spices', 'pickles', 'grains', 
  'oils', 'sweets', 'vegetables', 'fruits', 'handicrafts'
];

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

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    sellerName: '',
    contactNumber: '',
    productName: '',
    category: '' as ProductCategory | '',
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

  const requestLocation = () => {
    if (!navigator.geolocation) {
      return toast.error('Geolocation is not supported by your browser');
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        toast.success('Location captured');
        setLocating(false);
      },
      (err) => {
        console.error('Geolocation error', err);
        toast.error('Unable to retrieve location');
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
      toast.warning(`You can only upload ${MAX_IMAGES} images. Only first ${remainingSlots} will be added.`);
    }

    for (const file of filesArr.slice(0, remainingSlots)) {
      try {
        // Enforce image file type
        if (!file.type.startsWith('image/')) {
          toast.error('Only image files are allowed');
          continue;
        }

        // If file is <= 1MB, just read and add
        const MAX_BYTES = 1024 * 1024; // 1MB
        let dataUrl: string;
        if (file.size <= MAX_BYTES) {
          dataUrl = await readFileAsDataURL(file);
        } else {
          toast('Large image detected — compressing...', { icon: '⚙️' });
          dataUrl = await compressImage(file, MAX_BYTES);
          const blob = dataURLToBlob(dataUrl);
          if (blob.size > MAX_BYTES) {
            toast.error('Unable to compress image under 1MB; please choose a smaller image');
            continue;
          }
        }

        setImagePreviews(prev => [...prev, dataUrl]);
        added++;
      } catch (err) {
        console.error('Error processing image', err);
        toast.error('Failed to process one of the images');
      }
    }

    if (added === 0 && filesArr.length > 0) {
      // if nothing added, provide guidance
      toast.error('No images were added. Each image must be an image file and under 1MB (will be compressed automatically).');
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
      toast.error(listingType === 'sale' ? 'Please enter seller name' : 'Please enter rent contact name');
      return;
    }

    if (!formData.contactNumber.trim()) {
      toast.error('Please enter contact number');
      return;
    }

    if (!formData.productName.trim()) {
      toast.error('Please enter product name');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    // Require a captured location
    if (location.lat === null || location.lng === null) {
      toast.error('Please capture your live location using the "Use GPS" button');
      return;
    }

    // Validate based on listing type
    if (listingType === 'sale') {
      if (!formData.price) {
        toast.error('Please enter a price for sale listings');
        return;
      }
    } else {
      if (!rentalPrice) {
        toast.error('Please enter a rental price for rent listings');
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
        category: formData.category as ProductCategory,
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

      toast.success('Product listed successfully!', {
        description: 'Your product is now visible to buyers.',
      });

      navigate('/products');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to list product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              List Your Product
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to start selling or renting your product
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Top toggles: Sell / Rent */}
            <div className="flex gap-3">
              <button type="button" onClick={() => setListingType('sale')} className={`px-3 py-1 rounded ${listingType === 'sale' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                Sell
              </button>
              <button type="button" onClick={() => setListingType('rent')} className={`px-3 py-1 rounded ${listingType === 'rent' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                Rent
              </button>
            </div>

            {/* Seller / Rent Name */}
            <div className="space-y-2">
              <Label htmlFor="sellerName">{listingType === 'sale' ? 'Seller Name *' : 'Rent Name *'}</Label>
              <Input
                id="sellerName"
                placeholder={listingType === 'sale' ? 'Enter seller name or business' : 'Enter contact name for rental'}
                value={formData.sellerName}
                onChange={(e) => handleChange('sellerName', e.target.value)}
                required
              />
            </div>

            {/* Contact Number (required) */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="e.g., 9876543210"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange('contactNumber', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                placeholder="e.g., Pure Desi Cow Ghee"
                value={formData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {categoryLabels[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity & Price / Rental Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="quantity"
                    placeholder="e.g., 1"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    required
                  />
                  {/* Quantity unit select - options change based on listingType if needed */}
                  <select value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)} className="px-2 py-1 rounded border">
                    {listingType === 'sale' ? (
                      <>
                        <option value="kg">kg</option>
                        <option value="gm">gm</option>
                        <option value="liter">liter</option>
                        <option value="quintal">quintal</option>
                        <option value="dhara">dhara</option>
                        <option value="man">man</option>
                        <option value="piece">piece</option>
                      </>
                    ) : (
                      <>
                        <option value="piece">Item</option>
                        <option value="combo">Combo</option>
                      </>
                    )}
                  </select>
                </div>
                {/* For rent show quantity mode toggle as well (Item / Combo) */}
                {listingType === 'rent' && (
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => setQuantityMode('item')} className={`px-3 py-1 rounded ${quantityMode === 'item' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Item</button>
                    <button type="button" onClick={() => setQuantityMode('combo')} className={`px-3 py-1 rounded ${quantityMode === 'combo' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Combo</button>
                  </div>
                )}
              </div>
              {listingType === 'sale' ? (
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g., 450"
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      required
                    />
                    <select value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} className="px-2 py-1 rounded border">
                      <option value="per kg">per kg</option>
                      <option value="per gm">per gm</option>
                      <option value="per liter">per liter</option>
                      <option value="per quintal">per quintal</option>
                      <option value="per dhara">per dhara</option>
                      <option value="per man">per man</option>
                      <option value="per piece">per piece</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="rentalPrice">Rental Price (₹) *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="rentalPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g., 500"
                      value={rentalPrice}
                      onChange={(e) => setRentalPrice(e.target.value)}
                      required
                    />
                    <select value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} className="px-2 py-1 rounded border">
                      <option value="per piece">per piece</option>
                      <option value="combo">combo</option>
                      <option value="per km">per km</option>
                      <option value="per day">per day</option>
                      <option value="per month">per month</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* If rental, show rental type selector */}
            {listingType === 'rent' && (
              <div className="space-y-2">
                <Label>Rental Item Type *</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setRentalType('machine')} className={`px-2 py-1 rounded ${rentalType === 'machine' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Machine</button>
                  <button type="button" onClick={() => setRentalType('vehicle')} className={`px-2 py-1 rounded ${rentalType === 'vehicle' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Vehicle</button>
                  <button type="button" onClick={() => setRentalType('shop')} className={`px-2 py-1 rounded ${rentalType === 'shop' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Shop</button>
                  <button type="button" onClick={() => setRentalType('room')} className={`px-2 py-1 rounded ${rentalType === 'room' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Room</button>
                  <button type="button" onClick={() => setRentalType('other')} className={`px-2 py-1 rounded ${rentalType === 'other' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>Other</button>
                </div>
              </div>
            )}

            {/* Product Images - Multiple Upload */}
            <div className="space-y-2">
              <Label>Product Images (up to {MAX_IMAGES})</Label>
              
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
                          Main
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
                        ? 'Click to upload product images' 
                        : `Add more images (${MAX_IMAGES - imagePreviews.length} remaining)`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 1MB each
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your product, its quality, how it's made, etc."
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address / Location *</Label>
              <div className="relative">
                <Input
                  id="address"
                  placeholder="e.g., Anand, Gujarat"
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
                  {locating ? 'Locating…' : 'Use GPS'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Capture your live GPS location. This will be saved with the product.
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
                      Clear
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
                  Listing Product...
                </>
              ) : (
                'List Product'
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
