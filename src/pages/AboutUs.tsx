import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Store, Users, MapPin, Heart, Shield, Leaf, Truck } from 'lucide-react';

const AboutUs = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Store className="h-10 w-10" />
              </div>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              {language === 'hi' ? 'DesiMart के बारे में' : 'About DesiMart'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'hi' 
                ? 'स्थानीय समुदायों को जोड़ना, देसी व्यापार को सशक्त बनाना'
                : 'Connecting local communities, empowering desi businesses'}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            {/* Our Story */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'हमारी कहानी' : 'Our Story'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart की शुरुआत एक साधारण विचार से हुई - स्थानीय किसानों, कारीगरों और छोटे व्यापारियों को उनके समुदाय के ग्राहकों से जोड़ना। हमने देखा कि कई प्रतिभाशाली Productक अपने Products को बेचने के लिए संघर्ष कर रहे थे, जबकि ग्राहक ताजा और स्थानीय Products की तलाश में थे।'
                  : 'DesiMart started with a simple idea - connecting local farmers, artisans, and small businesses with customers in their community. We noticed that many talented producers struggled to sell their products, while customers were searching for fresh and local products.'}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart एक मौलिक और स्वतंत्र रूप से विकसित प्लेटफॉर्म है जो भारत के कई शहरों और गांवों में स्थानीय व्यापार को सशक्त बना रहा है। हम गर्व से कह सकते हैं कि हमने हजारों विक्रेताओं को उनके व्यापार को बढ़ाने में मदद की है।'
                  : 'DesiMart is an original and independently developed platform that is empowering local businesses in many cities and villages across India. We can proudly say that we have helped thousands of sellers grow their businesses.'}
              </p>
            </section>

            {/* Our Mission */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हमारा मिशन स्थानीय अर्थव्यवस्था को मजबूत करना और हर किसी को अपने आस-पास के Products तक आसान पहुंच प्रदान करना है। हम चाहते हैं कि हर किसान, कारीगर और छोटा व्यापारी डिजिटल दुनिया में अपनी पहचान बना सके।'
                  : 'Our mission is to strengthen the local economy and provide everyone with easy access to products around them. We want every farmer, artisan, and small business owner to establish their identity in the digital world.'}
              </p>
            </section>

            {/* Unique Features */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'DesiMart की विशेषताएं' : 'What Makes DesiMart Unique'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'DesiMart सिर्फ एक मार्केटप्लेस नहीं है। हमारे पास एक विशेष "किराये पर दें" (Rent) फीचर है जो इसे अन्य प्लेटफॉर्म से अलग बनाता है। इस फीचर से उपयोगकर्ता मशीनरी, वाहन, दुकान, कमरे और अन्य वस्तुओं को किराये पर दे सकते हैं।'
                  : 'DesiMart is not just a marketplace. We have a unique "Rent" feature that sets us apart from other platforms. With this feature, users can rent out machinery, vehicles, shops, rooms, and other items.'}
              </p>
            </section>

            {/* Our Values */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'हमारे मूल्य' : 'Our Values'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'hi' ? 'समुदाय पहले' : 'Community First'}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'hi' 
                      ? 'हम स्थानीय समुदायों की सेवा करने और उन्हें मजबूत बनाने के लिए प्रतिबद्ध हैं।'
                      : 'We are committed to serving and strengthening local communities.'}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'hi' ? 'विश्वास और पारदर्शिता' : 'Trust & Transparency'}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'hi' 
                      ? 'हम अपने सभी व्यवहारों में ईमानदारी और पारदर्शिता को महत्व देते हैं।'
                      : 'We value honesty and transparency in all our dealings.'}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'hi' ? 'सस्टेनेबिलिटी' : 'Sustainability'}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'hi' 
                      ? 'स्थानीय खरीदारी से परिवहन कम होता है और पर्यावरण की रक्षा होती है।'
                      : 'Local shopping reduces transportation and protects the environment.'}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'hi' ? 'किराये की सुविधा' : 'Rental Feature'}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'hi' 
                      ? 'मशीनरी, वाहन, दुकान और अन्य वस्तुओं को किराये पर देने की सुविधा।'
                      : 'Facility to rent out machinery, vehicles, shops and other items.'}
                  </p>
                </div>
              </div>
            </section>

            {/* What We Offer */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'हम क्या प्रदान करते हैं' : 'What We Offer'}
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'ताजा कृषि Product सीधे किसानों से' : 'Fresh agricultural products directly from farmers'}</li>
                <li>{language === 'hi' ? 'स्थानीय किराने का सामान और घरेलू Product' : 'Local groceries and household products'}</li>
                <li>{language === 'hi' ? 'हस्तशिल्प और कारीगरी का सामान' : 'Handicrafts and artisan goods'}</li>
                <li>{language === 'hi' ? 'डेयरी Product और बेकरी आइटम' : 'Dairy products and bakery items'}</li>
                <li>{language === 'hi' ? 'मशीनरी और उपकरण किराए पर (विशेष फीचर)' : 'Machinery and equipment for rent (unique feature)'}</li>
                <li>{language === 'hi' ? 'वाहन, दुकान, कमरे किराये पर' : 'Vehicles, shops, rooms for rent'}</li>
                <li>{language === 'hi' ? 'स्थानीय सेवाएं और बहुत कुछ' : 'Local services and much more'}</li>
              </ul>
            </section>

            {/* Why Choose Us */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'DesiMart क्यों चुनें?' : 'Why Choose DesiMart?'}
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>{language === 'hi' ? 'सीधे विक्रेताओं से संपर्क - कोई बिचौलिया नहीं' : 'Direct contact with sellers - no middlemen'}</li>
                <li>{language === 'hi' ? 'GPS-आधारित खोज से आस-पास के Product खोजें' : 'Find nearby products with GPS-based search'}</li>
                <li>{language === 'hi' ? 'Hindi और English दोनों में उपलब्ध' : 'Available in both Hindi and English'}</li>
                <li>{language === 'hi' ? 'विक्रेताओं के लिए मुफ्त लिस्टिंग' : 'Free listing for sellers'}</li>
                <li>{language === 'hi' ? 'बेचें और किराये पर दें - दोनों विकल्प' : 'Sell and Rent - both options available'}</li>
                <li>{language === 'hi' ? 'स्थानीय अर्थव्यवस्था को सपोर्ट करें' : 'Support the local economy'}</li>
                <li>{language === 'hi' ? 'ताजा और गुणवत्ता वाले Product' : 'Fresh and quality products'}</li>
              </ul>
            </section>

            {/* Join Us */}
            <section className="space-y-4 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {language === 'hi' ? 'हमारे साथ जुड़ें' : 'Join Us'}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'चाहे आप एक किसान हों, कारीगर हों, या छोटे व्यापारी - DesiMart पर अपने Products को मुफ्त में सूचीबद्ध करें और अपने समुदाय तक पहुंचें। खरीदार के रूप में, अपने आस-पास के ताजा और स्थानीय Products की खोज करें।'
                  : 'Whether you are a farmer, artisan, or small business owner - list your products for free on DesiMart and reach your community. As a buyer, discover fresh and local products near you.'}
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === 'hi' ? 'संपर्क करें' : 'Get In Touch'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {language === 'hi' 
                  ? 'हमसे संपर्क करने के लिए:'
                  : 'To get in touch with us:'}
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

export default AboutUs;
