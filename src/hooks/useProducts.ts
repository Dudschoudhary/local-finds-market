import { useState, useEffect } from 'react';
import { Product, ProductCategory } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';

const STORAGE_KEY = 'localmart_products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage, merge with mock data
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      const parsed = JSON.parse(storedProducts);
      setProducts([...mockProducts, ...parsed]);
    } else {
      setProducts(mockProducts);
    }
    setIsLoading(false);
  }, []);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    const storedProducts = localStorage.getItem(STORAGE_KEY);
    const existing = storedProducts ? JSON.parse(storedProducts) : [];
    const updated = [...existing, newProduct];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (category: ProductCategory): Product[] => {
    return products.filter(p => p.category === category);
  };

  const getCategoryCounts = (): Record<ProductCategory, number> => {
    return products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<ProductCategory, number>);
  };

  return {
    products,
    isLoading,
    addProduct,
    getProductById,
    getProductsByCategory,
    getCategoryCounts,
  };
};
