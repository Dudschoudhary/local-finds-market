import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';

const ContactUs = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(
      language === 'hi' 
        ? 'आपका संदेश भेज दिया गया है! हम जल्द ही आपसे संपर्क करेंगे।' 
        : 'Your message has been sent! We will contact you soon.'
    );
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              {language === 'hi' ? 'हमसे संपर्क करें' : 'Contact Us'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'hi' 
                ? 'हमें आपकी मदद करने में खुशी होगी। कोई भी प्रश्न या सुझाव हो, हमें बताएं।'
                : 'We would be happy to help you. Let us know if you have any questions or suggestions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {language === 'hi' ? 'संदेश भेजें' : 'Send a Message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === 'hi' ? 'नाम' : 'Name'} *</Label>
                  <Input
                    id="name"
                    placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === 'hi' ? 'ईमेल' : 'Email'} *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === 'hi' ? 'आपका ईमेल' : 'Your email'}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{language === 'hi' ? 'विषय' : 'Subject'}</Label>
                  <Input
                    id="subject"
                    placeholder={language === 'hi' ? 'संदेश का विषय' : 'Message subject'}
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{language === 'hi' ? 'संदेश' : 'Message'} *</Label>
                  <Textarea
                    id="message"
                    placeholder={language === 'hi' ? 'अपना संदेश यहां लिखें...' : 'Write your message here...'}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>{language === 'hi' ? 'भेज रहे हैं...' : 'Sending...'}</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === 'hi' ? 'ईमेल' : 'Email'}
                      </h3>
                      <p className="text-sm text-muted-foreground">support@desimart.in</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === 'hi' ? 'फ़ोन' : 'Phone'}
                      </h3>
                      <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === 'hi' ? 'पता' : 'Address'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? 'भारत' : 'India'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {language === 'hi' ? 'समय' : 'Hours'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'hi' ? '24/7 ऑनलाइन सहायता' : '24/7 Online Support'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {language === 'hi' ? 'DesiMart पर कैसे बेचें?' : 'How to sell on DesiMart?'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'hi' 
                        ? 'अकाउंट बनाएं, "उत्पाद जोड़ें" पर क्लिक करें और अपने उत्पाद की जानकारी भरें। यह मुफ्त है!'
                        : 'Create an account, click "Add Product" and fill in your product details. It\'s free!'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">
                      {language === 'hi' ? 'किराये पर कैसे दें?' : 'How to rent out items?'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'hi' 
                        ? 'उत्पाद जोड़ते समय "Rent" टैब चुनें और मशीनरी, वाहन, दुकान या कमरे को किराये पर दें।'
                        : 'Select the "Rent" tab when adding a product and rent out machinery, vehicles, shops or rooms.'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">
                      {language === 'hi' ? 'क्या कोई लिस्टिंग शुल्क है?' : 'Is there any listing fee?'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'hi' 
                        ? 'नहीं, DesiMart पर उत्पाद सूचीबद्ध करना पूरी तरह से मुफ्त है।'
                        : 'No, listing products on DesiMart is completely free.'}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">
                      {language === 'hi' ? 'विक्रेता से कैसे संपर्क करें?' : 'How to contact a seller?'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'hi' 
                        ? 'उत्पाद पृष्ठ पर विक्रेता का फोन नंबर दिया होता है। आप सीधे कॉल या WhatsApp कर सकते हैं।'
                        : 'The seller\'s phone number is provided on the product page. You can call or WhatsApp directly.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">
                  {language === 'hi' ? 'हम यहां आपकी मदद के लिए हैं!' : 'We are here to help!'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'चाहे आप खरीदार हों या विक्रेता, हमारी टीम आपके सभी सवालों का जवाब देने के लिए तैयार है। हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं।'
                    : 'Whether you are a buyer or seller, our team is ready to answer all your questions. We usually respond within 24 hours.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
