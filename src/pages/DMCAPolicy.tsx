import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const DMCAPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            {language === 'hi' ? 'DMCA नीति' : 'DMCA Policy'}
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
                  ? 'DesiMart दूसरों की बौद्धिक संपदा का सम्मान करता है और अपेक्षा करता है कि हमारे उपयोगकर्ता भी ऐसा ही करें। डिजिटल मिलेनियम कॉपीराइट एक्ट (DMCA) के अनुसार, हम कॉपीराइट उल्लंघन की शिकायतों का तुरंत जवाब देंगे।'
                  : 'DesiMart respects the intellectual property of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to claims of copyright infringement.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'कॉपीराइट उल्लंघन की रिपोर्ट करना' : 'Reporting Copyright Infringement'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'यदि आप मानते हैं कि आपकी कॉपीराइट सामग्री का उल्लंघन किया गया है, तो कृपया निम्नलिखित जानकारी के साथ DMCA टेकडाउन नोटिस सबमिट करें:'
                  : 'If you believe your copyrighted material has been infringed, please submit a DMCA takedown notice with the following information:'}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'कॉपीराइट स्वामी या अधिकृत प्रतिनिधि का भौतिक या इलेक्ट्रॉनिक हस्ताक्षर' : 'Physical or electronic signature of the copyright owner or authorized representative'}</li>
                <li>{language === 'hi' ? 'उल्लंघन किए गए कॉपीराइट कार्य की पहचान' : 'Identification of the copyrighted work claimed to have been infringed'}</li>
                <li>{language === 'hi' ? 'उल्लंघनकारी सामग्री की पहचान और उसका स्थान' : 'Identification and location of the infringing material'}</li>
                <li>{language === 'hi' ? 'आपकी संपर्क जानकारी (पता, फोन नंबर, ईमेल)' : 'Your contact information (address, phone number, email)'}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'DMCA नोटिस कहां भेजें' : 'Where to Send DMCA Notices'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'कृपया अपना DMCA नोटिस हमारे निर्दिष्ट कॉपीराइट एजेंट को भेजें:'
                  : 'Please send your DMCA notice to our designated Copyright Agent:'}
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>{language === 'hi' ? 'कॉपीराइट एजेंट' : 'Copyright Agent'}</strong><br />
                  DesiMart<br />
                  Website: desimart.me<br />
                  Email: dudaram656@gmail.com<br />
                  Phone: +91 94686 50730<br />
                  {language === 'hi' ? 'पता: भारत' : 'Address: India'}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'बार-बार उल्लंघन करने वालों की नीति' : 'Repeat Infringer Policy'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart ने बार-बार उल्लंघन करने वालों के खातों को समाप्त करने की नीति अपनाई है। यदि कोई उपयोगकर्ता बार-बार कॉपीराइट उल्लंघन करता पाया जाता है, तो हम उनके खाते को स्थायी रूप से निलंबित या समाप्त कर सकते हैं।'
                  : 'DesiMart has adopted a policy of terminating accounts of repeat infringers. If a user is found to repeatedly engage in copyright infringement, we may permanently suspend or terminate their account.'}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DMCA से संबंधित किसी भी प्रश्न के लिए, कृपया हमसे संपर्क करें:'
                  : 'For any questions related to DMCA, please contact us:'}
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

export default DMCAPolicy;
