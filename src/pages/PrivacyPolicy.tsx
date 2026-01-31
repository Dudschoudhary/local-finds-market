import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              {language === 'hi' 
                ? 'अंतिम अपडेट: जनवरी 2026' 
                : 'Last Updated: January 2026'}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'परिचय' : 'Introduction'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart ("हम", "हमारा", या "हमें") में आपकी गोपनीयता की रक्षा करने के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट और सेवाओं का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र, उपयोग और साझा करते हैं।'
                  : 'DesiMart ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your information when you use our website and services.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'हम कौन सी जानकारी एकत्र करते हैं' : 'Information We Collect'}
              </h2>
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-foreground">
                  {language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{language === 'hi' ? 'नाम और संपर्क जानकारी (ईमेल, फोन नंबर)' : 'Name and contact information (email, phone number)'}</li>
                  <li>{language === 'hi' ? 'खाता क्रेडेंशियल्स' : 'Account credentials'}</li>
                  <li>{language === 'hi' ? 'स्थान डेटा (जब आप अनुमति देते हैं)' : 'Location data (when you grant permission)'}</li>
                  <li>{language === 'hi' ? 'Product लिस्टिंग विवरण' : 'Product listing details'}</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground">
                  {language === 'hi' ? 'स्वचालित रूप से एकत्रित जानकारी' : 'Automatically Collected Information'}
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{language === 'hi' ? 'डिवाइस और ब्राउज़र जानकारी' : 'Device and browser information'}</li>
                  <li>{language === 'hi' ? 'IP पता' : 'IP address'}</li>
                  <li>{language === 'hi' ? 'कुकीज़ और समान ट्रैकिंग तकनीकें' : 'Cookies and similar tracking technologies'}</li>
                  <li>{language === 'hi' ? 'उपयोग डेटा और एनालिटिक्स' : 'Usage data and analytics'}</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'हम आपकी जानकारी का उपयोग कैसे करते हैं' : 'How We Use Your Information'}
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'हमारी सेवाएं प्रदान करने और बनाए रखने के लिए' : 'To provide and maintain our services'}</li>
                <li>{language === 'hi' ? 'खरीदारों और विक्रेताओं के बीच लेनदेन की सुविधा के लिए' : 'To facilitate transactions between buyers and sellers'}</li>
                <li>{language === 'hi' ? 'आपके खाते के बारे में संचार भेजने के लिए' : 'To send communications about your account'}</li>
                <li>{language === 'hi' ? 'ग्राहक सहायता प्रदान करने के लिए' : 'To provide customer support'}</li>
                <li>{language === 'hi' ? 'धोखाधड़ी का पता लगाने और रोकने के लिए' : 'To detect and prevent fraud'}</li>
                <li>{language === 'hi' ? 'हमारी सेवाओं में सुधार करने के लिए' : 'To improve our services'}</li>
                <li>{language === 'hi' ? 'कानूनी दायित्वों का पालन करने के लिए' : 'To comply with legal obligations'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'जानकारी साझा करना' : 'Information Sharing'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम आपकी व्यक्तिगत जानकारी को निम्नलिखित परिस्थितियों में साझा कर सकते हैं:'
                  : 'We may share your personal information in the following circumstances:'}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'आपकी सहमति से' : 'With your consent'}</li>
                <li>{language === 'hi' ? 'लेनदेन की सुविधा के लिए अन्य उपयोगकर्ताओं के साथ' : 'With other users to facilitate transactions'}</li>
                <li>{language === 'hi' ? 'सेवा प्रदाताओं और भागीदारों के साथ' : 'With service providers and partners'}</li>
                <li>{language === 'hi' ? 'कानूनी आवश्यकताओं के अनुपालन के लिए' : 'For legal compliance'}</li>
                <li>{language === 'hi' ? 'व्यापार हस्तांतरण के संबंध में' : 'In connection with business transfers'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'कुकीज़ और ट्रैकिंग' : 'Cookies and Tracking'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम आपके अनुभव को बेहतर बनाने, ट्रैफ़िक का विश्लेषण करने और विज्ञापन वितरित करने के लिए कुकीज़ और समान ट्रैकिंग तकनीकों का उपयोग करते हैं। आप अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को नियंत्रित कर सकते हैं।'
                  : 'We use cookies and similar tracking technologies to enhance your experience, analyze traffic, and deliver advertisements. You can control cookies through your browser settings.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'डेटा सुरक्षा' : 'Data Security'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उचित तकनीकी और संगठनात्मक उपाय लागू करते हैं। हालांकि, इंटरनेट पर कोई भी प्रसारण 100% सुरक्षित नहीं है।'
                  : 'We implement appropriate technical and organizational measures to protect your personal information. However, no transmission over the internet is 100% secure.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'आपके अधिकार' : 'Your Rights'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'आपके पास निम्नलिखित अधिकार हैं:'
                  : 'You have the following rights:'}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'अपने डेटा तक पहुंचने और प्राप्त करने का अधिकार' : 'Right to access and receive your data'}</li>
                <li>{language === 'hi' ? 'गलत जानकारी को सही करने का अधिकार' : 'Right to rectify inaccurate information'}</li>
                <li>{language === 'hi' ? 'अपने डेटा को हटाने का अनुरोध करने का अधिकार' : 'Right to request deletion of your data'}</li>
                <li>{language === 'hi' ? 'मार्केटिंग संचार से ऑप्ट-आउट करने का अधिकार' : 'Right to opt-out of marketing communications'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'बच्चों की गोपनीयता' : "Children's Privacy"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हमारी सेवाएं 18 वर्ष से कम उम्र के बच्चों के लिए नहीं हैं। हम जानबूझकर बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते हैं।'
                  : 'Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'इस नीति में परिवर्तन' : 'Changes to This Policy'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके किसी भी बदलाव के बारे में आपको सूचित करेंगे।'
                  : 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'
                  : 'If you have any questions about this Privacy Policy, please contact us:'}
              </p>
              <p className="text-muted-foreground">
                Website: desimart.me<br />
                Email: dudaram656@gmail.com<br />
                Phone: +91 94686 50730<br />
                {language === 'hi' ? 'पता: भारत' : 'Address: India'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
