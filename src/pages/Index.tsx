import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { ProductCategory } from '@/types/product';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const categories: ProductCategory[] = [
  'dairy', 'honey', 'spices', 'pickles', 'grains', 
  'oils', 'sweets', 'vegetables', 'fruits', 'handicrafts'
];

const Index = () => {
  const { products, isLoading, getCategoryCounts } = useProducts();
  const { t } = useLanguage();
  const categoryCounts = getCategoryCounts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />

        {/* Categories Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                {t('index.browseByCategory')}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t('index.categoryDescription')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <CategoryCard 
                  key={category} 
                  category={category}
                  count={categoryCounts[category] || 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  {t('index.featuredProducts')}
                </h2>
                <p className="text-muted-foreground">
                  {t('index.featuredDescription')}
                </p>
              </div>
              <Link to="/products">
                <Button variant="outline" className="gap-2">
                  {t('index.viewAll')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-xl bg-muted animate-pulse aspect-[4/5]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 hero-gradient text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('index.readyToSell')}
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              {t('index.sellDescription')}
            </p>
            <Link to="/add-product">
              <Button size="lg" variant="secondary" className="gap-2 px-8">
                {t('index.listYourProduct')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
