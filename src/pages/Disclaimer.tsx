import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Disclaimer = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            {language === 'hi' ? 'अस्वीकरण' : 'Disclaimer'}
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              {language === 'hi' 
                ? 'अंतिम अपडेट: जनवरी 2026' 
                : 'Last Updated: January 2026'}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'सामान्य अस्वीकरण' : 'General Disclaimer'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart वेबसाइट (desimart.me) पर दी गई जानकारी केवल सामान्य सूचनात्मक उद्देश्यों के लिए है। जबकि हम जानकारी को अद्यतन और सही रखने का प्रयास करते हैं, हम वेबसाइट पर किसी भी जानकारी की पूर्णता, सटीकता, विश्वसनीयता, उपयुक्तता या उपलब्धता के बारे में किसी भी प्रकार की, व्यक्त या निहित, कोई प्रतिनिधित्व या वारंटी नहीं देते हैं।'
                  : 'The information provided on the DesiMart website (desimart.me) is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability of the information on the website.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'उत्पाद और सेवाएं' : 'Products and Services'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart एक मार्केटप्लेस प्लेटफॉर्म है जो खरीदारों और विक्रेताओं को जोड़ता है। हम विक्रेताओं द्वारा सूचीबद्ध उत्पादों या सेवाओं की गुणवत्ता, सुरक्षा, या वैधता की गारंटी नहीं देते हैं। उपयोगकर्ताओं को किसी भी लेनदेन से पहले अपना उचित परिश्रम करने की सलाह दी जाती है।'
                  : 'DesiMart is a marketplace platform that connects buyers and sellers. We do not guarantee the quality, safety, or legality of products or services listed by sellers. Users are advised to conduct their own due diligence before any transaction.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'बाहरी लिंक' : 'External Links'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इस वेबसाइट में अन्य वेबसाइटों के लिंक हो सकते हैं जो तीसरे पक्षों द्वारा संचालित हैं। हमारा इन वेबसाइटों की सामग्री, गोपनीयता नीतियों या प्रथाओं पर कोई नियंत्रण नहीं है और इसके लिए कोई जिम्मेदारी नहीं लेते हैं।'
                  : 'This website may contain links to other websites operated by third parties. We have no control over the content, privacy policies or practices of these websites and assume no responsibility for them.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'विज्ञापन अस्वीकरण' : 'Advertising Disclaimer'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इस वेबसाइट पर तीसरे पक्ष के विज्ञापन प्रदर्शित किए जा सकते हैं, जिसमें Google AdSense के माध्यम से विज्ञापन शामिल हैं। इन विज्ञापनों की सामग्री विज्ञापनदाताओं की जिम्मेदारी है, और DesiMart विज्ञापित उत्पादों या सेवाओं का समर्थन नहीं करता है। इन विज्ञापनों के माध्यम से किसी भी खरीद या बातचीत में संलग्न होते समय कृपया सावधानी बरतें।'
                  : 'This website may display third-party advertisements, including ads served through Google AdSense. The content of these advertisements is the responsibility of the advertisers, and DesiMart does not endorse the products or services advertised. Please exercise caution when engaging in any purchase or interaction through these advertisements.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'एफिलिएट लिंक' : 'Affiliate Links'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इस वेबसाइट में एफिलिएट लिंक हो सकते हैं जिनके माध्यम से हम कमीशन कमा सकते हैं। इससे आपके द्वारा भुगतान की जाने वाली कीमत प्रभावित नहीं होती है। हम केवल उन उत्पादों और सेवाओं की सिफारिश करते हैं जिन पर हमें विश्वास है।'
                  : 'This website may contain affiliate links through which we may earn commissions. This does not affect the price you pay. We only recommend products and services we believe in.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'उपयोगकर्ता-जनित सामग्री' : 'User-Generated Content'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इस वेबसाइट पर उपयोगकर्ताओं द्वारा पोस्ट की गई सामग्री, जिसमें उत्पाद लिस्टिंग, समीक्षाएं और टिप्पणियां शामिल हैं, उन उपयोगकर्ताओं के विचारों को दर्शाती हैं और जरूरी नहीं कि DesiMart के विचारों को प्रतिबिंबित करें।'
                  : 'Content posted by users on this website, including product listings, reviews and comments, reflects the views of those users and does not necessarily reflect the views of DesiMart.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'कोई पेशेवर सलाह नहीं' : 'No Professional Advice'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इस वेबसाइट पर दी गई जानकारी पेशेवर सलाह का विकल्प नहीं है। किसी भी वित्तीय, कानूनी, या अन्य पेशेवर मामलों के लिए, कृपया योग्य पेशेवर से परामर्श लें।'
                  : 'The information provided on this website is not a substitute for professional advice. For any financial, legal, or other professional matters, please consult with a qualified professional.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'दायित्व की सीमा' : 'Limitation of Liability'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'किसी भी स्थिति में DesiMart किसी भी नुकसान (बिना किसी सीमा के, डेटा या लाभ के नुकसान, या व्यापार रुकावट के कारण नुकसान सहित) के लिए उत्तरदायी नहीं होगा जो इस वेबसाइट के उपयोग या उपयोग करने में असमर्थता से उत्पन्न होता है।'
                  : 'In no event shall DesiMart be liable for any damages whatsoever (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use this website.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'अस्वीकरण में परिवर्तन' : 'Changes to Disclaimer'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हम किसी भी समय इस अस्वीकरण को अपडेट करने का अधिकार सुरक्षित रखते हैं। परिवर्तन इस पृष्ठ पर प्रकाशित होते ही प्रभावी होंगे।'
                  : 'We reserve the right to update this disclaimer at any time. Changes will be effective as soon as they are published on this page.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'इस अस्वीकरण के बारे में किसी भी प्रश्न के लिए, कृपया हमसे संपर्क करें:'
                  : 'For any questions about this disclaimer, please contact us:'}
              </p>
              <p className="text-muted-foreground">
                Website: desimart.me<br />
                Email: dudaram656@gmail.com<br />
                Phone: +91 94686 50730<br />
                {language === 'hi' ? 'पता: नई उंडारी, जोधपुर, राजस्थान 342001, भारत' : 'Address: Nai Undari, Jodhpur, Rajasthan 342001, India'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
