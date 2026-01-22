import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, isLoading } = useProducts();
  const product = id ? getProductById(id) : undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to hold viewer's current location when requested
  const [viewerLocation, setViewerLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const requestViewerLocationAndDirections = () => {
    if (!product || !product.location) {
      toast.error('Product location not available');
      return;
    }
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported by your browser');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setViewerLocation({ lat, lng });
        // Open Google Maps directions in new tab
        const dest = `${product.location.lat},${product.location.lng}`;
        const origin = `${lat},${lng}`;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;
        window.open(url, '_blank');
        setLocating(false);
      },
      (err) => {
        console.error('Geolocation error', err);
        toast.error('Unable to retrieve your location');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleCall = () => {
    if (product?.contactNumber) {
      window.location.href = `tel:${product.contactNumber}`;
    }
  };

  const handleWhatsApp = () => {
    if (product?.contactNumber) {
      const message = encodeURIComponent(`Hi, I'm interested in your product: ${product.productName}`);
      window.open(`https://wa.me/91${product.contactNumber}?text=${message}`, '_blank');
    }
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

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image with Navigation */}
              <div className="aspect-square rounded-xl overflow-hidden bg-muted relative group">
                <img
                  src={product.images[currentImageIndex] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'}
                  alt={`${product.productName} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
                
                {/* Navigation Arrows - Only show if multiple images */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery - Only show if multiple images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex 
                          ? 'border-primary' 
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                  ₹{product.price != null ? product.price.toLocaleString('en-IN') : '0'}
                </p>
              </div>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex items-center gap-3 text-foreground">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span>Quantity: {product.quantity ?? 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Seller: {product.sellerName}</span>
                </div>
                {product.contactNumber && (
                  <div className="flex items-center gap-3 text-foreground">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href={`tel:${product.contactNumber}`} className="hover:text-primary transition-colors">
                      {product.contactNumber}
                    </a>
                  </div>
                )}
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

              {/* Show product location if available */}
              {product.location ? (
                <div className="rounded-xl overflow-hidden border border-border">
                  <div className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div className="text-sm text-foreground">
                        <div>Lat: {Number(product.location.lat).toFixed(6)}</div>
                        <div>Lng: {Number(product.location.lng).toFixed(6)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.google.com/maps?q=${product.location.lat},${product.location.lng}&z=15&output=embed`, '_blank')}>
                        Open in Maps
                      </Button>
                      <Button size="sm" onClick={requestViewerLocationAndDirections} disabled={locating}>
                        {locating ? 'Locating…' : 'Get Directions'}
                      </Button>
                    </div>
                  </div>

                  <div className="aspect-video">
                    <iframe
                      title="product-location"
                      className="w-full h-full border-0"
                      src={`https://www.google.com/maps?q=${product.location.lat},${product.location.lng}&z=15&output=embed`}
                      loading="lazy"
                    />
                  </div>

                  {viewerLocation && (
                    <div className="p-3 text-xs text-muted-foreground">
                      Your location captured: {viewerLocation.lat.toFixed(6)}, {viewerLocation.lng.toFixed(6)} — directions opened in new tab.
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden border border-border">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Map view available with Cloud integration</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 gap-2" size="lg" onClick={handleCall}>
                  <Phone className="h-5 w-5" />
                  Call Seller
                </Button>
                <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700" size="lg" onClick={handleWhatsApp}>
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
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
