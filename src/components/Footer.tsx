import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Facebook, Twitter, Youtube, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { categories } from '@/data/categories';
import logoImage from '@/assets/images/desimart.png';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const { t, getCategoryLabel } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="mt-auto bg-slate-900">
      {/* Main Footer Content */}
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden bg-white/10">
                <img src={logoImage} alt="DesiMart Logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-tight">DesiMart</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com/duda.ram.choudhary" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://twitter.com/erduds656" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://instagram.com/dudaram_choudhary_656" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@vigatbahi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleSellProduct} className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  Sell Your Product
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5 tracking-wide">Legal & Policies</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/dmca-policy" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  DMCA Policy
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-white hover:pl-1 transition-all duration-300 text-sm">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white text-lg mb-5 tracking-wide">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Nai Undari, Jodhpur,<br />
                  Rajasthan 342001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="text-slate-400 hover:text-white transition-colors text-sm">
                  +91-9876543210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:contact@desimart.in" className="text-slate-400 hover:text-white transition-colors text-sm">
                  contact@desimart.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-10 border-t border-slate-800">
          <div className="max-w-2xl">
            <h4 className="font-bold text-white text-lg mb-2">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Join our subscribers list to get the latest news, updates and special offers directly in your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 px-6">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 py-5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} DesiMart. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for local communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
