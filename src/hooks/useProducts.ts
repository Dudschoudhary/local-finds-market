import { useState, useEffect, useCallback } from 'react';
import { Product, ProductCategory } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const useProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      // API returns { data: products, meta: { ... } } in server controller
      const list: Product[] = data && data.data ? data.data : data;
      // Normalize `_id` -> `id` for mongoose documents
      const normalized = list.map((p: any) => ({ ...p, id: p.id ?? p._id }));
      setProducts(normalized);
    } catch (error) {
      // Fallback to mock products if API fails
      console.error('Error fetching products, falling back to mock:', error);
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    // If user present, attach ownerId automatically
    const payload: any = { ...product };
    if (user && user.id) payload.ownerId = user.id;

    const headers: any = { 'Content-Type': 'application/json' };
    if (user && user.token) {
      headers.Authorization = `Bearer ${user.token}`;
    }

    const res = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || 'Failed to add product');
    }

    const created = await res.json();
    // Handle cases where server returns { data: createdProduct }
    const createdDoc = created && created.data ? created.data : created;
    // Normalize created document to include `id` if server returns `_id`
    const normalizedCreated = { ...createdDoc, id: createdDoc.id ?? createdDoc._id };
    // ensure created has id and createdAt; server returns mongoose doc
    setProducts(prev => [normalizedCreated as Product, ...prev]);
    return normalizedCreated as Product;
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (category: ProductCategory): Product[] => {
    return products.filter(p => p.category === category);
  };

  const getCategoryCounts = (): Record<ProductCategory, number> => {
    return products.reduce((acc, product) => {
      acc[product.category as ProductCategory] = (acc[product.category as ProductCategory] || 0) + 1;
      return acc;
    }, {} as Record<ProductCategory, number>);
  };

  return {
    products,
    isLoading,
    fetchProducts,
    addProduct,
    getProductById,
    getProductsByCategory,
    getCategoryCounts,
  };
};
