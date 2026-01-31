import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number; // Optional index for staggered animation
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { getCategoryLabel, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add small delay based on index for staggered effect
          setTimeout(() => {
            setIsVisible(true);
          }, (index % 4) * 100); // 100ms delay between each card in a row
        } else {
          // Reset when card goes out of view - this enables re-animation
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '20px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  // Determine price to display based on listing type
  const displayPrice = product.listingType === 'rent' 
    ? product.rentalPrice 
    : product.price;
  
  const priceLabel = product.listingType === 'rent' 
    ? `₹${(displayPrice ?? 0).toLocaleString('en-IN')}/${product.priceUnit || 'day'}` 
    : `₹${(displayPrice ?? 0).toLocaleString('en-IN')}`;

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      <Link to={`/product/${product.id}`} className="block group h-full">
        <article className="card-elevated rounded-xl overflow-hidden bg-card border border-border/50 h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
          {/* Image container with border and inner shadow */}
          <div className="p-3 pb-0 flex-shrink-0">
            <div className="aspect-[4/3] overflow-hidden relative rounded-lg border-2 border-border/30 shadow-inner">
              <img
                src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'}
                alt={product.productName}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay for better badge visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              {(product.images?.length ?? 0) > 1 && (
                <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  +{(product.images!.length - 1)} photos
                </span>
              )}
              <Badge 
                className="absolute top-3 left-3 bg-accent text-accent-foreground border-0 shadow-md"
              >
                {getCategoryLabel(product.category)}
              </Badge>
              {/* Show Rent badge for rental listings */}
              {product.listingType === 'rent' && (
                <Badge className="absolute top-3 right-3 bg-blue-500 text-white border-0 shadow-md">
                  {t('productCard.forRent')}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Content section with clear separation */}
          <div className="p-4 space-y-3 flex flex-col flex-grow">
            <div className="flex-grow">
              {/* Product name in attractive banner/strip style */}
              <div className="bg-orange-600 text-white p-2 capitalize mb-2 rounded-lg shadow-sm">
                <h3 className="font-display ms-3 text-lg font-semibold text-white line-clamp-1 group-hover:text-gray-100 transition-colors">
                  {product.productName}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[2.5rem]">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-red-500">
                {priceLabel}
              </span>
              <span className="text-sm text-muted-foreground">
                {product.quantity} {product.quantityUnit || ''}
              </span>
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground mt-auto">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {product.sellerName}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {product.address?.split(',')[0] ?? 'Unknown'}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default ProductCard;
