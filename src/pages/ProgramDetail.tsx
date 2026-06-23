import { useParams, Link, Navigate, useNavigate } from 'react-router';
import { Heart, Share2, GraduationCap, ChevronDown, ChevronUp, Clock, CheckCircle, Briefcase, Star, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import HeroBanner from '@/components/HeroBanner';
import { getProgramBySlug, programs } from '@/data/programs';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

// Mock reviews and careers for each program to provide premium production content
const programReviews: Record<string, { author: string; rating: number; text: string; date: string }[]> = {
  '2-month-diploma-in-practical-english': [
    { author: 'Dilani Perera', rating: 5, text: 'This course helped me secure my first job in customer support. The emphasis on spoken English was exactly what I needed.', date: 'May 12, 2026' },
    { author: 'Mohamed Aslam', rating: 5, text: 'Highly recommend this program. The online classes were very interactive and recordings helped me review at my own pace.', date: 'April 28, 2026' }
  ],
  'certificate-in-sinhala': [
    { author: 'Karthigesu S.', rating: 5, text: 'A fantastic course for Tamil speakers. The bilingual teacher explained everything so clearly.', date: 'May 20, 2026' },
    { author: 'V. Priya', rating: 5, text: 'Very practical lessons. I can now speak with my neighbors and colleagues in Sinhala with confidence.', date: 'May 05, 2026' }
  ],
  'ielts-practical-training': [
    { author: 'Nimal Fernando', rating: 5, text: 'I obtained a band score of 7.5 thanks to the intensive mock tests and individual writing reviews.', date: 'April 15, 2026' },
    { author: 'Sanduni Silva', rating: 4, text: 'The speaking mock sessions were extremely realistic. Highly professional instructors.', date: 'March 22, 2026' }
  ],
  'diploma-in-teacher-training': [
    { author: 'Kavitha Rajan', rating: 5, text: 'The microteaching practice and feedback sessions prepared me perfectly for my school classes.', date: 'May 2, 2026' }
  ]
};

const programCareers: Record<string, string[]> = {
  '2-month-diploma-in-practical-english': ['Customer Success Specialist', 'Call Center Associate', 'Front Office Executive', 'International Sales Agent'],
  'certificate-in-sinhala': ['Bilingual Administrator', 'Public Service Clerk', 'Social Worker', 'Customer Relations Officer'],
  'ielts-practical-training': ['International University Student', 'Skilled Migrant Visa Applicant', 'Overseas Employment Applicant'],
  'higher-diploma-in-practical-english': ['Corporate Communications Officer', 'Executive Assistant', 'Public Relations Specialist', 'Content Writer'],
  'corporate-training-on-practical-english': ['Executive Liaison', 'Business Presenter', 'Senior Team Lead', 'Managerial Administrator'],
  'it-and-english-for-kids': ['Primary School Technology Literacy', 'Youth English Language Olympiad Candidate'],
  'diploma-in-primary-teaching': ['Primary School Teacher', 'ESL Primary Teacher', 'Preschool Administrator', 'Childcare Coordinator'],
  'diploma-in-teacher-training': ['Secondary School Teacher', 'Academic Department Head', 'Educational Consultant', 'Private Education Entrepreneur'],
  'english-for-migrant-workers': ['Foreign Domestic/Industrial Worker', 'Overseas Customer Care Desk Operator']
};

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const program = getProgramBySlug(slug || '');
  const navigate = useNavigate();
  const [syllabusOpen, setSyllabusOpen] = useState(true);
  const [shareText, setShareText] = useState('Share');

  const {
    currentUser,
    addToCart,
    isInCart,
    toggleWishlist,
    isInWishlist,
    addRecentlyViewed
  } = useApp();

  // Track page views for "recently viewed" in analytics dashboard
  useEffect(() => {
    if (program) {
      addRecentlyViewed(program.slug);
    }
  }, [program]);

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  // Check enrollment and cart status
  const isEnrolled = currentUser?.enrolledPrograms.some(
    (ep) => ep.programSlug === program.slug
  );
  const inCart = isInCart(program.slug);
  const wishlisted = isInWishlist(program.slug);

  const relatedPrograms = programs
    .filter((p) => p.id !== program.id && p.category === program.category)
    .slice(0, 3);

  // Fallback to tags if no related programs in same category
  const fallbackPrograms = relatedPrograms.length > 0 
    ? relatedPrograms 
    : programs.filter((p) => p.id !== program.id).slice(0, 3);

  // Custom data fallbacks
  const reviews = programReviews[program.slug] || [
    { author: 'Verified Student', rating: 5, text: 'Excellent teaching methods, very structured and professional course materials.', date: 'May 1, 2026' }
  ];

  const careerPaths = programCareers[program.slug] || [
    'Professional Career Advancement',
    'Higher Educational Opportunities',
    'Global Communication Competency'
  ];

  const handleCartAction = () => {
    if (isEnrolled) {
      navigate('/account');
      return;
    }

    if (inCart) {
      navigate('/cart');
      return;
    }

    addToCart(program.slug);
    toast.success(`${program.title} added to your cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart')
      }
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareText('Copied Link!');
    toast.info('Course link copied to clipboard!');
    setTimeout(() => setShareText('Share'), 3000);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <HeroBanner
        title={program.title}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/programs' },
          { name: program.title },
        ]}
        backgroundImage={program.image}
      />

      {/* Content Area */}
      <section className="py-16">
        <div className="content-max-width px-4 md:px-5">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:w-[65%] space-y-8">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-brand-blue/10 px-3 py-1.5 rounded-lg">
                  <GraduationCap size={16} className="text-brand-blue" />
                  <span className="text-brand-blue text-xs font-semibold uppercase tracking-wider">
                    {program.category}
                  </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        toast.error('Please log in to add courses to your wishlist.', {
                          action: {
                            label: 'Log In',
                            onClick: () => navigate('/account')
                          }
                        });
                        return;
                      }
                      toggleWishlist(program.slug);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-all ${
                      wishlisted
                        ? 'border-red-200 text-red-500 bg-red-50'
                        : 'border-gray-200 text-gray-text hover:border-brand-blue hover:text-brand-blue bg-white'
                    }`}
                  >
                    <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
                    <span>{wishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-text hover:border-brand-blue hover:text-brand-blue bg-white rounded-lg text-xs font-medium transition-all"
                  >
                    <Share2 size={14} />
                    <span>{shareText}</span>
                  </button>
                </div>
              </div>

              {/* Course Title and Cover */}
              <div className="space-y-4">
                <h1 className="font-heading text-2xl md:text-3xl lg:text-[34px] font-bold text-brand-dark leading-snug">
                  {program.title}
                </h1>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* About Course */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-brand-dark mb-3">
                    Course Overview
                  </h2>
                  <p className="text-gray-text font-light text-sm md:text-base leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-heading text-base font-semibold text-brand-dark mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-blue" /> What You Will Learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {program.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-150">
                        <span className="w-2.5 h-2.5 bg-brand-blue rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-brand-dark text-xs font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-heading text-base font-semibold text-brand-dark mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-brand-blue" /> Career Opportunities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {careerPaths.map((career, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-brand-dark text-xs font-medium px-3.5 py-2 rounded-lg border border-gray-150"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Syllabus Accordion */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setSyllabusOpen(!syllabusOpen)}
                  className="flex items-center justify-between w-full p-6 bg-white hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                >
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-brand-dark flex items-center gap-2">
                    <GraduationCap className="text-brand-blue" /> Course Curriculum ({program.syllabus.length} Modules)
                  </h2>
                  {syllabusOpen ? (
                    <ChevronUp size={20} className="text-brand-blue" />
                  ) : (
                    <ChevronDown size={20} className="text-brand-blue" />
                  )}
                </button>
                {syllabusOpen && (
                  <div className="p-6 divide-y divide-gray-100">
                    {program.syllabus.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <span className="w-8 h-8 bg-brand-blue/10 text-brand-blue rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-brand-dark text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                <h2 className="font-heading text-lg md:text-xl font-semibold text-brand-dark flex items-center gap-2">
                  <MessageSquare className="text-brand-blue" /> Student Reviews ({reviews.length})
                </h2>
                <div className="space-y-4">
                  {reviews.map((rev, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-heading text-xs font-semibold text-brand-dark">{rev.author}</div>
                        <div className="text-[10px] text-gray-400 font-light">{rev.date}</div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < rev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="text-gray-text text-xs leading-relaxed font-light">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:w-[35%] space-y-6">
              {/* Enrollment / Price Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <span className="text-gray-text text-xs font-light block mb-1">Course Fee</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-text text-lg">රු</span>
                    <span className="font-heading text-3xl font-bold text-brand-dark">
                      {program.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Status indicators */}
                  <div className="space-y-2 text-xs font-light text-gray-text bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-blue" /> Duration</span>
                      <span className="font-medium text-brand-dark">{program.duration}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200/50 pt-2 mt-2">
                      <span>Access Term</span>
                      <span className="font-medium text-brand-dark">Lifetime Access</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200/50 pt-2 mt-2">
                      <span>Certificate</span>
                      <span className="font-medium text-brand-dark">Upon Completion</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCartAction}
                    className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${
                      isEnrolled
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : inCart
                        ? 'bg-brand-blue text-white hover:bg-opacity-95 shadow-md shadow-brand-blue/15'
                        : 'bg-brand-blue text-white hover:bg-brand-blue/90 hover:scale-[1.01]'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle size={16} />
                        Go To Student Portal
                      </>
                    ) : inCart ? (
                      'View in Cart'
                    ) : (
                      'Buy Now'
                    )}
                  </button>

                  {!isEnrolled && !inCart && (
                    <button
                      onClick={() => {
                        addToCart(program.slug);
                        toast.success(`${program.title} added to your cart!`);
                      }}
                      className="w-full py-3.5 border border-brand-blue text-brand-blue font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 bg-white hover:bg-brand-blue/5"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>

              {/* Instructor Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="font-heading font-semibold text-sm text-brand-dark">
                  Faculty Instructor
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue font-bold text-sm">
                    {program.instructor.replace('_', ' ').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-brand-dark block">
                      {program.instructor === 'oxford_edu' ? 'Oxford Education Faculty' : program.instructor}
                    </span>
                    <span className="text-[10px] text-gray-text font-light">Tamil University Lecturers</span>
                  </div>
                </div>
              </div>

              {/* Tags Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="font-heading font-semibold text-sm text-brand-dark">
                  Course Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1.5 bg-gray-50 border border-gray-150 rounded text-[10px] text-gray-text hover:border-brand-blue hover:text-brand-blue transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-16 bg-gray-100 border-t border-gray-200">
        <div className="content-max-width px-4 md:px-5">
          <h2 className="font-heading text-lg md:text-xl font-bold text-brand-dark mb-8">
            Related Academic Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {fallbackPrograms.map((rp) => (
              <Link
                key={rp.id}
                to={`/programs/${rp.slug}`}
                className="group block bg-white shadow-card hover:shadow-xl transition-all duration-400 rounded-2xl overflow-hidden border border-gray-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/80 py-2 px-4">
                    <span className="text-white text-[10px] font-semibold uppercase tracking-wider">
                      {rp.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-sm font-semibold text-brand-dark group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[40px]">
                    {rp.title}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-text">
                    <span>{rp.duration}</span>
                    <span className="font-bold text-brand-dark">රු {rp.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
