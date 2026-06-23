import { Link } from 'react-router';
import { Globe, MessageCircle, BookOpen, Users, ArrowRight } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function LinguaFranca() {
  useScrollReveal();

  const features = [
    {
      icon: Globe,
      title: 'Multilingual Approach',
      description: 'Learn English through the lens of your native language with our unique bilingual teaching methodology.',
    },
    {
      icon: MessageCircle,
      title: 'Conversation Focused',
      description: 'Emphasis on practical spoken English for real-world situations, not just grammar rules.',
    },
    {
      icon: BookOpen,
      title: 'Cultural Immersion',
      description: 'Understand the cultural context behind the language for more natural communication.',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join a diverse community of learners from different linguistic backgrounds.',
    },
  ];

  const benefits = [
    'Bridge the gap between your native language and English',
    'Learn practical communication skills for daily life',
    'Understand cultural nuances and expressions',
    'Build confidence in multilingual environments',
    'Connect with speakers from diverse backgrounds',
    'Accelerate your language learning journey',
  ];

  return (
    <main>
      <HeroBanner
        title="Lingua Franca"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Lingua Franca' },
        ]}
        backgroundImage="/images/program-diploma-english.jpg"
      />

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 reveal">
              <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-6">
                What is Lingua Franca?
              </h2>
              <p className="text-text-dark font-light leading-relaxed mb-6">
                Lingua Franca is our signature program designed to help non-native English speakers 
                develop practical communication skills. The term "lingua franca" refers to a shared 
                language that enables people from different linguistic backgrounds to communicate 
                effectively — and that is exactly what this program aims to achieve.
              </p>
              <p className="text-text-dark font-light leading-relaxed mb-6">
                Our unique approach recognizes that effective language learning goes beyond grammar 
                and vocabulary. We focus on real-world communication, cultural understanding, and 
                practical application. Whether you are a student, professional, or someone looking 
                to improve their English for personal growth, Lingua Franca provides the tools and 
                support you need.
              </p>
              <p className="text-text-dark font-light leading-relaxed mb-8">
                Join thousands of successful graduates who have transformed their English skills 
                through our Lingua Franca program. Start your journey to confident communication today.
              </p>
              <Link to="/programs" className="btn-primary">
                Enroll Now
              </Link>
            </div>

            <div className="lg:w-1/2 reveal reveal-delay-2">
              <img
                src="/images/program-sinhala.jpg"
                alt="Lingua Franca Program"
                className="w-full aspect-[16/10] object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-light">
        <div className="content-max-width">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-4">
              Program Features
            </h2>
            <p className="text-gray-text font-light max-w-2xl mx-auto">
              Discover what makes our Lingua Franca program unique and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white p-8 shadow-card reveal reveal-delay-${index + 1}`}
              >
                <feature.icon className="w-10 h-10 text-brand-blue mb-4" />
                <h3 className="font-heading text-xl font-medium text-brand-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-text font-light text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 reveal">
              <img
                src="/images/program-ielts.jpg"
                alt="Lingua Franca Benefits"
                className="w-full aspect-[16/10] object-cover shadow-lg"
              />
            </div>

            <div className="lg:w-1/2 reveal reveal-delay-2">
              <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-6">
                Benefits of Lingua Franca
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight size={18} className="text-brand-blue mt-1 flex-shrink-0" />
                    <span className="text-text-dark font-light">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/programs" className="btn-primary">
                  View Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
