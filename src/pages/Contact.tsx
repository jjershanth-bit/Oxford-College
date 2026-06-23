import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

export default function Contact() {
  useScrollReveal();
  const { addNotification, currentUser } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Log in portal notifications if user is active
    if (currentUser) {
      addNotification(
        'Inquiry Received',
        `Thank you for contacting us! Your inquiry regarding "${formData.message.substring(0, 40)}..." has been logged in our advisory system.`
      );
    }
    
    toast.success('Inquiry Sent!', {
      description: "Thank you for contacting Oxford College. We will respond to your message shortly."
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <HeroBanner
        title="Contact Us"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left - Contact Form */}
            <div className="lg:w-1/2 reveal">
              <h2 className="font-heading text-2xl font-medium text-brand-dark mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={20} />
                  </div>
                  <h3 className="font-heading text-xl font-medium text-green-700 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-600">
                    Thank you for contacting us. We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-gray-200 py-3 text-brand-dark placeholder-gray-text focus:border-brand-blue focus:outline-none transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-gray-200 py-3 text-brand-dark placeholder-gray-text focus:border-brand-blue focus:outline-none transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-b-2 border-gray-200 py-3 text-brand-dark placeholder-gray-text focus:border-brand-blue focus:outline-none transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full border-b-2 border-gray-200 py-3 text-brand-dark placeholder-gray-text focus:border-brand-blue focus:outline-none transition-colors bg-transparent resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>

            {/* Right - Contact Info */}
            <div className="lg:w-1/2 reveal reveal-delay-2">
              <h2 className="font-heading text-2xl font-medium text-brand-dark mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-text font-light mb-8">
                Have questions about our programs or want to enroll? Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-brand-dark mb-1">
                      Address
                    </h4>
                    <p className="text-gray-text font-light">
                      Colombo, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-brand-dark mb-1">
                      Phone
                    </h4>
                    <a href="tel:+94779639969" className="text-gray-text font-light hover:text-brand-blue transition-colors">
                      +94 779639969
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-brand-dark mb-1">
                      Email
                    </h4>
                    <a href="mailto:infor.oxfordcollege@gmail.com" className="text-gray-text font-light hover:text-brand-blue transition-colors">
                      infor.oxfordcollege@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-brand-dark mb-1">
                      Working Hours
                    </h4>
                    <p className="text-gray-text font-light">
                      Monday - Saturday: 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="aspect-video bg-gray-light rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126741.02899849504!2d79.8139598284587!3d6.927122176465494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe1347b087e07a9d2!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Oxford College Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
