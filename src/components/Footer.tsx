import { Link } from 'react-router-dom';
import { Store, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Store className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-semibold">LocalMart</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting local sellers with nearby buyers. Fresh, homemade, and authentic products at your fingertips.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">Browse Products</Link></li>
              <li><Link to="/add-product" className="hover:text-primary transition-colors">Sell Your Product</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products?category=dairy" className="hover:text-primary transition-colors">Dairy & Ghee</Link></li>
              <li><Link to="/products?category=honey" className="hover:text-primary transition-colors">Honey & Natural</Link></li>
              <li><Link to="/products?category=spices" className="hover:text-primary transition-colors">Spices & Masalas</Link></li>
              <li><Link to="/products?category=pickles" className="hover:text-primary transition-colors">Pickles & Chutneys</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 LocalMart. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for local communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
