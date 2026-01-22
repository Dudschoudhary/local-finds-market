import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  categoryId: string;
  icon: string;
  count?: number;
}

const CategoryCard = ({ categoryId, icon, count }: CategoryCardProps) => {
  const { getCategoryLabel, t } = useLanguage();

  return (
    <Link 
      to={`/products?category=${categoryId}`}
      className="group flex flex-col items-center p-4 rounded-xl bg-card border border-border/50 card-elevated text-center"
    >
      <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
        {getCategoryLabel(categoryId)}
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
