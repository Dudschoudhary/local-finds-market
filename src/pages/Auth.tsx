import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/';
  const navigate = useNavigate();
  const { checkUser, register, login } = useAuth();

  const [step, setStep] = useState<'start' | 'login' | 'register'>('start');
  const [contactNumber, setContactNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!contactNumber) return toast.error('Please enter your contact number');
    setLoading(true);
    try {
      const res = await checkUser(contactNumber);
      if (res.exists) {
        setStep('login');
      } else {
        setStep('register');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to check user');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) return toast.error('Please provide name and password');
    setLoading(true);
    try {
      await register({ name, contactNumber, password });
      toast.success('Registration successful');
      navigate(next);
    } catch (err: any) {
      toast.error(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return toast.error('Please enter your password');
    setLoading(true);
    try {
      await login({ contactNumber, password });
      toast.success('Logged in');
      navigate(next);
    } catch (err: any) {
      toast.error(err?.message || 'Login failed');
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
            <h1 className="font-display text-2xl font-bold">Sign in or Register</h1>
            <p className="text-muted-foreground">Enter your contact number to continue</p>
          </div>

          {step === 'start' && (
            <form onSubmit={handleContinue} className="space-y-4">
              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="e.g., 9876543210"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>Continue</Button>
                <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
              </div>
            </form>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label>Contact Number</Label>
                <Input value={contactNumber} disabled />
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>Register</Button>
                <Button variant="ghost" onClick={() => setStep('start')}>Back</Button>
              </div>
            </form>
          )}

          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Contact Number</Label>
                <Input value={contactNumber} disabled />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>Sign In</Button>
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
