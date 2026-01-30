import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Store, Globe, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Navigation menu items
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Browse Products' },
  ];

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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (mobileMenuRef.current && e.target instanceof Node && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const initial = user && user.name ? user.name.trim().charAt(0).toUpperCase() : (user && user.contactNumber ? user.contactNumber.charAt(0) : 'U');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Menu Button - Only visible on mobile */}
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen((s) => !s);
              }}
              className="flex items-center justify-center h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                      location.pathname === item.path
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 sm:gap-2 group">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Store className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-display text-base sm:text-xl font-semibold text-foreground">
              DesiMart
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Language Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="gap-1 text-xs font-medium px-2 sm:px-3"
          >
            <Globe className="h-4 w-4" />
            {language === 'hi' ? 'ENG' : 'हिंदी'}
          </Button>

          {/* If not authenticated, show Login button */}
          {!user && (
            <Button variant="ghost" size="sm" className="px-2 sm:px-3" onClick={() => navigate('/auth?next=' + encodeURIComponent(location.pathname))}>
              Login
            </Button>
          )}

          {/* If authenticated, show user initial with dropdown containing Dashboard and Logout */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((s) => !s)} aria-label="User menu">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
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

          <button onClick={handleSell} aria-label="Add Product">
            <Button size="sm" className="gap-1 px-2 sm:px-3">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
