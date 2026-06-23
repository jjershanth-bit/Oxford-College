import { useState } from 'react';
import { Link } from 'react-router';
import { 
  LogIn, 
  UserPlus, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Clock, 
  CheckSquare, 
  Square,
  Award,
  Bookmark,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import { useApp } from '@/context/AppContext';
import { programs } from '@/data/programs';
import { toast } from 'sonner';

export default function Account() {
  const { 
    currentUser, 
    login, 
    register, 
    logout, 
    updateCourseProgress, 
    wishlist, 
    recentlyViewed 
  } = useApp();

  // Navigation tab state (Auth mode)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  
  // Active course study view (for simulating syllabus checking)
  const [activeStudySlug, setActiveStudySlug] = useState<string | null>(null);

  // 1. Handle Sign In
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPhone) {
      toast.error('Please enter both your email and phone number.');
      return;
    }
    const success = login(loginEmail, loginPhone);
    if (success) {
      toast.success('Successfully logged in!', {
        description: 'Welcome back to the Oxford College Student Portal.'
      });
      // Clear forms
      setLoginEmail('');
      setLoginPhone('');
    } else {
      toast.error('Login Failed', {
        description: 'No student found matching those credentials. Please check details or register.'
      });
    }
  };

  // 2. Handle Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPhone) {
      toast.error('All registration fields are required.');
      return;
    }
    const success = register(registerName, registerEmail, registerPhone);
    if (success) {
      toast.success('Account Created Successfully!', {
        description: 'Your student profile is active and you are now logged in.'
      });
      // Clear forms
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPhone('');
    } else {
      toast.error('Registration Failed', {
        description: 'This email is already registered. Try logging in instead.'
      });
    }
  };

  // 3. Computed Student Portal Analytics
  const totalEnrolled = currentUser?.enrolledPrograms.length || 0;
  
  const avgProgress = totalEnrolled > 0 
    ? Math.round(
        (currentUser?.enrolledPrograms.reduce((sum, ep) => sum + ep.progress, 0) || 0) / totalEnrolled
      )
    : 0;

  const completedCourses = currentUser?.enrolledPrograms.filter((ep) => ep.progress === 100).length || 0;

  // 4. Achievement Badges Dynamic Logic
  const badges = [
    {
      id: 'early-bird',
      name: 'Scholar Initiation',
      desc: 'Enrolled in your first course',
      unlocked: totalEnrolled >= 1,
      icon: BookOpen,
      color: 'bg-blue-500 text-white'
    },
    {
      id: 'polyglot',
      name: 'Linguistic Enthusiast',
      desc: 'Enrolled in 2 or more courses',
      unlocked: totalEnrolled >= 2,
      icon: Award,
      color: 'bg-purple-500 text-white'
    },
    {
      id: 'dedicated',
      name: 'Academic Grit',
      desc: 'Reached 50% progress in any course',
      unlocked: currentUser?.enrolledPrograms.some((ep) => ep.progress >= 50) || false,
      icon: BarChart3,
      color: 'bg-orange-500 text-white'
    },
    {
      id: 'graduate',
      name: 'Oxford Alumni',
      desc: 'Completed 100% of any course',
      unlocked: completedCourses >= 1,
      icon: Trophy,
      color: 'bg-yellow-500 text-white'
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <HeroBanner
        title="Student Portal"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Portal Dashboard' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      <section className="py-16">
        <div className="content-max-width px-4 md:px-5">
          {!currentUser ? (
            /* ================= AUTHENTICATION VIEW ================= */
            <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden">
              {/* Tab Selector */}
              <div className="flex border-b border-gray-100 bg-gray-50">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-4 font-heading font-semibold text-sm flex items-center justify-center gap-2 border-b-2 transition-all ${
                    authMode === 'login'
                      ? 'border-brand-blue text-brand-blue bg-white'
                      : 'border-transparent text-gray-text hover:text-brand-dark'
                  }`}
                >
                  <LogIn size={16} />
                  Student Sign In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-4 font-heading font-semibold text-sm flex items-center justify-center gap-2 border-b-2 transition-all ${
                    authMode === 'register'
                      ? 'border-brand-blue text-brand-blue bg-white'
                      : 'border-transparent text-gray-text hover:text-brand-dark'
                  }`}
                >
                  <UserPlus size={16} />
                  New Registration
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {authMode === 'login' ? (
                  /* LOGIN FORM */
                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="font-heading text-xl font-bold text-brand-dark mb-1">
                        Welcome Back
                      </h2>
                      <p className="text-xs text-gray-text font-light">
                        Log in using your registered Email & Phone credentials.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="student@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                          Phone Number (as Password)
                        </label>
                        <input
                          type="tel"
                          placeholder="+94 779639969"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-sm"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-opacity-95 shadow-md shadow-brand-blue/15"
                    >
                      LOG IN
                    </button>

                    <div className="text-center text-xs text-gray-text font-light">
                      Demo Access: Register a profile first to explore the portal!
                    </div>
                  </form>
                ) : (
                  /* REGISTRATION FORM */
                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="font-heading text-xl font-bold text-brand-dark mb-1">
                        Student Account Creation
                      </h2>
                      <p className="text-xs text-gray-text font-light">
                        Create your profile to start enrolling in college programs.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Priya Sharma"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="priya@example.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+94 779639969"
                          value={registerPhone}
                          onChange={(e) => setRegisterPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-sm"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-blue text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-opacity-95 shadow-md shadow-brand-blue/15"
                    >
                      CREATE ACCOUNT
                    </button>

                    <div className="text-center text-xs text-gray-text font-light">
                      By registering, you accept our <Link to="/terms" className="text-brand-blue underline">Terms and Conditions</Link>.
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* ================= DASHBOARD STUDENT VIEW ================= */
            <div className="space-y-10">
              {/* Top Banner Dashboard Greeting */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center font-bold text-xl">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-brand-dark mb-1">
                      Welcome, {currentUser.name}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-text font-light">
                      <span>ID: OXF-2026-{1000 + currentUser.name.charCodeAt(0)}</span>
                      <span>•</span>
                      <span>{currentUser.email}</span>
                      <span>•</span>
                      <span>{currentUser.phone}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2.5 bg-red-50 text-red-500 hover:bg-red-100 transition-colors rounded-xl text-xs font-semibold tracking-wider uppercase border border-red-200/50"
                >
                  Log Out
                </button>
              </div>

              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 bg-blue-50 text-brand-blue rounded-xl">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-text font-light block mb-0.5">Enrolled Programs</span>
                    <span className="font-heading font-bold text-2xl text-brand-dark">{totalEnrolled}</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 bg-green-50 text-green-600 rounded-xl">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-text font-light block mb-0.5">Average Progress</span>
                    <span className="font-heading font-bold text-2xl text-brand-dark">{avgProgress}%</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 bg-yellow-50 text-yellow-500 rounded-xl">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-text font-light block mb-0.5">Graduations</span>
                    <span className="font-heading font-bold text-2xl text-brand-dark">{completedCourses}</span>
                  </div>
                </div>
              </div>

              {/* Primary Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left/Center - Course Progress Checklists */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="font-heading text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <BookOpen className="text-brand-blue" />
                    Academic Syllabus & Progress Tracker
                  </h3>

                  {totalEnrolled === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <BookOpen size={40} className="text-gray-300 mx-auto mb-4" />
                      <h4 className="font-heading font-semibold text-brand-dark mb-1">No Active Enrollments</h4>
                      <p className="text-xs text-gray-text font-light mb-6 max-w-sm mx-auto">
                        You have not registered for any courses yet. Visit the catalog to add courses and confirm enrollment.
                      </p>
                      <Link to="/programs" className="btn-primary rounded-xl text-[10px] uppercase font-bold tracking-wider px-5 py-2.5">
                        Browse Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentUser.enrolledPrograms.map((ep) => {
                        const course = programs.find((p) => p.slug === ep.programSlug);
                        if (!course) return null;
                        const isStudying = activeStudySlug === ep.programSlug;

                        return (
                          <div
                            key={ep.programSlug}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                          >
                            {/* Header Panel */}
                            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <h4 className="font-heading text-sm sm:text-base font-semibold text-brand-dark line-clamp-1">{course.title}</h4>
                                  <span className="text-[10px] text-gray-text font-light">Enrolled: {ep.dateEnrolled}</span>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="flex-1 sm:w-28 bg-gray-100 rounded-full h-2">
                                  <div
                                    className="bg-brand-blue h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${ep.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-brand-dark min-w-[34px]">{ep.progress}%</span>
                                
                                <button
                                  onClick={() => setActiveStudySlug(isStudying ? null : ep.programSlug)}
                                  className="p-1 text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-all"
                                  title="Study syllabus"
                                >
                                  {isStudying ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                              </div>
                            </div>

                            {/* Syllabus Study Panel (Start Course simulation) */}
                            {isStudying && (
                              <div className="border-t border-gray-100 p-6 bg-gray-50/50 space-y-4">
                                <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-brand-dark">
                                  Simulation: Tick completed lessons to update progress
                                </h5>
                                <div className="divide-y divide-gray-100">
                                  {course.syllabus.map((modName, index) => {
                                    const isDone = ep.completedSyllabus.includes(modName);
                                    return (
                                      <div
                                        key={index}
                                        onClick={() => updateCourseProgress(ep.programSlug, modName, !isDone)}
                                        className="py-3 flex items-center justify-between cursor-pointer group hover:bg-gray-100/50 rounded px-2 transition-all"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="text-brand-blue">
                                            {isDone ? (
                                              <CheckSquare size={18} fill="currentColor" className="text-brand-blue text-white" />
                                            ) : (
                                              <Square size={18} className="text-gray-300 group-hover:text-gray-400" />
                                            )}
                                          </div>
                                          <span className={`text-xs ${isDone ? 'line-through text-gray-text font-light' : 'text-brand-dark font-medium'}`}>
                                            Module {index + 1}: {modName}
                                          </span>
                                        </div>
                                        <span className="text-[10px] text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded uppercase font-semibold scale-90 opacity-0 group-hover:opacity-100 transition-opacity">
                                          {isDone ? 'Undo' : 'Complete'}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column - Gamification, Badges, Wishlists */}
                <div className="space-y-8">
                  {/* Badges Achievements Panel */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-heading text-base font-bold text-brand-dark flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Trophy size={18} className="text-brand-blue" />
                      Academic Achievements
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                            badge.unlocked
                              ? 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue scale-100'
                              : 'bg-gray-50 border-gray-150 text-gray-400 grayscale opacity-60'
                          }`}
                        >
                          <badge.icon className="w-8 h-8 mb-2" />
                          <span className="text-xs font-bold block leading-tight">{badge.name}</span>
                          <span className="text-[9px] text-gray-text leading-tight mt-0.5">{badge.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recently Viewed Panel */}
                  {recentlyViewed.length > 0 && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 className="font-heading text-base font-bold text-brand-dark flex items-center gap-2 pb-2 border-b border-gray-100">
                        <Clock size={18} className="text-brand-blue" />
                        Recently Visited
                      </h3>
                      <div className="space-y-3">
                        {recentlyViewed.map((slug) => {
                          const course = programs.find((p) => p.slug === slug);
                          if (!course) return null;
                          return (
                            <Link
                              key={slug}
                              to={`/programs/${slug}`}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-150"
                            >
                              <div className="w-10 h-7 rounded overflow-hidden flex-shrink-0">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-xs font-semibold text-brand-dark truncate">{course.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Wishlist Panel */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-heading text-base font-bold text-brand-dark flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Bookmark size={18} className="text-brand-blue" />
                      Saved Wishlist ({wishlist.length})
                    </h3>
                    <div className="space-y-3">
                      {wishlist.length === 0 ? (
                        <div className="text-center text-xs text-gray-text font-light py-4">
                          No programs saved yet.
                        </div>
                      ) : (
                        wishlist.map((slug) => {
                          const course = programs.find((p) => p.slug === slug);
                          if (!course) return null;
                          return (
                            <div
                              key={slug}
                              className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-150"
                            >
                              <Link
                                to={`/programs/${slug}`}
                                className="text-xs font-semibold text-brand-dark hover:text-brand-blue transition-colors truncate max-w-[130px]"
                              >
                                {course.title}
                              </Link>
                              <Link
                                to={`/programs/${slug}`}
                                className="text-[10px] text-brand-blue hover:underline uppercase font-bold"
                              >
                                Enroll →
                              </Link>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
