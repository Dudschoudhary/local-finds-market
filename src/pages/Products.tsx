import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { categories, getCategoryById, getSubCategoryById } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useProducts();
  const { t, getCategoryLabel } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCategory = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      // Check if it's a main category - if so, include all sub-categories
      const mainCat = getCategoryById(selectedCategory);
      if (mainCat) {
        const subCategoryIds = mainCat.subCategories.map(s => s.id);
        filtered = filtered.filter(p => 
          p.category === selectedCategory || subCategoryIds.includes(p.category)
        );
      } else {
        // It's a sub-category, filter directly
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p => 
          (p.productName ?? '').toLowerCase().includes(query) ||
          (p.description ?? '').toLowerCase().includes(query) ||
          (p.sellerName ?? '').toLowerCase().includes(query) ||
          (p.address ?? '').toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {selectedCategory ? getCategoryLabel(selectedCategory) : t('products.title')}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {t('products.productsFound')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('products.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select 
              value={selectedCategory || 'all'} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder={t('products.allCategories')} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">{t('products.allCategories')}</SelectItem>
                {categories.map(cat => (
                  <SelectGroup key={cat.id}>
                    <SelectLabel className="flex items-center gap-2 font-semibold text-foreground cursor-pointer">
                      <span>{cat.icon}</span>
                      <span>{getCategoryLabel(cat.id)}</span>
                    </SelectLabel>
                    <SelectItem value={cat.id} className="pl-6 font-medium">
                      {cat.icon} {getCategoryLabel(cat.id)} ({t('products.allCategories')})
                    </SelectItem>
                    {cat.subCategories.map(sub => (
                      <SelectItem key={sub.id} value={sub.id} className="pl-8">
                        {getCategoryLabel(sub.id)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>

            {(selectedCategory || searchQuery) && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                {t('addProduct.clear')}
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse aspect-[4/5]" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('products.noProducts')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('products.tryDifferent')}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                {t('addProduct.clear')}
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
