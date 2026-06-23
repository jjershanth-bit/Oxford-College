import { Star, Quote } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import useScrollReveal from '@/hooks/useScrollReveal';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    program: '2 Month Diploma in Practical English',
    image: '/images/program-diploma-english.jpg',
    quote: 'Oxford College transformed my English skills in just two months. The practical approach and dedicated instructors helped me gain the confidence I needed for my career. I can now communicate fluently with international clients.',
    rating: 5,
  },
  {
    name: 'Ahmed Hassan',
    role: 'Business Owner',
    program: 'Corporate Training on Practical English',
    image: '/images/program-corporate.jpg',
    quote: 'The corporate training program was exactly what our team needed. The customized approach and flexible scheduling made it easy to fit into our busy work schedule. Our team\'s communication has improved significantly.',
    rating: 5,
  },
  {
    name: 'Kavitha Rajan',
    role: 'Teacher',
    program: 'Diploma in Teacher Training',
    image: '/images/program-teacher-training.jpg',
    quote: 'The Teacher Training Diploma at Oxford College exceeded my expectations. The comprehensive curriculum and practical teaching placements gave me the skills and confidence to excel in my teaching career.',
    rating: 5,
  },
  {
    name: 'Nimal Fernando',
    role: 'University Student',
    program: 'IELTS – Practical Training',
    image: '/images/program-ielts.jpg',
    quote: 'Thanks to Oxford College\'s IELTS training, I achieved a band score of 7.5! The mock tests and personalized feedback were invaluable. The instructors truly understand the exam and know how to prepare students.',
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    role: 'Migrant Worker',
    program: 'English for Migrant Workers',
    image: '/images/program-migrant-workers.jpg',
    quote: 'This course changed my life. I learned practical English that I use every day at work and in my community. The affordable price and flexible timings made it possible for me to attend while working.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Parent',
    program: 'IT and English for Kids',
    image: '/images/program-kids.jpg',
    quote: 'My daughter absolutely loves the IT and English program! The teachers are wonderful with children, and she has made remarkable progress in both her English and computer skills. Highly recommended for parents.',
    rating: 5,
  },
];

export default function Testimonials() {
  useScrollReveal();

  return (
    <main>
      <HeroBanner
        title="Testimonials"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Testimonials' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-4">
              What Our Students Say
            </h2>
            <p className="text-gray-text font-light max-w-2xl mx-auto">
              Hear from our graduates about their transformative learning experience at Oxford College
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`bg-white border border-gray-100 p-8 shadow-card reveal reveal-delay-${Math.min(index + 1, 8)}`}
              >
                {/* Quote Icon */}
                <Quote size={32} className="text-brand-blue/20 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-dark font-light leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-heading font-medium text-brand-dark text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-text text-xs">{testimonial.role}</p>
                    <p className="text-brand-blue text-xs mt-0.5">{testimonial.program}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-brand-dark">
        <div className="content-max-width px-4 md:px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '5000+', label: 'Happy Students' },
              { number: '98%', label: 'Success Rate' },
              { number: '4.9', label: 'Average Rating' },
              { number: '15+', label: 'Years of Trust' },
            ].map((stat, index) => (
              <div key={stat.label} className={`reveal reveal-delay-${index + 1}`}>
                <div className="font-heading text-4xl md:text-5xl font-light text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray uppercase tracking-[2px] font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
