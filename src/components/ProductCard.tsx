import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { MapPin, User, Heart, Eye, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { getCategoryLabel, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, (index % 4) * 100);
        } else {
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
        <article className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-slate-100 dark:border-slate-800">
          
          {/* Image container - clean design */}
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={product.images?.[0] ?? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'}
                alt={product.productName}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <Badge className="bg-teal-500 hover:bg-teal-600 text-white border-0 shadow-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                {getCategoryLabel(product.category)}
              </Badge>
              {product.listingType === 'rent' && (
                <Badge className="bg-violet-500 hover:bg-violet-600 text-white border-0 shadow-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                  {t('productCard.forRent')}
                </Badge>
              )}
            </div>

            {/* Wishlist button */}
            <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-rose-50 dark:hover:bg-rose-900/30 group/heart">
              <Heart className="w-5 h-5 text-slate-400 group-hover/heart:text-rose-500 group-hover/heart:fill-rose-500 transition-colors" />
            </button>

            {/* Photo count */}
            {(product.images?.length ?? 0) > 1 && (
              <span className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {product.images!.length} Photos
              </span>
            )}
          </div>
          
          {/* Content section */}
          <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
            
            {/* Product name - bold and clean */}
            <h3 className="font-bold text-xl text-slate-800 dark:text-white line-clamp-1 mb-2 tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              {product.productName}
            </h3>
            
            {/* Description - subtle */}
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 font-normal">
              {product.description}
            </p>

            {/* Price section - prominent */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium">Price</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {priceLabel}
                </p>
              </div>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                {product.quantity} {product.quantityUnit || 'pcs'}
              </span>
            </div>

            {/* Seller info */}
            <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{product.sellerName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-medium truncate max-w-[90px]">{product.address?.split(',')[0] ?? 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* View button - absolute positioned at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 pt-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900">
            <span className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-teal-500/25">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default ProductCard;
