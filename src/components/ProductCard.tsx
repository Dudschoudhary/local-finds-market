import { Link } from 'react-router-dom';
import { Product, categoryLabels } from '@/types/product';
import { MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <article className="card-elevated rounded-xl overflow-hidden bg-card border border-border/50">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge 
            className="absolute top-3 left-3 bg-accent text-accent-foreground border-0"
          >
            {categoryLabels[product.category]}
          </Badge>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.productName}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.quantity}
            </span>
          </div>

          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {product.sellerName}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {product.address.split(',')[0]}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
