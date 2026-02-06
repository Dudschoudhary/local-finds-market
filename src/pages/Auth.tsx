import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/';
  const navigate = useNavigate();
  const { checkUser, register, login } = useAuth();
  const { t } = useLanguage();

  const [step, setStep] = useState<'start' | 'login' | 'register'>('start');
  const [contactNumber, setContactNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!contactNumber) return toast.error(t('toasts.enterContact'));
    setLoading(true);
    try {
      const res = await checkUser(contactNumber);
      if (res.exists) {
        setStep('login');
      } else {
        setStep('register');
      }
    } catch (err: any) {
      toast.error(err?.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) return toast.error(t('common.error'));
    setLoading(true);
    try {
      await register({ name, contactNumber, password });
      toast.success(t('common.success'));
      navigate(next);
    } catch (err: any) {
      toast.error(err?.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return toast.error(t('common.error'));
    setLoading(true);
    try {
      await login({ contactNumber, password });
      toast.success(t('common.success'));
      navigate(next);
    } catch (err: any) {
      toast.error(err?.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-lg">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold">{t('auth.welcome')}</h1>
            <p className="text-muted-foreground">{t('auth.enterPhone')}</p>
          </div>

          {step === 'start' && (
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <Label htmlFor="contactNumber">{t('addProduct.contactNumber')}</Label>
                <Input
                  id="contactNumber"
                  placeholder="e.g., 9468650730"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? t('auth.checking') : t('auth.continue')}
                </Button>
                <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
              </div>
            </form>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label>{t('addProduct.contactNumber')}</Label>
                <Input value={contactNumber} disabled />
              </div>
              <div>
                <Label htmlFor="name">{t('auth.name')}</Label>
                <Input id="name" placeholder={t('auth.enterName')} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t('auth.enterPassword')} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? t('common.loading') : t('auth.register')}
                </Button>
                <Button variant="ghost" onClick={() => setStep('start')}>Back</Button>
              </div>
            </form>
          )}

          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>{t('addProduct.contactNumber')}</Label>
                <Input value={contactNumber} disabled />
              </div>
              <div>
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t('auth.enterPassword')} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? t('common.loading') : t('auth.login')}
                </Button>
                <Button variant="ghost" onClick={() => setStep('start')}>Back</Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
