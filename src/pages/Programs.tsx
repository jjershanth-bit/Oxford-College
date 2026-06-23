import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown, Clock, BookOpen, DollarSign } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import { programs } from '@/data/programs';

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // 1. Get Categories dynamically
  const categories = useMemo(() => {
    return ['All', ...new Set(programs.map((p) => p.category))];
  }, []);

  // 2. Parse price helper
  const getNumericPrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/,/g, ''));
  };

  // 3. Convert duration to sorting value in days (rough estimate)
  const getDurationInDays = (durationStr: string) => {
    const val = parseInt(durationStr);
    if (isNaN(val)) return 999; // Custom or corporate
    if (durationStr.toLowerCase().includes('year')) return val * 365;
    if (durationStr.toLowerCase().includes('month')) return val * 30;
    if (durationStr.toLowerCase().includes('week')) return val * 7;
    return val;
  };

  // 4. Filter and Sort logic
  const filteredPrograms = useMemo(() => {
    return programs
      .filter((program) => {
        const matchesSearch =
          program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          program.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          program.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'All' || program.category === selectedCategory;

        const matchesPrice = getNumericPrice(program.price) <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return getNumericPrice(a.price) - getNumericPrice(b.price);
        }
        if (sortBy === 'price-high') {
          return getNumericPrice(b.price) - getNumericPrice(a.price);
        }
        if (sortBy === 'duration') {
          return getDurationInDays(a.duration) - getDurationInDays(b.duration);
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        // 'featured' (default id order)
        return parseInt(a.id) - parseInt(b.id);
      });
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      <HeroBanner
        title="College Programs"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'College Programs' },
        ]}
        backgroundImage="/images/hero-programs.jpg"
      />

      <section className="py-12">
        <div className="content-max-width px-4 md:px-5">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search programs, tags, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15 focus:outline-none transition-all text-sm text-brand-dark"
                />
              </div>

              {/* Toggle Buttons & Selects */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    showFilters || maxPrice < 30000
                      ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                      : 'border-gray-200 bg-white text-gray-text hover:border-gray-300'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {maxPrice < 30000 && (
                    <span className="bg-brand-blue text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                      1
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 bg-white w-full sm:w-auto">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-3 bg-transparent text-sm font-medium text-gray-text focus:outline-none cursor-pointer pr-4"
                  >
                    <option value="featured">Featured Programs</option>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration: Short to Long</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Expandable Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-gray-100 mt-6 pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Price Range Filter */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-semibold text-brand-dark flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-brand-blue" /> Max Price (රු)
                        </label>
                        <span className="text-sm font-bold text-brand-blue">
                          රු {maxPrice.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="4000"
                        max="30000"
                        step="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full accent-brand-blue bg-gray-200 rounded-lg appearance-none h-2 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>රු 4,000</span>
                        <span>රු 30,000+</span>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <div className="flex items-end justify-start md:justify-end">
                      <button
                        onClick={() => {
                          setMaxPrice(30000);
                          setSearchQuery('');
                          setSelectedCategory('All');
                          setSortBy('featured');
                        }}
                        className="text-xs text-gray-text hover:text-brand-blue underline font-medium"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15'
                    : 'bg-white border border-gray-150 text-gray-text hover:border-gray-300 hover:text-brand-dark'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Count & Active filters */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-text font-light">
              Showing <span className="font-semibold text-brand-dark">{filteredPrograms.length}</span> programs
            </p>
          </div>

          {/* Programs Grid with Animations */}
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-150">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-heading text-lg font-medium text-brand-dark mb-1">
                No programs found
              </h3>
              <p className="text-gray-text text-sm font-light">
                Try adjusting your search criteria or resetting the filters.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredPrograms.map((program) => (
                  <motion.div
                    layout
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/programs/${program.slug}`}
                      className="group flex flex-col h-full bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Category Badge overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-brand-dark/20 pt-6 pb-2.5 px-4">
                          <span className="bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {program.category}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-heading text-base font-semibold text-brand-dark group-hover:text-brand-blue transition-colors mb-2 line-clamp-2 min-h-[44px]">
                          {program.title}
                        </h3>
                        <p className="text-gray-text text-xs font-light line-clamp-3 mb-4 flex-1">
                          {program.excerpt}
                        </p>

                        {/* Metadata row */}
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-text font-light">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-blue" />
                            {program.duration}
                          </span>
                          <span className="font-bold text-brand-dark text-sm">
                            රු {program.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
