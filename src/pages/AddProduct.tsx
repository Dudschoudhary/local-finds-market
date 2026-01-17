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
import { Upload, MapPin, Loader2 } from 'lucide-react';

const allCategories: ProductCategory[] = [
  'dairy', 'honey', 'spices', 'pickles', 'grains', 
  'oils', 'sweets', 'vegetables', 'fruits', 'handicrafts'
];

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    sellerName: '',
    productName: '',
    category: '' as ProductCategory | '',
    quantity: '',
    imageUrl: '',
    description: '',
    price: '',
    address: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    setIsSubmitting(true);

    try {
      // Use a placeholder image if none provided
      const imageUrl = formData.imageUrl || 
        `https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop`;

      addProduct({
        sellerName: formData.sellerName,
        productName: formData.productName,
        category: formData.category as ProductCategory,
        quantity: formData.quantity,
        imageUrl,
        description: formData.description,
        price: parseFloat(formData.price),
        address: formData.address,
        location: { lat: 0, lng: 0 }, // Will be filled with real location via Cloud
      });

      toast.success('Product listed successfully!', {
        description: 'Your product is now visible to buyers.',
      });

      navigate('/products');
    } catch (error) {
      toast.error('Failed to list product. Please try again.');
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
              Fill in the details below to start selling your product
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seller Name */}
            <div className="space-y-2">
              <Label htmlFor="sellerName">Seller Name *</Label>
              <Input
                id="sellerName"
                placeholder="Enter your name or business name"
                value={formData.sellerName}
                onChange={(e) => handleChange('sellerName', e.target.value)}
                required
              />
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

            {/* Quantity & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  placeholder="e.g., 1 kg, 500g, 1 litre"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
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
              </div>
            </div>

            {/* Product Image */}
            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-48 mx-auto rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload product image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 5MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
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
                  onClick={() => toast.info('GPS location feature requires Cloud integration')}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Use GPS
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enable Cloud for live location & map features
              </p>
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
