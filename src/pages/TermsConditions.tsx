import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsConditions = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            {language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              {language === 'hi' 
                ? 'अंतिम अपडेट: जनवरी 2026' 
                : 'Last Updated: January 2026'}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'शर्तों की स्वीकृति' : 'Acceptance of Terms'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart वेबसाइट और सेवाओं का उपयोग करके, आप इन नियमों और शर्तों से बंधे होने के लिए सहमत हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।'
                  : 'By using the DesiMart website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'सेवाओं का विवरण' : 'Description of Services'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart एक ऑनलाइन मार्केटप्लेस प्लेटफॉर्म है जो स्थानीय खरीदारों और विक्रेताओं को जोड़ता है। हम उपयोगकर्ताओं को कृषि उत्पादों, किराने का सामान, हस्तशिल्प और अन्य स्थानीय उत्पादों को सूचीबद्ध करने, खोजने और खरीदने की सुविधा प्रदान करते हैं। इसके अलावा, DesiMart में एक विशेष "किराये पर दें" (Rent) फीचर है जो उपयोगकर्ताओं को मशीनरी, वाहन, दुकान, कमरे और अन्य वस्तुओं को किराये पर देने की सुविधा देता है।'
                  : 'DesiMart is an online marketplace platform that connects local buyers and sellers. We provide facilities for users to list, discover, and purchase agricultural products, groceries, handicrafts, and other local products. Additionally, DesiMart features a unique "Rent" feature that allows users to rent out machinery, vehicles, shops, rooms, and other items.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'उपयोगकर्ता खाते' : 'User Accounts'}
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'आपको सटीक और पूर्ण पंजीकरण जानकारी प्रदान करनी होगी' : 'You must provide accurate and complete registration information'}</li>
                <li>{language === 'hi' ? 'आप अपने खाते की क्रेडेंशियल्स की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं' : 'You are responsible for maintaining the confidentiality of your account credentials'}</li>
                <li>{language === 'hi' ? 'आप अपने खाते के तहत होने वाली सभी गतिविधियों के लिए जिम्मेदार हैं' : 'You are responsible for all activities that occur under your account'}</li>
                <li>{language === 'hi' ? 'हमारी सेवाओं का उपयोग करने के लिए आपकी उम्र कम से कम 18 वर्ष होनी चाहिए' : 'You must be at least 18 years old to use our services'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'विक्रेता की जिम्मेदारियां' : 'Seller Responsibilities'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' ? 'विक्रेता के रूप में, आप सहमत हैं:' : 'As a seller, you agree to:'}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'उत्पादों का सटीक विवरण और छवियां प्रदान करना' : 'Provide accurate descriptions and images of products'}</li>
                <li>{language === 'hi' ? 'सही मूल्य निर्धारण जानकारी बनाए रखना' : 'Maintain correct pricing information'}</li>
                <li>{language === 'hi' ? 'सभी लागू कानूनों और विनियमों का पालन करना' : 'Comply with all applicable laws and regulations'}</li>
                <li>{language === 'hi' ? 'खरीदारों के साथ सम्मानजनक व्यवहार करना' : 'Deal respectfully with buyers'}</li>
                <li>{language === 'hi' ? 'कोई भी निषिद्ध या अवैध वस्तुएं नहीं बेचना' : 'Not sell any prohibited or illegal items'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'खरीदार की जिम्मेदारियां' : 'Buyer Responsibilities'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' ? 'खरीदार के रूप में, आप सहमत हैं:' : 'As a buyer, you agree to:'}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'खरीदने से पहले उत्पाद विवरण पढ़ना' : 'Read product descriptions before purchasing'}</li>
                <li>{language === 'hi' ? 'विक्रेताओं के साथ सद्भावना से व्यवहार करना' : 'Deal in good faith with sellers'}</li>
                <li>{language === 'hi' ? 'सहमत लेनदेन को पूरा करना' : 'Complete agreed transactions'}</li>
                <li>{language === 'hi' ? 'सच्ची और उचित समीक्षाएं प्रदान करना' : 'Provide honest and fair reviews'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'निषिद्ध सामग्री' : 'Prohibited Content'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' ? 'निम्नलिखित सामग्री सख्त वर्जित है:' : 'The following content is strictly prohibited:'}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'अवैध उत्पाद या सेवाएं' : 'Illegal products or services'}</li>
                <li>{language === 'hi' ? 'नकली या चोरी का सामान' : 'Counterfeit or stolen goods'}</li>
                <li>{language === 'hi' ? 'भ्रामक या धोखाधड़ी वाली लिस्टिंग' : 'Misleading or fraudulent listings'}</li>
                <li>{language === 'hi' ? 'आपत्तिजनक या अश्लील सामग्री' : 'Offensive or obscene content'}</li>
                <li>{language === 'hi' ? 'दूसरों के बौद्धिक संपदा अधिकारों का उल्लंघन करने वाली सामग्री' : 'Content that infringes on others intellectual property rights'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'लेनदेन और भुगतान' : 'Transactions and Payments'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart खरीदारों और विक्रेताओं के बीच सीधे संपर्क की सुविधा प्रदान करता है। सभी लेनदेन सीधे पार्टियों के बीच होते हैं। हम भुगतान या उत्पाद की गुणवत्ता की गारंटी नहीं देते हैं।'
                  : 'DesiMart facilitates direct contact between buyers and sellers. All transactions occur directly between parties. We do not guarantee payment or product quality.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'बौद्धिक संपदा' : 'Intellectual Property'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart वेबसाइट पर सभी सामग्री, ट्रेडमार्क और बौद्धिक संपदा हमारी या हमारे लाइसेंसधारकों की संपत्ति है। DesiMart एक मौलिक और स्वतंत्र रूप से विकसित प्लेटफॉर्म है।'
                  : 'All content, trademarks, and intellectual property on the DesiMart website are the property of us or our licensors. DesiMart is an original and independently developed platform.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'दायित्व की सीमा' : 'Limitation of Liability'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart उपयोगकर्ताओं के बीच लेनदेन से उत्पन्न किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, या परिणामी क्षति के लिए उत्तरदायी नहीं होगा। हम केवल एक प्लेटफॉर्म प्रदाता हैं।'
                  : 'DesiMart shall not be liable for any direct, indirect, incidental, or consequential damages arising from transactions between users. We are only a platform provider.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'क्षतिपूर्ति' : 'Indemnification'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'आप इन शर्तों के उल्लंघन या हमारी सेवाओं के आपके उपयोग से उत्पन्न किसी भी दावे, क्षति, या खर्चों के लिए DesiMart को क्षतिपूर्ति करने और हानिरहित रखने के लिए सहमत हैं।'
                  : 'You agree to indemnify and hold DesiMart harmless from any claims, damages, or expenses arising from your violation of these terms or your use of our services.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'समाप्ति' : 'Termination'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम किसी भी समय, बिना किसी सूचना के, इन शर्तों के उल्लंघन सहित किसी भी कारण से आपकी पहुंच को समाप्त या निलंबित कर सकते हैं।'
                  : 'We may terminate or suspend your access at any time, without notice, for any reason, including violation of these terms.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'शासी कानून' : 'Governing Law'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'ये नियम और शर्तें भारत के कानूनों के अनुसार शासित और व्याख्यायित होंगी। किसी भी विवाद का निपटारा भारत के न्यायालयों में किया जाएगा।'
                  : 'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the courts of India.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'शर्तों में परिवर्तन' : 'Changes to Terms'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। परिवर्तन इस पृष्ठ पर पोस्ट किए जाने पर तुरंत प्रभावी होंगे।'
                  : 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इन नियमों और शर्तों के बारे में किसी भी प्रश्न के लिए, कृपया हमसे संपर्क करें:'
                  : 'For any questions about these Terms and Conditions, please contact us:'}
              </p>
              <p className="text-muted-foreground">
                Email: legal@desimart.in<br />
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

export default TermsConditions;
