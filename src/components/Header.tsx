import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Store, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSell = () => {
    if (user && user.id) {
      navigate('/add-product');
    } else {
      navigate('/auth?next=/add-product');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Store className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold text-foreground">
              LocalMart
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Local Products
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/products' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Browse Products
          </Link>
        </nav>

        <button onClick={handleSell} aria-label="Sell Product">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Sell Product</span>
            <span className="sm:hidden">Sell</span>
          </Button>
        </button>
      </div>
    </header>
  );
};

export default Header;
