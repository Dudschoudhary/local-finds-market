import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { useProducts } from '@/hooks/useProducts';
import { categoryIcons } from '@/types/product';
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
import { useLanguage } from '@/contexts/LanguageContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, isLoading } = useProducts();
  const { t, getCategoryLabel } = useLanguage();
  const product = id ? getProductById(id) : undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to hold viewer's current location when requested
  const [viewerLocation, setViewerLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const requestViewerLocationAndDirections = () => {
    if (!product || !product.location) {
      toast.error(t('toasts.locationError'));
      return;
    }
    if (!navigator.geolocation) {
      toast.error(t('toasts.geoNotSupported'));
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
        toast.error(t('toasts.locationError'));
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
        <main className="flex-1 flex items-center justify-center">
          <Loader size="large" text="Loading product..." />
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
          <h1 className="font-display text-2xl font-bold mb-4">{t('productDetail.productNotFound')}</h1>
          <p className="text-muted-foreground mb-6">
            {t('products.tryDifferent')}
          </p>
          <Button onClick={() => navigate('/products')}>
            {t('hero.browseProducts')}
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-4 sm:py-8">
        <div className="container">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="gap-2 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('productDetail.backToProducts')}
          </Button>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            {/* Product Images - Always first */}
            <div className="space-y-4">
              {/* Main Image with Navigation */}
              <div className="p-2 sm:p-3 bg-card rounded-xl sm:rounded-2xl border border-border/50 shadow-sm">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-lg sm:rounded-xl overflow-hidden bg-muted group border-2 border-border/30 shadow-inner">
                  <img
                    src={product.images[currentImageIndex] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'}
                    alt={`${product.productName} - Image ${currentImageIndex + 1}`}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Gradient overlay for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Navigation Arrows - Only show if multiple images */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground rounded-full p-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm px-3 py-1 rounded-full font-medium">
                        {currentImageIndex + 1} / {product.images.length}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery - Only show if multiple images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all shadow-sm hover:shadow-md ${
                        index === currentImageIndex 
                          ? 'border-primary ring-2 ring-primary/30 scale-105' 
                          : 'border-border/50 hover:border-primary/50'
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
            <div className="space-y-4 sm:space-y-6">
              <div>
                <Badge className="bg-accent text-accent-foreground mb-2 sm:mb-3">
                  {categoryIcons[product.category]} {getCategoryLabel(product.category)}
                </Badge>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                  {product.productName}
                </h1>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  ₹{product.price != null ? product.price.toLocaleString('en-IN') : '0'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3">
                <Button className="flex-1 gap-1 sm:gap-2 text-sm sm:text-base" size="default" onClick={handleCall}>
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t('productDetail.callSeller')}
                </Button>
                <Button className="flex-1 gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 text-sm sm:text-base" size="default" onClick={handleWhatsApp}>
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  {t('productDetail.whatsapp')}
                </Button>
                <Button variant="outline" size="default" onClick={handleShare}>
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              <div className="space-y-2 sm:space-y-3 py-3 sm:py-4 border-y border-border text-sm sm:text-base">
                <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <span>{t('addProduct.quantity')}: {product.quantity ?? 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <span>{t('productDetail.seller')}: {product.sellerName}</span>
                </div>
                {product.contactNumber && (
                  <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <a href={`tel:${product.contactNumber}`} className="hover:text-primary transition-colors">
                      {product.contactNumber}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <span>{product.address}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-foreground">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <span>{t('productDetail.listedOn')} {new Date(product.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{t('addProduct.description')}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Map Section - Full width below the grid */}
          <div className="mt-6">
            {product.location ? (
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="p-2 sm:p-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <div className="text-xs sm:text-sm text-foreground">
                      <span>Lat: {Number(product.location.lat).toFixed(4)}</span>
                      <span className="mx-1">,</span>
                      <span>Lng: {Number(product.location.lng).toFixed(4)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button size="sm" variant="ghost" className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3" onClick={() => window.open(`https://www.google.com/maps?q=${product.location.lat},${product.location.lng}&z=15&output=embed`, '_blank')}>
                      Maps
                    </Button>
                    <Button size="sm" className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3" onClick={requestViewerLocationAndDirections} disabled={locating}>
                      {locating ? '...' : t('productDetail.getDirections')}
                    </Button>
                  </div>
                </div>

                <div className="h-[200px] sm:h-[250px] md:h-[300px]">
                  <iframe
                    title="product-location"
                    className="w-full h-full border-0"
                    src={`https://www.google.com/maps?q=${product.location.lat},${product.location.lng}&z=15&output=embed`}
                    loading="lazy"
                  />
                </div>

                {viewerLocation && (
                  <div className="p-2 text-xs text-muted-foreground">
                    Your location: {viewerLocation.lat.toFixed(4)}, {viewerLocation.lng.toFixed(4)}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="h-[150px] bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1 sm:mb-2" />
                    <p className="text-xs sm:text-sm">Map view available with Cloud integration</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
