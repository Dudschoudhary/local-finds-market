import React, { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Pencil, Trash, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, isLoading, updateProduct, deleteProduct, markAsRented } = useProducts();
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const myProducts = useMemo(() => {
    if (!user) return [];
    return products.filter(p => p.ownerId && String(p.ownerId) === String(user.id));
  }, [products, user]);

  const mySales = useMemo(() => myProducts.filter((p: any) => p.listingType !== 'rent'), [myProducts]);
  const myRentals = useMemo(() => myProducts.filter((p: any) => p.listingType === 'rent'), [myProducts]);

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      productName: p.productName || '',
      price: p.price ?? 0,
      quantity: p.quantity || '',
      description: p.description || '',
      address: p.address || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const handleChange = (field: string, value: any) => {
    setForm((s: any) => ({ ...s, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const updates: any = {
        productName: form.productName,
        price: Number(form.price),
        quantity: form.quantity,
        description: form.description,
        address: form.address,
      };
      await updateProduct(editingId, updates);
      toast.success(t('common.success'));
      cancelEdit();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || t('common.error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this product? This action cannot be undone');
    if (!ok) return;
    try {
      await deleteProduct(id);
      toast.success(t('common.success'));
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || t('common.error'));
    }
  };

  const handleMarkRented = async (id: string) => {
    const ok = window.confirm('Mark this rental as rented?');
    if (!ok) return;
    try {
      await markAsRented(id);
      toast.success(t('common.success'));
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || t('common.error'));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container text-center py-20">
            <h2 className="text-xl font-semibold mb-4">{t('auth.login')}</h2>
            <Button onClick={() => window.location.href = '/auth?next=/dashboard'}>{t('auth.login')}</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold">{t('dashboard.title')}</h1>
            <div className="text-sm text-muted-foreground">{user.name ?? user.contactNumber}</div>
          </div>

          <section className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : myProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg mb-2">{t('dashboard.noListings')}</p>
                <Button onClick={() => window.location.href = '/add-product'}>{t('dashboard.addFirst')}</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Sales Section */}
                {mySales.length > 0 && (
                  <div>
                    <h2 className="font-semibold mb-3">{t('dashboard.myListings')}</h2>
                    <div className="grid gap-4">
                      {mySales.map((p: any) => (
                        <div key={p.id} className="rounded-xl border border-border p-4 bg-card flex items-start gap-4">
                          <img src={p.images?.[0] ?? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'} alt={p.productName} className="h-24 w-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-lg">{p.productName}</h3>
                                <div className="text-sm text-muted-foreground">₹{Number(p.price).toLocaleString('en-IN')}</div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => startEdit(p)} className="gap-2"><Pencil className="h-4 w-4" /> {t('dashboard.edit')}</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)} className="gap-2"><Trash className="h-4 w-4" /> {t('dashboard.delete')}</Button>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>

                            {/* Inline edit form */}
                            {editingId === p.id && (
                              <div className="mt-4 p-3 border border-border rounded-lg bg-background">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <Label>{t('addProduct.productName')}</Label>
                                    <Input value={form.productName} onChange={(e) => handleChange('productName', e.target.value)} />
                                  </div>
                                  <div>
                                    <Label>{t('addProduct.price')}</Label>
                                    <Input type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
                                  </div>
                                  <div>
                                    <Label>{t('addProduct.quantity')}</Label>
                                    <Input value={form.quantity} onChange={(e) => handleChange('quantity', e.target.value)} />
                                  </div>
                                  <div>
                                    <Label>{t('addProduct.address')}</Label>
                                    <Input value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <Label>{t('addProduct.description')}</Label>
                                  <Textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                  <Button onClick={handleSave} disabled={saving}>{saving ? t('common.loading') : t('common.success')}</Button>
                                  <Button variant="ghost" onClick={cancelEdit}><X className="h-4 w-4" /></Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rentals Section */}
                {myRentals.length > 0 && (
                  <div>
                    <h2 className="font-semibold mb-3">{t('addProduct.rent')}</h2>
                    <div className="grid gap-4">
                      {myRentals.map((p: any) => (
                        <div key={p.id} className="rounded-xl border border-border p-4 bg-card flex items-start gap-4">
                          <img src={p.images?.[0] ?? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'} alt={p.productName} className="h-24 w-24 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-lg">{p.productName}</h3>
                                <div className="text-sm text-muted-foreground">{p.rentalType ? `${p.rentalType.charAt(0).toUpperCase() + p.rentalType.slice(1)} • ` : ''}₹{Number(p.rentalPrice).toLocaleString('en-IN')} ({t('addProduct.rent')})</div>
                              </div>
                              <div className="flex gap-2 items-center">
                                <span className={`text-sm px-2 py-1 rounded ${p.rentalStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>{p.rentalStatus === 'available' ? t('productCard.available') : t('productCard.rented')}</span>
                                {p.rentalStatus === 'available' && (
                                  <Button size="sm" onClick={() => handleMarkRented(p.id)}>{t('dashboard.markAsSold')}</Button>
                                )}
                                <Button variant="outline" size="sm" onClick={() => startEdit(p)} className="gap-2"><Pencil className="h-4 w-4" /> {t('dashboard.edit')}</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)} className="gap-2"><Trash className="h-4 w-4" /> {t('dashboard.delete')}</Button>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>

                            {/* Inline edit form for rentals */}
                            {editingId === p.id && (
                              <div className="mt-4 p-3 border border-border rounded-lg bg-background">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <Label>{t('addProduct.productName')}</Label>
                                    <Input value={form.productName} onChange={(e) => handleChange('productName', e.target.value)} />
                                  </div>
                                  <div>
                                    <Label>{t('addProduct.price')}</Label>
                                    <Input type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
                                  </div>
                                  <div>
                                    <Label>{t('addProduct.quantity')}</Label>
                                    <Input value={form.quantity} onChange={(e) => handleChange('quantity', e.target.value)} />
                                  </div>
                                  <div>
                                    <Label>{t('addProduct.address')}</Label>
                                    <Input value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <Label>{t('addProduct.description')}</Label>
                                  <Textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                  <Button onClick={handleSave} disabled={saving}>{saving ? t('common.loading') : t('common.success')}</Button>
                                  <Button variant="ghost" onClick={cancelEdit}><X className="h-4 w-4" /></Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
