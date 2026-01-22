import { Link } from 'react-router-dom';
import { ProductCategory, categoryIcons } from '@/types/product';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  category: ProductCategory;
  count?: number;
}

const CategoryCard = ({ category, count }: CategoryCardProps) => {
  const { getCategoryLabel, t } = useLanguage();

  return (
    <Link 
      to={`/products?category=${category}`}
      className="group flex flex-col items-center p-4 rounded-xl bg-card border border-border/50 card-elevated text-center"
    >
      <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {categoryIcons[category]}
      </span>
      <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
        {getCategoryLabel(category)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground mt-1">
          {count} {t('products.productsFound').split(' ')[0]}
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;
