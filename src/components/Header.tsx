import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Store, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleSell = () => {
    if (user && user.id) {
      navigate('/add-product');
    } else {
      navigate('/auth?next=/add-product');
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const initial = user && user.name ? user.name.trim().charAt(0).toUpperCase() : (user && user.contactNumber ? user.contactNumber.charAt(0) : 'U');

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

        <div className="flex items-center gap-3">
          {/* If not authenticated, show Login button */}
          {!user && (
            <Button variant="ghost" onClick={() => navigate('/auth?next=' + encodeURIComponent(location.pathname))}>
              Login
            </Button>
          )}

          {/* If authenticated, show user initial with dropdown containing Dashboard and Logout */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((s) => !s)} aria-label="User menu">
                <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {initial}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-md overflow-hidden">
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-muted">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-muted">Logout</button>
                </div>
              )}
            </div>
          )}

          <button onClick={handleSell} aria-label="Sell Product">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Sell Product</span>
              <span className="sm:hidden">Sell</span>
            </Button>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
