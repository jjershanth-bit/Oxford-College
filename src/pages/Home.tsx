import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Clock, Star, HelpCircle, Mail, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { programs } from '@/data/programs';
import { toast } from 'sonner';

export default function Home() {
  useScrollReveal();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const featuredPrograms = programs.slice(0, 4);

  const stats = [
    { number: '15+', label: 'Years of Excellence', icon: Clock },
    { number: '50+', label: 'Expert Lecturers', icon: Users },
    { number: '5000+', label: 'Students Trained', icon: BookOpen },
    { number: '9', label: 'Professional Programs', icon: Award },
  ];

  const faqs = [
    {
      q: "Can Tamil speaking students easily learn English here?",
      a: "Yes, our training is led by Tamil University Lecturers. We provide bilingual explanation aids and custom vocabulary maps tailored for Tamil speakers globally."
    },
    {
      q: "Are classes conducted online or in-person?",
      a: "Lectures are delivered live online with individual interaction. We provide full session recordings so you can learn from home at any time."
    },
    {
      q: "What is your spoken English guarantee?",
      a: "Our unique interactive training methodology guarantees that we make you speak fluent English within 2 months with regular practice."
    },
    {
      q: "Do you provide student payment installment plans?",
      a: "Yes! We support instalment payments for all our diplomas. Please contact our administrative desk on WhatsApp to set up a plan."
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("Subscription Active!", {
      description: `Newsletter updates will now be sent to ${newsletterEmail}.`
    });
    setNewsletterEmail('');
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-programs.jpg)' }}
        />
        <div className="absolute inset-0 bg-brand-dark/65" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl lg:text-[77px] text-white leading-tight font-bold"
          >
            Oxford College
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto"
          >
            Empowering students with world-class English language education and professional training programs.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/programs" className="btn-primary rounded-xl">
              Explore Programs
            </Link>
            <Link to="/contact" className="btn-bordered border-white text-white hover:bg-white hover:text-brand-dark rounded-xl">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          {/* Section Header */}
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-bold text-brand-dark mb-4">
              Featured Offerings
            </h2>
            <p className="text-gray-text font-light max-w-[700px] mx-auto">
              Professional training in English language and teacher education, designed to advance your global career.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {featuredPrograms.map((program, index) => (
              <Link
                key={program.id}
                to={`/programs/${program.slug}`}
                className={`group block bg-white shadow-card hover:shadow-xl transition-all duration-400 border border-gray-100 rounded-2xl overflow-hidden reveal reveal-delay-${index + 1}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/80 py-2 px-4">
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                      {program.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-heading text-base font-semibold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[44px]">
                    {program.title}
                  </h3>
                  <p className="text-gray-text text-xs font-light line-clamp-2 leading-relaxed">
                    {program.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12 reveal">
            <Link to="/programs" className="btn-bordered rounded-xl">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gray-light">
        <div className="content-max-width">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="lg:w-[55%] reveal space-y-6">
              <h2 className="font-heading text-[32px] font-bold text-brand-dark">
                About Oxford College
              </h2>
              <p className="text-text-dark font-light leading-relaxed text-sm md:text-base">
                Oxford College is a well-established institution in Nittambuwa, Colombo, Sri Lanka. 
                We offer professional training in English language education, from beginner courses 
                to advanced diplomas. Our experienced instructors use modern teaching methods to 
                help students achieve fluency and confidence.
              </p>
              <p className="text-text-dark font-light leading-relaxed text-sm md:text-base">
                With over 15 years of excellence in education, we have trained more than 5,000 
                students who have gone on to achieve success in their academic and professional 
                careers. Our commitment to quality education and student success sets us apart.
              </p>
              <Link to="/about" className="btn-bordered rounded-xl">
                Learn More
              </Link>
            </div>

            {/* Right Image */}
            <div className="lg:w-[45%] reveal reveal-delay-2">
              <img
                src="/images/program-diploma-english.jpg"
                alt="Oxford College Campus"
                className="w-full aspect-[16/10] object-cover shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-dark">
        <div className="content-max-width px-4 md:px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center reveal reveal-delay-${index + 1}`}
              >
                <stat.icon className="w-8 h-8 text-brand-blue mx-auto mb-4" />
                <div className="font-heading text-4xl md:text-5xl font-light text-white mb-2 font-bold">
                  {stat.number}
                </div>
                <div className="text-xs text-gray uppercase tracking-[2px] font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="section-padding bg-white border-t border-gray-150">
        <div className="content-max-width">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-bold text-brand-dark mb-4">
              Student Testimonials
            </h2>
            <p className="text-gray-text font-light max-w-[700px] mx-auto">
              Real feedback from students who transformed their speaking proficiency and unlocked career advancements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Software Engineer',
                text: 'Oxford College transformed my English skills in just two months. The practical speaking tasks and dedicated feedback helped me speak fluently with global clients.',
                rating: 5,
              },
              {
                name: 'Ahmed Hassan',
                role: 'Business Owner',
                text: 'The Corporate Practical English course was incredible. It customized the training to my business needs, and now my team communicates at a global standard.',
                rating: 5,
              },
              {
                name: 'Kavitha Rajan',
                role: 'Primary School Teacher',
                text: 'The Teacher Training Diploma gave me practical pedagogy methodologies. It has been the cornerstone of my teaching career.',
                rating: 5,
              },
            ].map((t, index) => (
              <div key={index} className="bg-gray-50 border border-gray-150 p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-dark font-light text-xs sm:text-sm italic mb-6 leading-relaxed">
                  "{t.text}"
                </p>
                <div>
                  <h4 className="font-heading font-semibold text-xs sm:text-sm text-brand-dark">{t.name}</h4>
                  <span className="text-[10px] text-gray-text font-light">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding bg-gray-light border-t border-gray-200">
        <div className="content-max-width max-w-3xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-bold text-brand-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-text font-light max-w-[700px] mx-auto">
              Common questions about enrollments, online learning models, certificates, and flexible scheduling.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between text-left font-heading font-semibold text-sm sm:text-base text-brand-dark"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-brand-blue" /> : <ChevronDown className="w-5 h-5 text-brand-blue" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 border-t border-gray-100 text-xs sm:text-sm text-gray-text font-light leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,113,202,0.15),transparent)] pointer-events-none" />
        <div className="content-max-width max-w-3xl mx-auto text-center relative z-10 space-y-6">
          <Mail className="w-12 h-12 text-brand-blue mx-auto mb-2" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
            Subscribe to our Academic Newsletter
          </h2>
          <p className="text-gray-text font-light text-xs sm:text-sm md:text-base max-w-lg mx-auto">
            Receive the latest program announcements, scheduling sheets, and learning materials directly in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-4">
            <input
              type="email"
              placeholder="student@example.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-xs text-white placeholder-gray-text"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue hover:bg-opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 flex-shrink-0"
            >
              SUBSCRIBE
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue">
        <div className="content-max-width px-4 md:px-5 text-center reveal">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 font-light mb-8 max-w-2xl mx-auto">
            Enroll in one of our professional programs and take the first step towards mastering English.
          </p>
          <Link
            to="/programs"
            className="inline-block px-8 py-4 bg-white text-brand-blue font-bold text-[11px] uppercase tracking-wider transition-all duration-300 hover:bg-opacity-90 rounded-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
