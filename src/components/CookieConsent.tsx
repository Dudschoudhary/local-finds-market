import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg animate-in slide-in-from-bottom duration-500">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground text-sm">
                {language === 'hi' ? 'कुकी सहमति' : 'Cookie Consent'}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने, वैयक्तिकृत विज्ञापन या सामग्री प्रदर्शित करने और हमारे ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं। "सभी स्वीकार करें" पर क्लिक करके, आप कुकीज़ के हमारे उपयोग के लिए सहमति देते हैं।'
                  : 'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'}
                {' '}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  {language === 'hi' ? 'और जानें' : 'Learn more'}
                </Link>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="text-sm"
            >
              {language === 'hi' ? 'अस्वीकार करें' : 'Decline'}
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="text-sm"
            >
              {language === 'hi' ? 'सभी स्वीकार करें' : 'Accept All'}
            </Button>
          </div>
          <button
            onClick={declineCookies}
            className="absolute top-2 right-2 md:hidden p-1 rounded-full hover:bg-secondary"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
