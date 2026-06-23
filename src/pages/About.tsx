import { Link } from 'react-router';
import { Award, Users, Globe, BookOpen } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function About() {
  useScrollReveal();

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in education and student outcomes.',
    },
    {
      icon: Users,
      title: 'Student-Centered',
      description: 'Every student receives personalized attention and support.',
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Preparing students for success in an interconnected world.',
    },
    {
      icon: BookOpen,
      title: 'Innovation',
      description: 'Modern teaching methods and cutting-edge curriculum design.',
    },
  ];

  const team = [
    {
      name: 'Dr. Rajitha Perera',
      role: 'Principal & Founder',
      bio: 'With over 20 years of experience in English language education, Dr. Perera founded Oxford College with a vision to provide quality education to Sri Lankan students.',
      image: '/images/program-ielts.jpg',
    },
    {
      name: 'Ms. Sarah Fernando',
      role: 'Head of Academics',
      bio: 'Sarah leads our academic team with expertise in curriculum development and teacher training, ensuring the highest educational standards.',
      image: '/images/program-sinhala.jpg',
    },
    {
      name: 'Mr. James Silva',
      role: 'Senior Lecturer',
      bio: 'James specializes in IELTS preparation and corporate English training, bringing international experience to our programs.',
      image: '/images/program-corporate.jpg',
    },
  ];

  return (
    <main>
      <HeroBanner
        title="About Us"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      {/* Content Area */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left Content */}
            <div className="lg:w-[55%] reveal">
              <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-6">
                About Oxford College
              </h2>
              <p className="text-text-dark font-light leading-relaxed mb-6">
                Oxford College is a premier educational institution located in Nittambuwa, Colombo, 
                Sri Lanka. Established with a mission to provide world-class English language education, 
                we have grown to become one of the most respected language schools in the region.
              </p>
              <p className="text-text-dark font-light leading-relaxed mb-6">
                Our institution offers a comprehensive range of programs designed to meet the diverse 
                needs of our students. From short-term certificates to advanced diplomas, each program 
                is carefully crafted to ensure maximum learning outcomes. Our experienced faculty 
                members bring a wealth of knowledge and practical expertise to the classroom.
              </p>
              <p className="text-text-dark font-light leading-relaxed mb-8">
                At Oxford College, we believe that language learning goes beyond textbooks. Our 
                innovative teaching methodology combines theoretical knowledge with practical 
                application, ensuring that our students not only learn English but also gain the 
                confidence to use it effectively in real-world situations.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>

            {/* Right Image */}
            <div className="lg:w-[45%] reveal reveal-delay-2">
              <img
                src="/images/program-diploma-english.jpg"
                alt="Oxford College"
                className="w-full aspect-[16/10] object-cover shadow-lg mb-6"
              />
              <img
                src="/images/program-kids.jpg"
                alt="Classroom"
                className="w-full aspect-[16/10] object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-gray-light">
        <div className="content-max-width">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-4">
              Our Mission & Values
            </h2>
            <p className="text-gray-text font-light max-w-2xl mx-auto">
              Guided by our commitment to educational excellence, we empower students to achieve their full potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-white p-8 text-center shadow-card reveal reveal-delay-${index + 1}`}
              >
                <value.icon className="w-10 h-10 text-brand-blue mx-auto mb-4" />
                <h3 className="font-heading text-xl font-medium text-brand-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-text font-light text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="content-max-width">
          <div className="text-center mb-16 reveal">
            <h2 className="font-heading text-[32px] font-medium text-brand-dark mb-4">
              Our Team
            </h2>
            <p className="text-gray-text font-light max-w-2xl mx-auto">
              Meet the dedicated professionals behind Oxford College
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group reveal reveal-delay-${index + 1}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-heading text-xl font-medium text-brand-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-blue text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-text font-light text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
