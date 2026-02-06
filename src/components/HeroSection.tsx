import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Store, Shield, MapPin, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const HeroSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartSelling = () => {
    if (!user) {
      toast.error('Please login to add a product');
      navigate('/auth');
    } else {
      navigate('/add-product');
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Clean gradient background */}
      <div className="absolute inset-0 -z-20 hero-bg-gradient" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-transparent rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-green-400/15 via-emerald-300/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-200/10 via-yellow-100/10 to-green-200/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium mb-8 shadow-sm animate-slideDown">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-foreground/80">{t('hero.badge')}</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 animate-slideUp">
            <span className="text-foreground">{t('hero.title1')}</span>{' '}
            <span className="text-gradient-animated">{t('hero.titleHighlight')}</span>
            <br className="hidden sm:block" />
            <span className="text-foreground">{t('hero.title2')}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-slideUp animation-delay-100">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slideUp animation-delay-200">
            <Link to="/products" className="group w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 px-8 py-6 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <ShoppingBag className="h-5 w-5" />
                {t('hero.browseProducts')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto gap-2 px-8 py-6 text-base font-semibold border-2 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              onClick={handleStartSelling}
            >
              <Store className="h-5 w-5" />
              {t('hero.startSelling')}
            </Button>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 animate-slideUp animation-delay-300">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 dark:bg-card/70 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm font-medium text-foreground">{t('hero.verifiedSellers')}</span>
            </div>
            
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 dark:bg-card/70 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30">
                <MapPin className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="text-sm font-medium text-foreground">{t('hero.locationBased')}</span>
            </div>
            
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/70 dark:bg-card/70 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-foreground">{t('hero.freshNatural')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
