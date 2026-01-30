import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { categories } from '@/data/categories';
import logoImage from '@/assets/images/desimart.png';

const Footer = () => {
  const { t, getCategoryLabel } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Show first 4 main categories in footer
  const footerCategories = categories.slice(0, 4);

  const handleSellProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add a product');
      navigate('/auth');
    } else {
      navigate('/add-product');
    }
  };

  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden">
                <img src={logoImage} alt="DesiMart Logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-xl font-semibold">DesiMart</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">{t('footer.browseProducts')}</Link></li>
              <li><a href="#" onClick={handleSellProduct} className="hover:text-primary transition-colors">{t('footer.sellYourProduct')}</a></li>
              <li><Link to="/about-us" className="hover:text-primary transition-colors">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/contact-us" className="hover:text-primary transition-colors">{t('footer.contactUs')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.categoriesTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerCategories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.id}`} className="hover:text-primary transition-colors">
                    {cat.icon} {getCategoryLabel(cat.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact-us" className="hover:text-primary transition-colors">{t('footer.helpCenter')}</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-primary transition-colors">{t('footer.termsOfService')}</Link></li>
              <li><Link to="/dmca-policy" className="hover:text-primary transition-colors">{t('footer.dmcaPolicy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
          <p className="flex items-center gap-1">
            {t('footer.madeWith')} <Heart className="h-4 w-4 text-primary fill-primary" /> {t('footer.forCommunities')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
