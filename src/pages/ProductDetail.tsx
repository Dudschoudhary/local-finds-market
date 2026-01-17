import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { categoryLabels, categoryIcons } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Package, 
  Calendar,
  MessageCircle,
  Phone,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, isLoading } = useProducts();
  const product = id ? getProductById(id) : undefined;

  const handleContact = () => {
    toast.success('Contact feature coming soon!', {
      description: 'Enable Cloud to add messaging functionality.',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product?.productName,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-10 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="gap-2 mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-accent text-accent-foreground mb-3">
                  {categoryIcons[product.category]} {categoryLabels[product.category]}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {product.productName}
                </h1>
                <p className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center gap-3 text-foreground">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span>Quantity: {product.quantity}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Seller: {product.sellerName}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{product.address}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Listed on {new Date(product.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Location Map Placeholder */}
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Map view available with Cloud integration</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 gap-2" size="lg" onClick={handleContact}>
                  <MessageCircle className="h-5 w-5" />
                  Contact Seller
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
